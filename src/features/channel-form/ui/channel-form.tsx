'use client'

import { useState, useEffect } from "react"
import { useForm, Controller, useFieldArray, SubmitHandler } from "react-hook-form"
import axios, { isAxiosError } from "axios"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"

// UI Components
import { AdminPageTitle } from "@/shared/ui/admin/ui/admin-page-title"
import { AdminButton } from "@/shared/ui/admin/ui/admin-button"
import { AdminFormCard } from "@/shared/ui/admin/ui/form/admin-form-card"
import { AdminInput } from "@/shared/ui/admin/ui/form/admin-input"
import { AdminSelect } from "@/shared/ui/admin/ui/form/admin-select"
import { AdminFileUpload } from "@/shared/ui/admin/ui/form/admin-file-upload"
import { AdminFormGroup } from "@/shared/ui/admin/ui/form/admin-form-group"
import { AdminCheckbox } from "@/shared/ui/admin/ui/form/admin-checkbox"

// Types & Utils
import { ChannelFormProps } from "../types/channel-form.props"
import { useAdminCategories } from "@/page/admin-channels/api/use-admin-category"
import { FORMAT_OPTIONS } from "../config/format-options"
// API
import { createChannel } from "../api/create-channel"
import { updateChannel } from "../api/update-channel" // 👈 Импортируем функцию обновления
import { getChannel } from "../api/get-channel"
import { useQueryClient } from "@tanstack/react-query"

interface CreateChannelForm {
    name: string;
    categoryId: number | string;
    image: File | string | null;
    description: string;
    subscribers: string;
    coast: string;
    lectureHall: {
        activePercentage: string;
        statsData: {
            likes: string;
            comments: string;
            reposts: string;
        };
        interestsItems: { value: string }[]; 
        geographyItems: { name: string; percent: string }[];
        consumption: string;
        howRead: string;
        reaction: string;
        frequency: string;
    };
    content: {
        formats: string[];
        stats: {
            overallCoverage: string;
            monthlyCoverage: string;
            er: string;
        };
    };
    priceAdd: {
        advertisement: string;
        integration: string;
        repost: string;
    };
}

