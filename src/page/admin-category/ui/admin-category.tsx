'use client'

import { useState, useMemo, useEffect } from "react"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query" // 👈 Для обновления данных

import { AdminPageTitle } from "@/shared/ui/admin/ui/admin-page-title"
import { AdminInput } from "@/shared/ui/admin/ui/form/admin-input"
import { AdminPagination, ADMIN_PAGINATION_PAGE_SIZE } from "@/shared/ui/admin/ui/admin-pagination"
import { getPaginatedItems, getTotalPages } from "@/shared/lib/pagination"

import { useAdminCategoriesTable } from "../api/use-admin-categories-table"
import { AdminCategoriesTable } from "./admin-categories-table"
import { deleteCategory } from "../api/delete-category"
import { useConfirm } from "@/shared/lib/confirm-dialog"

export const AdminCategory = ({
    type="admin"
}: {
    type?: 'admin' | 'moderation'
}) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { confirm } = useConfirm(); // 👈 Достаем функцию подтверждения

    // 1. Получаем данные
    const { data: categoryData, isLoading: categoryLoading } = useAdminCategoriesTable()
    
    // 2. Состояние поиска и страницы
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    // 3. Фильтрация данных
    const filteredItems = categoryData?.filter(category => 
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []

    // 4. Постраничный вывод (клиент)
    const totalPages = useMemo(
        () => getTotalPages(filteredItems.length, ADMIN_PAGINATION_PAGE_SIZE),
        [filteredItems.length]
    )
    useEffect(() => {
        if (currentPage > totalPages && totalPages >= 1) setCurrentPage(totalPages)
    }, [totalPages, currentPage])
    useEffect(() => setCurrentPage(1), [searchTerm])
    const paginatedItems = useMemo(
        () => getPaginatedItems(filteredItems, Math.min(currentPage, totalPages || 1), ADMIN_PAGINATION_PAGE_SIZE),
        [filteredItems, currentPage, totalPages]
    )

    // 5. Обработчики действий
    const handleEdit = (id: number | string) => {
        router.push(`/admin/category/edit/${id}`);
    }

    const handleDelete = (id: number | string) => {
        confirm({
            title: "Удаление категории",
            description: "Вы уверены, что хотите удалить эту категорию? Это действие необратимо.",
            confirmText: "Удалить",
            cancelText: "Отмена",
            onConfirm: async () => {
                await deleteCategory(Number(id));
                
                queryClient.invalidateQueries({ queryKey: ["Admin Categories Table"] });
            }
        });
    }

    return (
        <div>
            <AdminPageTitle title="Редактирование категорий" />

            <div className="mb-7.5">
                <AdminInput 
                    variant="alternative"
                    icon={<Search size={16} className="text-white"/>}
                    placeholder="Поиск по названию..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <AdminCategoriesTable 
                items={paginatedItems}
                isLoading={categoryLoading}
                searchTerm={searchTerm}
                onEdit={handleEdit}
                onDelete={handleDelete}
                withActions={type === 'admin'}
            />
            <AdminPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    )
}