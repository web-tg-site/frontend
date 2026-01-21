'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { useQueryClient } from "@tanstack/react-query"

import { AdminButton } from "@/shared/ui/admin/ui/admin-button"
import { AdminPageTitle } from "@/shared/ui/admin/ui/admin-page-title"
import { AdminInput } from "@/shared/ui/admin/ui/form/admin-input"
import { useConfirm } from "@/shared/lib/confirm-dialog" // Ваш хук подтверждения

import { useAdminHero } from "../api/use-admin-hero"
import { deleteHero } from "../api/delete-hero"
import { AdminHeroTable } from "./admin-hero-table"

export const AdminHero = () => {
    // Hooks
    const router = useRouter();
    const queryClient = useQueryClient();
    const { confirm } = useConfirm();

    // Data Fetching
    const { data: heroChannels, isLoading } = useAdminHero();
    const items = heroChannels || [];

    // State
    const [searchTerm, setSearchTerm] = useState("");

    // --- ЛОГИКА ФИЛЬТРАЦИИ ---
    const filteredItems = items.filter(item => {
        const lowerTerm = searchTerm.toLowerCase();
        return (
            // Ищем по сообщению
            item.message.toLowerCase().includes(lowerTerm) || 
            // Ищем по ID канала
            String(item.channelId).includes(lowerTerm)
        );
    });

    // --- ЛОГИКА УДАЛЕНИЯ ---
    const handleDelete = (id: number) => {
        confirm({
            title: "Удалить запись из Hero?",
            description: "Канал перестанет отображаться в рекомендациях.",
            confirmText: "Удалить",
            cancelText: "Отмена",
            onConfirm: async () => {
                try {
                    await deleteHero(id);
                    // Обновляем данные в таблице
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

            {/* Таблица */}
            <AdminHeroTable 
                items={filteredItems}
                isLoading={isLoading}
                searchTerm={searchTerm}
                onDelete={handleDelete}
                onEdit={(id) => router.push(`/admin/hero/edit/${id}`)}
            />
        </div>
    )
}