export const ChannelForm = ({
    type='create',
    id
}: ChannelFormProps) => {
    const queryClient = useQueryClient();

    const router = useRouter();
    const { data: categoryData, isLoading: categoryLoading } = useAdminCategories();
    const categories = !categoryData ? [] : categoryData;

    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(type === 'edit');
    
    // Стейт для хранения старой ссылки
    const [initialImageUrl, setInitialImageUrl] = useState<string | null>(null);

    const { control, handleSubmit, getValues, trigger, setError, clearErrors, reset, formState: { errors } } = useForm<CreateChannelForm>({
        defaultValues: {
            name: '',
            description: '',
            subscribers: '',
            coast: '',
            categoryId: '',
            image: null,
            lectureHall: {
                activePercentage: '',
                statsData: { likes: '', comments: '', reposts: '' },
                interestsItems: [{ value: '' }],
                geographyItems: [{ name: '', percent: '' }],
                consumption: '',
                howRead: '',
                reaction: '',
                frequency: ''
            },
            content: {
                formats: [],
                stats: { overallCoverage: '', monthlyCoverage: '', er: '' }
            },
            priceAdd: { advertisement: '', integration: '', repost: '' }
        },
        mode: 'onChange'
    });

    const { fields: interestFields, append: appendInterest, remove: removeInterest } = useFieldArray({
        control,
        name: "lectureHall.interestsItems"
    });

    const { fields: geoFields, append: appendGeo, remove: removeGeo } = useFieldArray({
        control,
        name: "lectureHall.geographyItems"
    });

    // --- ЗАГРУЗКА ДАННЫХ ПРИ РЕДАКТИРОВАНИИ ---
    useEffect(() => {
        const fetchChannelData = async () => {
            if (type === 'edit' && id) {
                try {
                    setIsFetching(true);
                    const data = await getChannel(id);

                    setInitialImageUrl(data.image);

                    reset({
                        name: data.name,
                        categoryId: data.categoryId,
                        image: data.image,
                        description: data.description,
                        subscribers: String(data.subscribers),
                        coast: String(data.coast),
                        lectureHall: {
                            ...data.lectureHall,
                            activePercentage: String(data.lectureHall.activePercentage),
                            statsData: {
                                likes: String(data.lectureHall.statsData.likes),
                                comments: String(data.lectureHall.statsData.comments),
                                reposts: String(data.lectureHall.statsData.reposts),
                            },
                            interestsItems: data.lectureHall.interestsItems.map((item: string) => ({ value: item })),
                            geographyItems: data.lectureHall.geographyItems.map((item: any) => ({
                                name: item.name,
                                percent: String(item.percent)
                            })),
                            consumption: data.lectureHall.consumption,
                            howRead: data.lectureHall.howRead,
                            reaction: data.lectureHall.reaction,
                            frequency: data.lectureHall.frequency
                        },
                        content: {
                            formats: data.content.formats,
                            stats: data.content.stats
                        },
                        priceAdd: data.priceAdd
                    });
                } catch (error) {
                    console.error("Ошибка при получении данных канала", error);
                    alert("Не удалось загрузить данные канала");
                    router.push('/admin/channels');
                } finally {
                    setIsFetching(false);
                }
            }
        };

        fetchChannelData();
    }, [type, id, reset, router]);


    // --- ХЕЛПЕРЫ ВАЛИДАЦИИ ---
    const handleNumberInput = (val: string, onChange: (val: string) => void) => {
        if (val === '' || /^\d+$/.test(val)) {
            onChange(val);
        }
    };

    const validateStatsSum = () => {
        const likes = Number(getValues('lectureHall.statsData.likes') || 0);
        const comments = Number(getValues('lectureHall.statsData.comments') || 0);
        const reposts = Number(getValues('lectureHall.statsData.reposts') || 0);
        
        const total = likes + comments + reposts;
        
        if (total !== 100) {
            return `Сумма ${total}% (нужно 100%)`;
        }
        return true;
    };

    const handleStatsChange = (val: string, onChange: (val: string) => void) => {
        handleNumberInput(val, async (newValue) => {
            onChange(newValue);
            await trigger([
                'lectureHall.statsData.likes',
                'lectureHall.statsData.comments',
                'lectureHall.statsData.reposts'
            ]);
        });
    }

    // --- ОТПРАВКА ФОРМЫ ---
    const onSubmit: SubmitHandler<CreateChannelForm> = async (data) => {
        try {
            setIsLoading(true);
            clearErrors("root");

            let imageUrl = "";

            // 1. Работа с изображением
            if (data.image && data.image instanceof File) {
                // Новый файл
                const formData = new FormData();
                formData.append("file", data.image);

                try {
                    const { data: uploadData } = await axios.post('/api/upload-images/avatar-telegram', formData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    });
                    imageUrl = uploadData.url;

                    // Если редактирование и была старая картинка -> удаляем старую
                    if (type === 'edit' && initialImageUrl) {
                        axios.post('/api/delete-image', { url: initialImageUrl })
                            .catch(err => console.error("Не удалось удалить старую картинку:", err));
                    }
                } catch (error) {
                    setError("image", { 
                        type: "manual", 
                        message: "Не удалось загрузить изображение" 
                    });
                    setIsLoading(false);
                    return;
                }
            } else if (typeof data.image === 'string') {
                // Старый URL
                imageUrl = data.image;
            }

            // 2. Payload
            const payload = {
                ...data,
                categoryId: Number(data.categoryId),
                image: imageUrl,
                lectureHall: {
                    ...data.lectureHall,
                    activePercentage: Number(data.lectureHall.activePercentage),
                    statsData: {
                        likes: Number(data.lectureHall.statsData.likes),
                        comments: Number(data.lectureHall.statsData.comments),
                        reposts: Number(data.lectureHall.statsData.reposts),
                    },
                    interestsItems: data.lectureHall.interestsItems.map(i => i.value).filter(Boolean),
                    geographyItems: data.lectureHall.geographyItems.map(g => ({
                        name: g.name,
                        percent: Number(g.percent)
                    }))
                }
            };

            // 3. Отправка (Create или Update)
            if (type === 'create') {
                await createChannel(payload);
            } else {
                if (id) {
                    await updateChannel(Number(id), payload);
                } else {
                    throw new Error("ID канала не найден");
                }
            }

            queryClient.invalidateQueries({ queryKey: ['Admin Channel'] })
            // 4. Редирект
            router.push('/admin/channels');

        } catch (error) {
            console.error(error);

            if (isAxiosError(error) && error.response) {
                const responseData = error.response.data;
                const serverMessage = responseData.message;

                const errorMessage = Array.isArray(serverMessage) 
                    ? serverMessage.join(', ') 
                    : serverMessage || "Произошла ошибка при сохранении";

                setError("root", {
                    type: "server",
                    message: errorMessage
                });
            } else {
                setError("root", {
                    type: "server",
                    message: "Произошла неизвестная ошибка"
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return <div className="text-white text-center py-10">Загрузка данных канала...</div>;
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center justify-between mb-8">
                    <AdminPageTitle title={type === 'create' ? "Добавить канал" : "Редактировать канал"} className="mb-0!" />

                    <div className="flex items-center gap-4">
                        {errors.root && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-lg text-sm font-medium">
                                {errors.root.message}
                            </div>
                        )}

                        <div className="flex items-center gap-2">
                            <AdminButton 
                                variant="secondary" 
                                className="min-w-[150px] rounded-full" 
                                type="button"
                                disabled={isLoading}
                                onClick={() => router.back()}
                            >
                                Отмена
                            </AdminButton>

                            <AdminButton 
                                className="min-w-[150px] rounded-full" 
                                type="submit"
                                loading={isLoading}
                                disabled={isLoading}
                            >
                                {type === 'create' ? "Создать" : "Сохранить"}
                            </AdminButton>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-7">
                    <AdminFormCard title="Основные настройки">
                        <div className="grid grid-cols-2 gap-2.5">
                            <Controller
                                control={control}
                                name="name"
                                rules={{ required: "Поле не заполнено", maxLength: { value: 128, message: "Не более 128 символов" } }}
                                render={({ field }) => (
                                    <AdminInput {...field} placeholder="Название канала" error={errors.name?.message} />
                                )}
                            />

                            <Controller
                                control={control}
                                name="categoryId"
                                rules={{ required: "Выберите категорию" }}
                                render={({ field }) => (
                                    <AdminSelect 
                                        placeholder="Выбрать категорию" 
                                        options={categories} 
                                        value={field.value} 
                                        onChange={field.onChange}
                                        error={errors.categoryId?.message}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="image"
                                rules={{ required: "Загрузите аватарку" }}
                                render={({ field }) => (
                                    <AdminFileUpload 
                                        placeholder="Загрузить аватарку"
                                        value={field.value as File | string | null} 
                                        onChange={field.onChange}
                                        error={errors.image?.message}
                                        accept="image/png, image/jpeg, image/jpg, image/webp"
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="description"
                                rules={{ required: "Поле не заполнено" }}
                                render={({ field }) => (
                                    <AdminInput {...field} placeholder="Описание канала" error={errors.description?.message} />
                                )}
                            />

                            <Controller
                                control={control}
                                name="coast"
                                rules={{ required: "Укажите стоимость" }}
                                render={({ field }) => (
                                    <AdminInput {...field} placeholder="Стоимость" error={errors.coast?.message} />
                                )}
                            />

                            <Controller
                                control={control}
                                name="subscribers"
                                rules={{ required: "Укажите подписчиков" }}
                                render={({ field }) => (
                                    <AdminInput 
                                        {...field} 
                                        placeholder="Количество подписчиков" 
                                        error={errors.subscribers?.message}
                                        onChange={(e) => handleNumberInput(e.target.value, field.onChange)}
                                    />
                                )}
                            />
                        </div>
                    </AdminFormCard>

                    <AdminFormCard title="Аудитория" className="grid grid-cols-1 gap-5">
                        <AdminFormGroup title="Как читают канал">
                            <div className="grid grid-cols-4 gap-2.5">
                                <Controller
                                    control={control}
                                    name="lectureHall.statsData.likes"
                                    rules={{ 
                                        required: "Укажите значение",
                                        validate: validateStatsSum
                                    }}
                                    render={({ field }) => (
                                        <AdminInput 
                                            placeholder="Лайкают (число в %)" 
                                            value={field.value}
                                            onChange={(e) => handleStatsChange(e.target.value, field.onChange)}
                                            error={errors.lectureHall?.statsData?.likes?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="lectureHall.statsData.comments"
                                    rules={{ 
                                        required: "Укажите значение",
                                        validate: validateStatsSum
                                    }}
                                    render={({ field }) => (
                                        <AdminInput 
                                            placeholder="Комментируют (число в %)" 
                                            value={field.value}
                                            onChange={(e) => handleStatsChange(e.target.value, field.onChange)}
                                            error={errors.lectureHall?.statsData?.comments?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="lectureHall.statsData.reposts"
                                    rules={{ 
                                        required: "Укажите значение",
                                        validate: validateStatsSum
                                    }}
                                    render={({ field }) => (
                                        <AdminInput 
                                            placeholder="Делают репосты (число в %)" 
                                            value={field.value}
                                            onChange={(e) => handleStatsChange(e.target.value, field.onChange)}
                                            error={errors.lectureHall?.statsData?.reposts?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="lectureHall.activePercentage"
                                    rules={{ 
                                        required: "Укажите значение",
                                        validate: (val) => Number(val) <= 100 || "Максимум 100%"
                                    }}
                                    render={({ field }) => (
                                        <AdminInput 
                                            placeholder="Активность (число в %)" 
                                            value={field.value}
                                            onChange={(e) => handleNumberInput(e.target.value, field.onChange)}
                                            error={errors.lectureHall?.activePercentage?.message}
                                        />
                                    )}
                                />
                            </div>
                        </AdminFormGroup>

                        <AdminFormGroup title="Интересы">
                            <div className="grid grid-cols-3 gap-2.5 mb-3">
                                {interestFields.map((field, index) => (
                                    <Controller
                                        key={field.id}
                                        control={control}
                                        name={`lectureHall.interestsItems.${index}.value`}
                                        render={({ field: inputField }) => (
                                            <AdminInput
                                                placeholder="Введите текст"
                                                value={inputField.value}
                                                onChange={inputField.onChange}
                                                icon={
                                                    (interestFields.length > 1 || inputField.value) ? (
                                                        <Trash size={18} className="hover:text-red-400 transition-colors" />
                                                    ) : undefined
                                                }
                                                onIconClick={() => removeInterest(index)}
                                            />
                                        )}
                                    />
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={() => appendInterest({ value: '' })}
                                className="underline underline-offset-2 text-[12px] text-white/80 transition hover:text-white cursor-pointer"
                            >
                                Добавить поле
                            </button>
                        </AdminFormGroup>

                        <div className="grid grid-cols-3 gap-2.5">
                            <AdminFormGroup title="Формат потребления">
                                <Controller
                                    control={control}
                                    name="lectureHall.consumption"
                                    rules={{ required: "Поле не заполнено" }}
                                    render={({ field }) => (
                                        <AdminInput {...field} placeholder="Введите текст" error={errors.lectureHall?.consumption?.message} />
                                    )}
                                />
                            </AdminFormGroup>

                            <AdminFormGroup title="Как читают канал">
                                <Controller
                                    control={control}
                                    name="lectureHall.howRead"
                                    rules={{ required: "Поле не заполнено" }}
                                    render={({ field }) => (
                                        <AdminInput {...field} placeholder="Введите текст" error={errors.lectureHall?.howRead?.message} />
                                    )}
                                />
                            </AdminFormGroup>

                            <AdminFormGroup title="Реакция на рекламу">
                                <Controller
                                    control={control}
                                    name="lectureHall.reaction"
                                    rules={{ required: "Поле не заполнено" }}
                                    render={({ field }) => (
                                        <AdminInput {...field} placeholder="Введите текст" error={errors.lectureHall?.reaction?.message} />
                                    )}
                                />
                            </AdminFormGroup>
                        </div>

                        <div className="grid grid-cols-3 gap-2.5">
                            <AdminFormGroup title="Частота пробления">
                                <Controller
                                    control={control}
                                    name="lectureHall.frequency"
                                    rules={{ required: "Поле не заполнено" }}
                                    render={({ field }) => (
                                        <AdminInput {...field} placeholder="Введите текст" error={errors.lectureHall?.frequency?.message} />
                                    )}
                                />
                            </AdminFormGroup>

                            <AdminFormGroup title="География" className="col-span-2">
                                <div className="grid grid-cols-2 gap-2.5 mb-3">
                                    {geoFields.map((field, index) => (
                                        <div key={field.id} className="flex gap-2 relative">
                                            <div className="w-[60%]">
                                                <Controller
                                                    control={control}
                                                    name={`lectureHall.geographyItems.${index}.name`}
                                                    rules={{ required: "Укажите страну" }}
                                                    render={({ field: inputField, fieldState }) => (
                                                        <AdminInput
                                                            placeholder="Страна"
                                                            value={inputField.value}
                                                            onChange={inputField.onChange}
                                                            error={fieldState.error?.message}
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <div className="w-[40%]">
                                                <Controller
                                                    control={control}
                                                    name={`lectureHall.geographyItems.${index}.percent`}
                                                    rules={{ 
                                                        required: "Укажите %",
                                                        validate: (val) => Number(val) <= 100 || "Макс 100%"
                                                    }}
                                                    render={({ field: inputField, fieldState }) => (
                                                        <AdminInput
                                                            placeholder="%"
                                                            value={inputField.value}
                                                            onChange={(e) => handleNumberInput(e.target.value, inputField.onChange)}
                                                            error={fieldState.error?.message}
                                                            icon={<Trash size={18} className="hover:text-red-400 transition-colors" />}
                                                            onIconClick={() => removeGeo(index)}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => appendGeo({ name: '', percent: '' })}
                                    className="underline underline-offset-2 text-[12px] text-white/80 transition hover:text-white cursor-pointer"
                                >
                                    Добавить поле
                                </button>
                            </AdminFormGroup>
                        </div>
                    </AdminFormCard>

                    <AdminFormCard title="Контент" className="grid grid-cols-1 gap-5">
                        <AdminFormGroup title="Форматы контента">
                            <Controller
                                control={control}
                                name="content.formats"
                                render={({ field }) => (
                                    <div className="grid grid-cols-4 gap-y-2.5 gap-x-2">
                                        {FORMAT_OPTIONS.map((format) => (
                                            <AdminCheckbox
                                                key={format}
                                                label={format}
                                                checked={field.value.includes(format)}
                                                onChange={() => {
                                                    const newValue = field.value.includes(format)
                                                        ? field.value.filter(f => f !== format)
                                                        : [...field.value, format];
                                                    field.onChange(newValue);
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            />
                        </AdminFormGroup>

                        <AdminFormGroup title="Статистика">
                            <div className="grid grid-cols-3 gap-2.5">
                                <Controller
                                    control={control}
                                    name="content.stats.overallCoverage"
                                    rules={{ required: "Поле не заполнено" }}
                                    render={({ field }) => (
                                        <AdminInput 
                                            {...field} 
                                            placeholder="Средний охват постов (просмотры)" 
                                            error={errors.content?.stats?.overallCoverage?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="content.stats.monthlyCoverage"
                                    rules={{ required: "Поле не заполнено" }}
                                    render={({ field }) => (
                                        <AdminInput 
                                            {...field} 
                                            placeholder="Средний охват в месяц (просмотры)" 
                                            error={errors.content?.stats?.monthlyCoverage?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="content.stats.er"
                                    rules={{ required: "Поле не заполнено" }}
                                    render={({ field }) => (
                                        <AdminInput 
                                            {...field} 
                                            placeholder="ER (число в %)" 
                                            error={errors.content?.stats?.er?.message}
                                            onChange={(e) => handleNumberInput(e.target.value, field.onChange)}
                                        />
                                    )}
                                />
                            </div>
                        </AdminFormGroup>
                    </AdminFormCard>

                    <AdminFormCard title="Стоимость рекламы">
                        <AdminFormGroup title="Средняя цена">
                            <div className="grid grid-cols-3 gap-2.5">
                                <Controller
                                    control={control}
                                    name="priceAdd.advertisement"
                                    rules={{ required: "Укажите цену" }}
                                    render={({ field }) => (
                                        <AdminInput {...field} placeholder="Рекламный пост" error={errors.priceAdd?.advertisement?.message} />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="priceAdd.integration"
                                    rules={{ required: "Укажите цену" }}
                                    render={({ field }) => (
                                        <AdminInput {...field} placeholder="Интеграция" error={errors.priceAdd?.integration?.message} />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="priceAdd.repost"
                                    rules={{ required: "Укажите цену" }}
                                    render={({ field }) => (
                                        <AdminInput {...field} placeholder="Репост" error={errors.priceAdd?.repost?.message} />
                                    )}
                                />
                            </div>
                        </AdminFormGroup>
                    </AdminFormCard>
                </div>
            </form>
        </div>
    )
}