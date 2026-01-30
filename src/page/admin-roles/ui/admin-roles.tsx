'use client'

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { useQueryClient } from "@tanstack/react-query"

import { AdminButton } from "@/shared/ui/admin/ui/admin-button"
import { AdminPageTitle } from "@/shared/ui/admin/ui/admin-page-title"
import { AdminInput } from "@/shared/ui/admin/ui/form/admin-input"
import { AdminSelect } from "@/shared/ui/admin/ui/form/admin-select"
import { AdminPagination, ADMIN_PAGINATION_PAGE_SIZE } from "@/shared/ui/admin/ui/admin-pagination"
import { getPaginatedItems, getTotalPages } from "@/shared/lib/pagination"
import { useConfirm } from "@/shared/lib/confirm-dialog"

import { ROLES_OPTION } from "../config/roles-option"
import { useAdminTable } from "../api/use-admin-table"
import { deleteAdmin } from "../api/delete-admin"
import { updateAdminRole } from "../api/update-admin-role"
import { AdminRolesTable } from "./admin-roles-table"

export const AdminRoles = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { confirm } = useConfirm();

    // Загрузка данных
    const { data: admins, isLoading: adminLoading } = useAdminTable();
    const rawAdmins = admins || [];

    // Стейты
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRole, setSelectedRole] = useState<string | number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Фильтрация
    const filteredAdmins = rawAdmins.filter((user) => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = selectedRole ? user.role === selectedRole : true;
        return matchesSearch && matchesRole;
    });

    // Постраничный вывод (клиент)
    const totalPages = useMemo(
        () => getTotalPages(filteredAdmins.length, ADMIN_PAGINATION_PAGE_SIZE),
        [filteredAdmins.length]
    );
    useEffect(() => {
        if (currentPage > totalPages && totalPages >= 1) setCurrentPage(totalPages);
    }, [totalPages, currentPage]);
    useEffect(() => setCurrentPage(1), [searchTerm, selectedRole]);
    const paginatedAdmins = useMemo(
        () => getPaginatedItems(filteredAdmins, Math.min(currentPage, totalPages || 1), ADMIN_PAGINATION_PAGE_SIZE),
        [filteredAdmins, currentPage, totalPages]
    );

    // Обработчик удаления
    const handleDelete = (id: number) => {
        const user = rawAdmins.find(u => u.id === id);
        confirm({
            title: "Удалить участника?",
            description: `Вы действительно хотите удалить ${user?.name || 'пользователя'}?`,
            confirmText: "Удалить",
            onConfirm: async () => {
                try {
                    await deleteAdmin(id);
                    queryClient.invalidateQueries({ queryKey: ['Admin Table'] });
                } catch(e) {
                    console.error(e);
                }
            }
        });
    }

    // Обработчик смены роли
    const handleRoleChange = async (id: number, newRole: string) => {
        try {
            await updateAdminRole(id, newRole);
            queryClient.invalidateQueries({ queryKey: ['Admin Table'] });
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <AdminPageTitle title="Роли и права" className="mb-0!" />
                <AdminButton onClick={() => router.push('/admin/roles/create')}>
                    Добавить участника
                </AdminButton>
            </div>

            <div className="grid grid-cols-4 gap-1.5 mb-7.5">
                <div className="col-span-3">
                    <AdminInput 
                        placeholder="Поиск"
                        variant="alternative"
                        icon={<Search className="text-white" size={16} />}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {/* Фильтр сверху (обычный, с очисткой) */}
                <AdminSelect 
                    placeholder="Выбрать роль"
                    options={ROLES_OPTION}
                    value={selectedRole}
                    onChange={setSelectedRole}
                    variant="alternative"
                />
            </div>

            <AdminRolesTable 
                items={paginatedAdmins}
                isLoading={adminLoading}
                searchTerm={searchTerm}
                onDelete={handleDelete}
                onRoleChange={handleRoleChange}
            />
            <AdminPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    )
}