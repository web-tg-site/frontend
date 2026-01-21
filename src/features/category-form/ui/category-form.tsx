'use client'

import { useEffect, useState } from "react" // ✅ Добавили useState
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation"
import { isAxiosError } from "axios"

// UI Components
import { AdminButton } from "@/shared/ui/admin/ui/admin-button"
import { AdminPageTitle } from "@/shared/ui/admin/ui/admin-page-title"
import { AdminFormCard } from "@/shared/ui/admin/ui/form/admin-form-card"
import { AdminFormGroup } from "@/shared/ui/admin/ui/form/admin-form-group"
import { AdminInput } from "@/shared/ui/admin/ui/form/admin-input"
import { AdminSelect } from "@/shared/ui/admin/ui/form/admin-select"
import { AdminColorPicker } from "@/shared/ui/admin/ui/form/admin-color-picker"

// Utils
import { getBigIconList } from "../config/icon-list"
import { createCategory } from "../api/create-category"
import { updateCategory } from "../api/update-category"
import { getCategory } from '../api/get-category'
import { useQueryClient } from "@tanstack/react-query"

interface CategoryFormData {
    name: string;
    icon: string;
    color: string;
}

interface CategoryFormProps {
    type?: "create" | "edit";
    id?: number;
}

export const CategoryForm = ({ type = "create", id }: CategoryFormProps) => {
    const router = useRouter()
    const queryClinet = useQueryClient();
    const iconOptions = getBigIconList()
    
    // ✅ Состояние загрузки данных (только для режима редактирования)
    const [isFetching, setIsFetching] = useState(type === 'edit');

    const { 
        control, 
        handleSubmit, 
        setError, 
        clearErrors,
        reset, // ✅ Достаем reset для заполнения формы
        formState: { errors, isSubmitting } 
    } = useForm<CategoryFormData>({
        defaultValues: {
            name: "",
            icon: "",
            color: "" 
        },
        mode: "onChange"
    })

    // ✅ ЭФФЕКТ ЗАГРУЗКИ ДАННЫХ
    useEffect(() => {
        const loadCategoryData = async () => {
            if (type === 'edit' && id) {
                try {
                    setIsFetching(true);
                    const data = await getCategory(id);
                    
                    // Заполняем форму пришедшими данными
                    reset({
                        name: data.name,
                        icon: data.icon,
                        color: data.color
                    });
                } catch (error) {
                    console.error("Не удалось загрузить категорию:", error);
                    alert("Ошибка загрузки данных категории");
                    router.push('/admin/category'); // Возвращаем назад при ошибке
                } finally {
                    setIsFetching(false);
                }
            }
        };

        loadCategoryData();
    }, [type, id, reset, router]);

    const onSubmit: SubmitHandler<CategoryFormData> = async (data) => {
        try {
            clearErrors("root");
            
            if (type === 'create') {
                await createCategory(data);
            } else {
                if (!id) throw new Error("ID не найден");
                await updateCategory(id, data);
            }

            queryClinet.invalidateQueries({ queryKey: ['Admin Categories Table'] })
            queryClinet.invalidateQueries({ queryKey: ['Admin category'] })
            router.push('/admin/category'); 
            
        } catch (error) {
            console.error("Ошибка при сохранении:", error);

            if (isAxiosError(error) && error.response) {
                const responseData = error.response.data;
                const messages = responseData.message;

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
    }

    // ✅ Показываем лоадер, пока данные не подгрузились
    if (isFetching) {
        return (
            <div className="w-full h-[300px] flex items-center justify-center text-white/50 animate-pulse">
                Загрузка данных категории...
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center justify-between mb-8">
                <AdminPageTitle 
                    title={type === 'create' ? "Добавить категорию" : "Редактировать категорию"} 
                    className="mb-0!" 
                />

                <div className="flex items-center gap-4">
                    {errors.root && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-lg text-sm font-medium animate-in fade-in slide-in-from-right-5">
                            {errors.root.message}
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        <AdminButton 
                            variant="secondary" 
                            className="min-w-[150px] rounded-full" 
                            type="button"
                            onClick={() => router.back()}
                            disabled={isSubmitting}
                        >
                            Отмена
                        </AdminButton>
                        <AdminButton 
                            className="min-w-[150px] rounded-full" 
                            type="submit"
                            loading={isSubmitting}
                        >
                            {type === 'create' ? "Создать" : "Сохранить"}
                        </AdminButton>
                    </div>
                </div>
            </div>

            <AdminFormCard title="Данные категории">
                <div className="grid grid-cols-3 gap-5">
                    
                    <AdminFormGroup title="Название">
                        <Controller
                            control={control}
                            name="name"
                            rules={{ required: "Введите название" }}
                            render={({ field }) => (
                                <AdminInput placeholder="Название" {...field} error={errors.name?.message} />
                            )}
                        />
                    </AdminFormGroup>

                    <AdminFormGroup title="Иконка">
                        <Controller
                            control={control}
                            name="icon"
                            rules={{ required: "Выберите иконку" }}
                            render={({ field }) => (
                                <AdminSelect 
                                    placeholder="Выберите иконку..."
                                    options={iconOptions}
                                    value={field.value} 
                                    onChange={field.onChange}
                                    error={errors.icon?.message}
                                    isSearchable={true}
                                />
                            )}
                        />
                    </AdminFormGroup>

                    <AdminFormGroup title="Цвет">
                        <Controller
                            control={control}
                            name="color"
                            rules={{ 
                                required: "Выберите цвет",
                                pattern: {
                                    value: /^#([0-9A-F]{3}){1,2}$/i,
                                    message: "Некорректный HEX код"
                                }
                            }}
                            render={({ field }) => (
                                <AdminColorPicker 
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={errors.color?.message}
                                />
                            )}
                        />
                    </AdminFormGroup>

                </div>
            </AdminFormCard>
        </form>
    )
}