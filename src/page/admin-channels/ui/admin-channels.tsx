"use client"

import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";

import { AdminPageTitle } from "@/shared/ui/admin/ui/admin-page-title";
import { AdminChannelsProps } from "../types/admin-channels.props";
import { AdminInput } from "@/shared/ui/admin/ui/form/admin-input";
import { AdminSelect } from "@/shared/ui/admin/ui/form/admin-select";
import { AdminPagination, ADMIN_PAGINATION_PAGE_SIZE } from "@/shared/ui/admin/ui/admin-pagination";
import { getPaginatedItems, getTotalPages } from "@/shared/lib/pagination";
import { SUBSCRIBERS } from "../config/subscribers";
import { useAdminCategories } from "../api/use-admin-category";
import { useAdminChannels } from "../api/use-admin-channels";
import { useConfirm } from "@/shared/lib/confirm-dialog";
import { AdminChannelsTable } from "./admin-channels-table";
import { deleteChannel } from "../api/delete-channel";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "axios";
import { SOCIALS_OPTIONS } from "@/shared/config/social-options";

export const AdminChannels = ({
    type
}: AdminChannelsProps) => {
    //React-query
    const queryClient = useQueryClient();

    const router = useRouter();
    // Определяем права доступа: если admin — можно редактировать/удалять
    const isEditable = type === 'admin'; 

    // Хук для вызова модалки
    const { confirm } = useConfirm();

    // Стейты фильтров и поиска
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | number | null>(null);
    const [selectedSubscribers, setSelectedSubscribers] = useState<string | number | null>(null);
    const [selectedSocial, setSelectedSocial] = useState<string | number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Загрузка данных категорий
    const { data: categoryData, isLoading: categoryLoading } = useAdminCategories();
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

        // 4. Фильтр по социальной сети (Новая логика)
        let matchesSocial = true;
        if (selectedSocial) {
            // Сравниваем значение из селекта (например "telegram") с socialType из базы
            matchesSocial = channel.socialType === selectedSocial;
        }

        return matchesSearch && matchesCategory && matchesSubscribers && matchesSocial;
    });

    // Постраничный вывод (клиент)
    const totalPages = useMemo(
        () => getTotalPages(filteredChannels.length, ADMIN_PAGINATION_PAGE_SIZE),
        [filteredChannels.length]
    );
    useEffect(() => {
        if (currentPage > totalPages && totalPages >= 1) setCurrentPage(totalPages);
    }, [totalPages, currentPage]);
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory, selectedSubscribers, selectedSocial]);
    const paginatedChannels = useMemo(
        () => getPaginatedItems(filteredChannels, Math.min(currentPage, totalPages || 1), ADMIN_PAGINATION_PAGE_SIZE),
        [filteredChannels, currentPage, totalPages]
    );

    // Функция-обработчик клика на иконку корзины
    const handleDeleteClick = (id: number | string) => {
        const channel = rawChannels.find(c => c.id === id);
        const channelName = channel?.name || "";
        const imageUrl = channel?.image || null;

        confirm({
            title: "Вы действительно хотите удалить канал ?",
            description: `“${channelName}”`,
            confirmText: "Удалить",
            cancelText: "Отменить",
            onConfirm: async () => {
                try {
                    await deleteChannel(id);

                    if (imageUrl) {
                        await axios.post("/api/delete-image", { url: imageUrl });
                    }

                    queryClient.invalidateQueries({ queryKey: ['Admin Channel'] })
                } catch(e: unknown) {
                    console.error(e);
                }
            }
        });
    };

    return (
        <div>
            <AdminPageTitle title={isEditable ? 'Редактировать каталог' : 'Каталог товаров'} />

            <div className="grid grid-cols-4 gap-1.5 mb-7.5">
                {/* Поиск */}
                <div className="col-span-1">
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

                {/* Выбор соц. сети */}
                <div className="col-span-1">
                    <AdminSelect 
                        variant="alternative"
                        placeholder="Социальная сеть"
                        options={SOCIALS_OPTIONS}
                        value={selectedSocial}
                        onChange={(val) => setSelectedSocial(val)}
                    />
                </div>
            </div>

            {/* Таблица */}
            <AdminChannelsTable 
                items={paginatedChannels} 
                isLoading={channelLoading}
                searchTerm={searchTerm}
                withActions={isEditable}
                onDelete={handleDeleteClick}
                onEdit={(id) => router.push(`/admin/channels/edit/${id}`)}
            />
            <AdminPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    )
} 