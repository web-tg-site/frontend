'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { useQueryClient } from "@tanstack/react-query"

import { AdminButton } from "@/shared/ui/admin/ui/admin-button"
import { AdminPageTitle } from "@/shared/ui/admin/ui/admin-page-title"
import { AdminInput } from "@/shared/ui/admin/ui/form/admin-input"
import { useConfirm } from "@/shared/lib/confirm-dialog"

import { useAdminHero } from "../api/use-admin-hero"
import { deleteHero } from "../api/delete-hero"
import { AdminHeroTable } from "./admin-hero-table"
import { HeroChannelViewDto } from "../types/admin-hero" // Импортируем DTO
import { reorderHero } from "../api/reorder-hero"

export const AdminHero = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { confirm } = useConfirm();

    // Data Fetching
    const { data: heroChannels, isLoading } = useAdminHero();
    
    // --- LOCAL STATE ---
    // Строгая типизация через DTO
    const [localItems, setLocalItems] = useState<HeroChannelViewDto[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Синхронизация с сервером
    useEffect(() => {
        if (heroChannels) {
            setLocalItems(heroChannels);
        }
    }, [heroChannels]);

    // Фильтрация
    const filteredItems = localItems.filter(item => {
        const lowerTerm = searchTerm.toLowerCase();
        return (
            item.message.toLowerCase().includes(lowerTerm) || 
            String(item.channelId).includes(lowerTerm)
        );
    });

    // --- ЛОГИКА REORDER ---
    const handleReorder = async (newItems: HeroChannelViewDto[]) => {
        const previousItems = [...localItems];
        setLocalItems(newItems);
        try {
            await reorderHero(newItems.map((item) => item.id));
        } catch (error) {
            console.error("Ошибка сохранения порядка, откат изменений", error);
            setLocalItems(previousItems);
        }
    };

    const handleDelete = (id: number) => {
        confirm({
            title: "Удалить запись из Hero?",
            description: "Канал перестанет отображаться в рекомендациях.",
            confirmText: "Удалить",
            cancelText: "Отмена",
            onConfirm: async () => {
                try {
                    await deleteHero(id);
                    queryClient.invalidateQueries({ queryKey: ['Admin Hero Table'] });
                } catch (e) {
                    console.error("Ошибка при удалении", e);
                }
            }
        });
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <AdminPageTitle title="Редактирование hero" className="mb-0!" />

                <AdminButton
                    onClick={() => router.push('/admin/hero/create')}
                >
                    Добавить канал
                </AdminButton>
            </div>

            <div className="mb-7.5 w-full max-w-[400px]">
                <AdminInput 
                    placeholder="Поиск по сообщению или ID"
                    icon={<Search size={16} className="text-white" />}
                    variant="alternative"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <AdminHeroTable 
                items={filteredItems}
                isLoading={isLoading}
                searchTerm={searchTerm}
                onDelete={handleDelete}
                onEdit={(id) => router.push(`/admin/hero/edit/${id}`)}
                onReorder={handleReorder}
            />
        </div>
    )
}