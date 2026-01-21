'use client'

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import { isAxiosError } from "axios"

// UI
import { AdminPageTitle } from "@/shared/ui/admin/ui/admin-page-title"
import { AdminButton } from "@/shared/ui/admin/ui/admin-button"
import { AdminFormCard } from "@/shared/ui/admin/ui/form/admin-form-card"
import { AdminInput } from "@/shared/ui/admin/ui/form/admin-input"
import { AdminCheckbox } from "@/shared/ui/admin/ui/form/admin-checkbox"
import { AdminSelect } from "@/shared/ui/admin/ui/form/admin-select"

// API
import { createHero } from "../api/create-hero"
import { updateHero } from "../api/update-hero"
import { getHero } from "../api/get-hero"
import { useAdminChannels } from "@/page/admin-channels/api/use-admin-channels"

interface HeroFormProps {
    type?: 'create' | 'edit';
    id?: string;
}

interface HeroFormInputs {
    channelId: string | number; // Теперь это ID выбранного канала
    message: string;
    time: string;
    isPinned: boolean;
    isVerified: boolean;
}

export const HeroForm = ({
    type = 'create',
    id
}: HeroFormProps) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    // 1. Загружаем список всех каналов для селекта
    const { data: channelsData, isLoading: channelsLoading } = useAdminChannels();
    
    // 2. Преобразуем каналы в формат опций для селекта
    const channelOptions = useMemo(() => {
        if (!channelsData) return [];
        return channelsData.map(channel => ({
            value: channel.id,
            label: channel.name, // Название канала будет в списке
            keywords: String(channel.id) // Добавляем ID в ключевые слова для поиска по ID тоже
        }));
    }, [channelsData]);

    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(type === 'edit');

    const { 
        control, 
        handleSubmit, 
        setError, 
        reset,
        formState: { errors } 
    } = useForm<HeroFormInputs>({
        defaultValues: {
            channelId: '',
            message: '',
            time: '',
            isPinned: false,
            isVerified: false
        },
        mode: 'onChange'
    });

    // --- ЗАГРУЗКА ДАННЫХ (для редактирования) ---
    useEffect(() => {
        const loadData = async () => {
            if (type === 'edit' && id) {
                try {
                    setIsFetching(true);
                    const data = await getHero(id);
                    
                    reset({
                        channelId: data.channelId, // ID канала
                        message: data.message,
                        time: data.time,
                        isPinned: data.isPinned,
                        isVerified: data.isVerified
                    });
                } catch (e) {
                    console.error(e);
                    router.push('/admin/hero');
                } finally {
                    setIsFetching(false);
                }
            }
        };
        loadData();
    }, [type, id, reset, router]);


    // --- ОТПРАВКА ---
    const onSubmit: SubmitHandler<HeroFormInputs> = async (data) => {
        try {
            setIsLoading(true);

            const payload = {
                channelId: Number(data.channelId),
                message: data.message,
                time: data.time,
                isPinned: data.isPinned,
                isVerified: data.isVerified
            };

            if (type === 'create') {
                await createHero(payload);
            } else {
                if (!id) return;
                await updateHero(Number(id), payload);
            }

            // Обновляем таблицу
            queryClient.invalidateQueries({ queryKey: ['Admin Hero Table'] });
            router.push('/admin/hero');

        } catch (error) {
            console.error(error);
            if (isAxiosError(error) && error.response) {
                const msg = error.response.data.message || "Ошибка сохранения";
                setError("root", { type: "server", message: Array.isArray(msg) ? msg.join(', ') : msg });
            } else {
                setError("root", { type: "server", message: "Неизвестная ошибка" });
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return <div className="text-white text-center py-10">Загрузка данных...</div>;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center justify-between mb-8">
                <AdminPageTitle 
                    title={type === 'create' ? "Добавить Hero запись" : "Редактировать Hero"} 
                    className="mb-0!" 
                />

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
                            onClick={() => router.back()}
                            disabled={isLoading}
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

            <AdminFormCard>
                <div className="grid grid-cols-2 gap-4">
                    
                    {/* ВЫБОР КАНАЛА */}
                    <Controller
                        control={control}
                        name="channelId"
                        rules={{ required: "Выберите канал" }}
                        render={({ field }) => (
                            <AdminSelect 
                                placeholder="Выберите канал"
                                options={channelOptions} // Опции из API
                                value={field.value}
                                onChange={field.onChange}
                                error={errors.channelId?.message}
                                isLoading={channelsLoading}
                                isSearchable={true} // Включаем поиск
                            />
                        )}
                    />

                    {/* ВРЕМЯ */}
                    <Controller
                        control={control}
                        name="time"
                        rules={{ required: "Укажите время" }}
                        render={({ field }) => (
                            <AdminInput 
                                {...field}
                                placeholder="Время (например 12:00)"
                                error={errors.time?.message}
                            />
                        )}
                    />

                    {/* СООБЩЕНИЕ (на всю ширину) */}
                    <div className="col-span-2">
                        <Controller
                            control={control}
                            name="message"
                            rules={{ required: "Введите рекламное сообщение" }}
                            render={({ field }) => (
                                <AdminInput 
                                    {...field}
                                    placeholder="Рекламный текст / Заголовок"
                                    error={errors.message?.message}
                                />
                            )}
                        />
                    </div>

                    {/* ЧЕКБОКСЫ */}
                    <div className="col-span-2 flex items-center gap-6 mt-2">
                        <Controller
                            control={control}
                            name="isPinned"
                            render={({ field }) => (
                                <AdminCheckbox 
                                    label="Закрепить канал"
                                    checked={field.value}
                                    onChange={(checked) => field.onChange(checked)}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="isVerified"
                            render={({ field }) => (
                                <AdminCheckbox 
                                    label="Верифицирован (галочка)"
                                    checked={field.value}
                                    onChange={(checked) => field.onChange(checked)}
                                />
                            )}
                        />
                    </div>

                </div>
            </AdminFormCard>
        </form>
    )
}