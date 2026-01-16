"use client"

import { useState } from "react";
import { Search } from "lucide-react";

import { AdminPageTitle } from "@/shared/ui/admin/ui/admin-page-title";
import { AdminChannelsProps } from "../types/admin-channels.props";
import { AdminInput } from "@/shared/ui/admin/ui/form/admin-input";
import { AdminSelect } from "@/shared/ui/admin/ui/form/admin-select";
import { SUBSCRIBERS } from "../config/subscribers";
import { useAdminCategories } from "../api/use-admin-category";
import { useAdminChannels } from "../api/use-admin-channels";
import { useConfirm } from "@/shared/lib/confirm-dialog";
import { AdminChannelsTable } from "./admin-channels-table";

export const AdminChannels = ({
    type
}: AdminChannelsProps) => {
    // Определяем права доступа: если admin — можно редактировать/удалять
    const isEditable = type === 'admin'; 

    // Хук для вызова модалки
    const { confirm } = useConfirm();

    // Стейты фильтров и поиска
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | number | null>(null);
    const [selectedSubscribers, setSelectedSubscribers] = useState<string | number | null>(null);

    // Загрузка данных категорий
    const { data: categoryData, isLoading: categoryLoading } = useAdminCategories();
    // categories: { value: number, label: string }[]
    const categories = !categoryData ? [] : categoryData;

    // Загрузка данных каналов
    const { data: channelData, isLoading: channelLoading } = useAdminChannels();
    const rawChannels = !channelData ? [] : channelData;

    // --- ЛОГИКА ФИЛЬТРАЦИИ ---
    const filteredChannels = rawChannels.filter(channel => {
        // 1. Поиск по имени
        const matchesSearch = channel.name.toLowerCase().includes(searchTerm.toLowerCase());

        // 2. Фильтр по категории
        let matchesCategory = true;
        if (selectedCategory) {
            const categoryObj = categories.find(cat => cat.value === selectedCategory);
            if (categoryObj) {
                matchesCategory = channel.category === categoryObj.label;
            }
        }

        // 3. Фильтр по подписчикам
        let matchesSubscribers = true;
        if (selectedSubscribers) {
            const count = channel.subscribers;
            const range = selectedSubscribers as string;

            switch (range) {
                case '1k-5k': matchesSubscribers = count >= 1000 && count <= 5000; break;
                case '5k-10k': matchesSubscribers = count >= 5000 && count <= 10000; break;
                case '10k-50k': matchesSubscribers = count >= 10000 && count <= 50000; break;
                case '50k-100k': matchesSubscribers = count >= 50000 && count <= 100000; break;
                case '100k-500k': matchesSubscribers = count >= 100000 && count <= 500000; break;
                case '500k-1m': matchesSubscribers = count >= 500000 && count <= 1000000; break;
                case '1m+': matchesSubscribers = count >= 1000000; break;
                default: matchesSubscribers = true;
            }
        }

        return matchesSearch && matchesCategory && matchesSubscribers;
    });

    // Функция-обработчик клика на иконку корзины
    const handleDeleteClick = (id: number | string) => {
        // Находим имя канала для отображения в модалке
        const channelName = rawChannels.find(c => c.id === id)?.name || "";

        confirm({
            title: "Вы действительно хотите удалить канал ?",
            description: `“${channelName}”`,
            confirmText: "Удалить",
            cancelText: "Отменить",
            onConfirm: async () => {
                // Здесь будет ваш запрос на удаление
                console.log(`Удаление канала ${id}...`);
                
                // Пример:
                // await deleteChannelMutation.mutateAsync(id);
            }
        });
    };

    return (
        <div>
            <AdminPageTitle title={isEditable ? 'Редактировать каталог' : 'Каталог товаров'} />

            <div className="grid grid-cols-4 gap-1.5 mb-7.5">
                {/* Поиск */}
                <div className="col-span-2">
                    <AdminInput 
                        placeholder="Поиск" 
                        icon={<Search size={16} className="text-white"/>}
                        variant="alternative"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Выбор категории */}
                <div className="col-span-1">
                    <AdminSelect 
                        variant="alternative"
                        placeholder="Выбрать категорию"
                        options={categories}
                        value={selectedCategory}
                        onChange={(val) => setSelectedCategory(val)}
                        isLoading={categoryLoading}
                    />
                </div>
                
                {/* Выбор диапазона подписчиков */}
                <div className="col-span-1">
                    <AdminSelect 
                        variant="alternative"
                        placeholder="Выбрать кол-во подписчиков"
                        options={SUBSCRIBERS}
                        value={selectedSubscribers}
                        onChange={(val) => setSelectedSubscribers(val)}
                    />
                </div>
            </div>

            {/* Таблица */}
            <AdminChannelsTable 
                items={filteredChannels} 
                isLoading={channelLoading}
                searchTerm={searchTerm}
                withActions={isEditable}
                onDelete={handleDeleteClick} // Передаем нашу функцию
                onEdit={(id) => console.log('Edit clicked', id)}
            />
        </div>
    )
} 