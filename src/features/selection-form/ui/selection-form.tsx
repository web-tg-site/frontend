'use client'

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { isAxiosError } from "axios"

// UI
import { AdminButton } from "@/shared/ui/admin/ui/admin-button"
import { AdminPageTitle } from "@/shared/ui/admin/ui/admin-page-title"
import { AdminFormCard } from "@/shared/ui/admin/ui/form/admin-form-card"
import { AdminFormGroup } from "@/shared/ui/admin/ui/form/admin-form-group"
import { AdminInput } from "@/shared/ui/admin/ui/form/admin-input"
import { AdminSelect } from "@/shared/ui/admin/ui/form/admin-select"
import { AdminTextarea } from "@/shared/ui/admin/ui/form/admin-textarea"
import { AdminToggleGroup } from "@/shared/ui/admin/ui/form/admin-toggle-group"
import { AdminCheckbox } from "@/shared/ui/admin/ui/form/admin-checkbox"
import { AdminInlineButton } from "@/shared/ui/admin/ui/admin-inline-button"
import { AdminColorPicker } from "@/shared/ui/admin/ui/form/admin-color-picker"

// Utils & Configs
import { cn, formatPrice } from "@/shared/utils"
import { STATUS_OPTIONS } from "@/page/admin-personal-selection/config/status-options"
import { CONTENT_OPTIONS } from "../config/content_options"

// Components & Hooks
import { AddChannelPage } from "./add-channel-page"
import { useGetChannelForSelection } from "../api/use-get-channels-for-selection"
import { ChannelCard } from "@/entities/channel"
import { Gender } from "../types/gender"
import { SelectionFormData } from "../types/selection-form-data"

// API
import { createPersonalSelection, updatePersonalSelection } from "../api/send-selection"
import { getSelection } from "../api/get-selection"
import { useQueryClient } from "@tanstack/react-query"

const GENDER_OPTIONS = [
    { value: 'woman', label: 'Ж' },
    { value: 'man', label: 'М' }
];

