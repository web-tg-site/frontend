'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import { isAxiosError } from "axios"

// UI
import { AdminButton } from "@/shared/ui/admin/ui/admin-button"
import { AdminPageTitle } from "@/shared/ui/admin/ui/admin-page-title"
import { AdminFormCard } from "@/shared/ui/admin/ui/form/admin-form-card"
import { AdminInput } from "@/shared/ui/admin/ui/form/admin-input"
import { AdminSelect } from "@/shared/ui/admin/ui/form/admin-select"

// API
import { createAdmin } from "../api/create-admin"
import { ROLES_OPTION } from "@/page/admin-roles/config/roles-option"

// Типы формы (исправили role -> type)
interface CreateAdminInputs {
    name: string;
    email: string;
    type: string | number; // <-- Здесь теперь type
    password: string;
}

export const AdminForm = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const [isLoading, setIsLoading] = useState(false);

    const { 
        control, 
        handleSubmit, 
        setError, 
        formState: { errors } 
    } = useForm<CreateAdminInputs>({
        defaultValues: {
            name: '',
            email: '',
            type: '', // <-- Здесь тоже type
            password: ''
        },
        mode: 'onChange'
    });

    const onSubmit: SubmitHandler<CreateAdminInputs> = async (data) => {
        try {
            setIsLoading(true);

            await createAdmin({
                name: data.name,
                email: data.email,
                type: String(data.type), // <-- Отправляем как type
                password: data.password
            });

            queryClient.invalidateQueries({ queryKey: ['Admin Table'] });
            router.push('/admin/roles');

        } catch (error) {
            console.error(error);
            if (isAxiosError(error) && error.response) {
                const errorMessage = error.response.data.message || "Ошибка при создании";
                setError("root", { type: "server", message: errorMessage });
            } else {
                setError("root", { type: "server", message: "Произошла неизвестная ошибка" });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center justify-between mb-8">
                <AdminPageTitle 
                    title="Добавить участника"
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
                            Добавить
                        </AdminButton>
                    </div>
                </div>
            </div>

            <AdminFormCard>
                <div className="grid grid-cols-2 gap-2">
                    
                    <Controller
                        control={control}
                        name="name"
                        rules={{ required: "Введите имя" }}
                        render={({ field }) => (
                            <AdminInput 
                                {...field}
                                placeholder="Имя участника"
                                error={errors.name?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="email"
                        rules={{ 
                            required: "Введите почту",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Некорректный email"
                            }
                        }}
                        render={({ field }) => (
                            <AdminInput 
                                {...field}
                                placeholder="Электронная почта"
                                error={errors.email?.message}
                            />
                        )}
                    />

                    {/* Поле выбора роли (name="type") */}
                    <Controller
                        control={control}
                        name="type" 
                        rules={{ required: "Выберите роль" }}
                        render={({ field }) => (
                            <AdminSelect 
                                options={ROLES_OPTION}
                                placeholder="Выбрать роль"
                                onChange={(val) => field.onChange(val)}
                                value={field.value}
                                error={errors.type?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        rules={{ 
                            required: "Введите пароль",
                            minLength: {
                                value: 6,
                                message: "Минимум 6 символов"
                            }
                        }}
                        render={({ field }) => (
                            <AdminInput 
                                {...field}
                                placeholder="Пароль"
                                type="password"
                                error={errors.password?.message}
                            />
                        )}
                    />
                </div>
            </AdminFormCard>
        </form>
    )
}