export const SelectionForm = ({
    type = 'create',
    id
}: {
    type?: 'create' | 'edit',
    id?: string
}) => {
    const router = useRouter();
    const queryClinet = useQueryClient();

    // Загрузка каналов
    const { data: channels, isLoading: channelsLoading } = useGetChannelForSelection();

    // Состояние загрузки данных подборки
    const [isFetching, setIsFetching] = useState(type === 'edit');

    const { 
        control, 
        handleSubmit, 
        setValue, 
        watch, 
        reset, 
        setError, 
        clearErrors,
        formState: { errors, isSubmitting } 
    } = useForm<SelectionFormData>({
        defaultValues: {
            for: { name: "", color: "" },
            goal: "",
            consumer: { gender: Gender.MAN, title: "", description: "" },
            formats: [],
            total: "",
            channelIds: [],
            status: "draft"
        }
    });

    const [addChannelPage, setAddChannelPage] = useState<boolean>(false);
    
    // ✅ По умолчанию всегда 'auto'
    const [selectedCalculate, setSelectedCalculate] = useState<'auto' | 'manual'>('auto');
    const [manualTotal, setManualTotal] = useState('');

    const selectedChannelIds = watch("channelIds");

    // --- 1. ЗАГРУЗКА ДАННЫХ ПРИ РЕДАКТИРОВАНИИ ---
    useEffect(() => {
        const fetchSelectionData = async () => {
            if (type === 'edit' && id) {
                try {
                    setIsFetching(true);
                    const data = await getSelection(id);

                    // ДЕБАГ: Посмотрите в консоль браузера, что реально приходит
                    console.log("Пришли данные с сервера:", data); 

                    // Определяем массив форматов.
                    // @ts-ignore — игнорируем ошибку типов, если в интерфейсе указано неверно
                    const rawFormats = data.formats || data.format || [];
                    
                    // Защита от пробелов (например "Текст " !== "Текст")
                    const cleanFormats = Array.isArray(rawFormats) 
                        ? rawFormats.map((f: string) => f.trim()) 
                        : [];

                    reset({
                        for: data.for,
                        goal: data.goal,
                        consumer: data.consumer,
                        formats: cleanFormats, // <--- ИСПРАВЛЕНО ТУТ
                        total: data.total,
                        channelIds: data.channelIds,
                        status: data.status
                    });
                    setManualTotal(data.total);
                    
                } catch (error) {
                    console.error("Ошибка загрузки подборки:", error);
                    // router.push('/admin/personal-selection'); // Лучше временно закомментировать редирект для отладки
                } finally {
                    setIsFetching(false);
                }
            }
        };

        fetchSelectionData();
    }, [type, id, reset, router]);


    // --- 2. ЛОГИКА ПОДСЧЕТА ---
    const autoTotal = useMemo(() => {
        if (!channels) return 0;
        const currentIds = selectedChannelIds || [];
        
        return channels
            .filter(c => currentIds.includes(c.id))
            .reduce((sum, current) => sum + current.price, 0);
    }, [channels, selectedChannelIds]);

    useEffect(() => {
        if (!isFetching) {
            const displayTotal = selectedCalculate === 'auto' 
                ? `${formatPrice(autoTotal)} ₽` 
                : manualTotal;
            
            setValue("total", displayTotal);
        }
    }, [autoTotal, selectedCalculate, manualTotal, setValue, isFetching]);

    const onSubmit: SubmitHandler<SelectionFormData> = async (data) => {
        try {
            clearErrors("root");

            if (type === 'create') {
                await createPersonalSelection(data);
            } else {
                if (!id) throw new Error("ID не найден");
                await updatePersonalSelection(id, data);
            }

            queryClinet.invalidateQueries({ queryKey: ['Admin Personal Selection Table'] })

            router.push('/admin/personal-selection');
            
        } catch (error) {
            console.error("Ошибка при сохранении:", error);

            if (isAxiosError(error) && error.response) {
                const messages = error.response.data.message;
                const errorMessage = Array.isArray(messages) 
                    ? messages.join(', ') 
                    : messages || "Ошибка сервера";

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
        }
    };

    if (isFetching) {
        return <div className="text-center py-20 text-white/50 animate-pulse">Загрузка данных...</div>;
    }

    if (addChannelPage) {
        return (
            <AddChannelPage
                onBack={() => setAddChannelPage(false)}
                channels={channels || []}
                channelLoading={channelsLoading}
                selectedChannels={selectedChannelIds || []}
                onAdd={(id) => setValue("channelIds", [...(selectedChannelIds || []), id])}
                onRemove={(id) => setValue("channelIds", selectedChannelIds.filter(item => item !== id))}
            />
        )
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <AdminPageTitle title={type === 'create' ? "Создать подборку" : "Редактировать подборку"} className="mb-0!" />

                <div className="flex items-center gap-4">
                    {errors.root && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-lg text-sm font-medium animate-in fade-in">
                            {errors.root.message}
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        <AdminButton
                            variant="secondary"
                            className="min-w-[150px] rounded-full"
                            type="button"
                            disabled={isSubmitting}
                            onClick={() => router.push('/admin/personal-selection')}
                        >
                            Отмена
                        </AdminButton>
                        <AdminButton
                            className="min-w-[150px] rounded-full"
                            type="submit"
                            onClick={handleSubmit(onSubmit)}
                            loading={isSubmitting}
                        >
                            {type === 'create' ? "Создать" : "Сохранить"}
                        </AdminButton>
                    </div>
                </div>
            </div>

            <form className="grid grid-cols-1 gap-7">
                <AdminFormCard>
                    <div className="grid grid-cols-3 gap-2.5">
                        <AdminFormGroup title="Название компании">
                            <Controller
                                control={control}
                                name="for.name"
                                rules={{ required: "Введите название компании" }}
                                render={({ field }) => (
                                    <AdminInput 
                                        placeholder="Введите текст" 
                                        {...field} 
                                        error={errors.for?.name?.message} 
                                    />
                                )}
                            />
                        </AdminFormGroup>

                        <AdminFormGroup title="Статус подборки">
                            <Controller
                                control={control}
                                name="status"
                                rules={{ required: "Выберите статус" }}
                                render={({ field }) => (
                                    <AdminSelect
                                        placeholder="Выбрать статус"
                                        options={STATUS_OPTIONS}
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={errors.status?.message}
                                    />
                                )}
                            />
                        </AdminFormGroup>

                        <AdminFormGroup title="Цвет метки компании">
                            <Controller
                                control={control}
                                name="for.color"
                                rules={{ required: "Выберите цвет" }}
                                render={({ field }) => (
                                    <AdminColorPicker 
                                        value={field.value} 
                                        onChange={field.onChange} 
                                        error={errors.for?.color?.message}
                                        placeholder="#FFFFFF"
                                    />
                                )}
                            />
                        </AdminFormGroup>
                    </div>
                </AdminFormCard>

                <AdminFormCard title="Анализ вашей ниши">
                    <AdminFormGroup title="Цель рекламной компании" className="mb-5">
                        <Controller
                            control={control}
                            name="goal"
                            rules={{ required: "Укажите цель" }}
                            render={({ field }) => (
                                <AdminTextarea 
                                    placeholder="Введите текст" 
                                    {...field} 
                                    error={errors.goal?.message} 
                                />
                            )}
                        />
                    </AdminFormGroup>

                    <AdminFormGroup title="Целевая аудитория">
                        <div className="grid grid-cols-12 gap-3 mb-2.5">
                            <div className="col-span-11">
                                <Controller
                                    control={control}
                                    name="consumer.title"
                                    rules={{ required: "Введите название сегмента" }}
                                    render={({ field }) => (
                                        <AdminInput 
                                            placeholder="Название сегмента ЦА" 
                                            {...field} 
                                            error={errors.consumer?.title?.message} 
                                        />
                                    )}
                                />
                            </div>

                            <div className="col-span-1">
                                <Controller
                                    control={control}
                                    name="consumer.gender"
                                    render={({ field }) => (
                                        <AdminToggleGroup
                                            options={GENDER_OPTIONS}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <Controller
                            control={control}
                            name="consumer.description"
                            rules={{ required: "Введите описание" }}
                            render={({ field }) => (
                                <AdminTextarea 
                                    placeholder="Описание целевой аудитории" 
                                    {...field} 
                                    error={errors.consumer?.description?.message} 
                                />
                            )}
                        />
                    </AdminFormGroup>
                </AdminFormCard>

                {/* --- ИСПРАВЛЕННЫЙ БЛОК КОНТЕНТА --- */}
                <AdminFormCard title="Контент">
                    <AdminFormGroup title="Рекомендуемый формат контента">
                        <Controller
                            control={control}
                            name="formats"
                            // Добавлена валидация: массив должен быть > 0
                            rules={{ 
                                validate: (value) => (value && value.length > 0) || "Выберите хотя бы один формат" 
                            }}
                            render={({ field: { value, onChange } }) => (
                                <>
                                    <div className="grid grid-cols-4 gap-y-2.5 gap-x-2">
                                        {CONTENT_OPTIONS.map((format) => {
                                            const currentValues = value || [];
                                            const isChecked = currentValues.includes(format);
                                            
                                            return (
                                                <AdminCheckbox
                                                    key={format}
                                                    label={format}
                                                    checked={isChecked}
                                                    onChange={() => {
                                                        const nextValues = isChecked
                                                            ? currentValues.filter((item: string) => item !== format)
                                                            : [...currentValues, format];
                                                        onChange(nextValues);
                                                    }}
                                                />
                                            )
                                        })}
                                    </div>
                                    {errors.formats && (
                                        <p className="text-red-400 text-sm mt-2 px-1 animate-in fade-in">
                                            {errors.formats.message}
                                        </p>
                                    )}
                                </>
                            )}
                        />
                    </AdminFormGroup>
                </AdminFormCard>
                {/* ---------------------------------- */}

                <AdminFormCard title="Персональная подборка каналов">
                    <div className="pb-5 grid grid-cols-3 gap-3">
                        {channels?.map((c) => {
                            if (selectedChannelIds?.includes(c.id)) {
                                return (
                                    <ChannelCard
                                        {...c}
                                        key={c.id}
                                        buttonAction="delete"
                                        type="admin"
                                        onAdminClick={(id) => setValue("channelIds", selectedChannelIds.filter(item => item !== id))}
                                    />
                                )
                            }
                        })}
                        {(!selectedChannelIds || selectedChannelIds.length === 0) && (
                            <p className="text-white/30 text-sm col-span-3 pb-2">Каналы еще не выбраны</p>
                        )}
                    </div>
                    <AdminInlineButton type="button" onClick={() => setAddChannelPage(true)}>
                        Добавить канал
                    </AdminInlineButton>
                </AdminFormCard>

                <AdminFormCard title="Итоговая стоимость">
                    <div className="flex items-center gap-5 mb-5">
                        <SelectButton
                            text="Автоматический подсчет"
                            selected={selectedCalculate === 'auto'}
                            onClick={() => {
                                setSelectedCalculate('auto');
                            }}
                        />

                        <SelectButton
                            text="Ввести вручную"
                            selected={selectedCalculate === 'manual'}
                            onClick={() => {
                                setSelectedCalculate('manual');
                                if (!manualTotal) setManualTotal(`${formatPrice(autoTotal)} ₽`);
                            }}
                        />
                    </div>

                    <Controller
                        control={control}
                        name="total"
                        rules={{ required: "Укажите стоимость" }}
                        render={({ field }) => (
                            <AdminInput
                                placeholder="Введите сумму"
                                {...field}
                                onChange={(e) => {
                                    setManualTotal(e.target.value);
                                    field.onChange(e.target.value);
                                }}
                                disabled={selectedCalculate === 'auto'}
                                className="disabled:opacity-100 disabled:text-white"
                                error={errors.total?.message}
                            />
                        )}
                    />
                </AdminFormCard>
            </form>
        </div>
    )
}

const SelectButton = ({
    selected,
    onClick,
    text
}: {
    selected: boolean,
    onClick: () => void,
    text: string
}) => {
    return (
        <button
            type="button"
            className={cn(
                "text-[14px] transition-all duration-300 ease-in-out font-medium",
                selected
                    ? "text-white underline underline-offset-4 decoration-white"
                    : "text-white/40 hover:text-white cursor-pointer"
            )}
            onClick={onClick}
        >
            {text}
        </button>
    )
}