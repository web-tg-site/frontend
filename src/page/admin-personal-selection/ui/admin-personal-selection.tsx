"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

// UI Components
import { AdminPageTitle } from "@/shared/ui/admin/ui/admin-page-title"
import { AdminInput } from "@/shared/ui/admin/ui/form/admin-input"
import { AdminSelect } from "@/shared/ui/admin/ui/form/admin-select"
import { AdminButton } from "@/shared/ui/admin/ui/admin-button"

// Features
import { STATUS_OPTIONS } from "../config/status-options"
import { usePersonalSelectionTable } from "../api/use-personal-selection-table"
import { AdminSelectionTable } from "./admin-selection-table" // 👈 Импорт таблицы

export const AdminPersonalSelection = () => {
    const router = useRouter();

    // Состояния
    const [searchTerm, setSearchTerm] = useState("");
    const [status, setStatus] = useState<string | number | null>(null);

    // Загрузка данных
    const { data: personalSelect, isLoading: personalSelectLoading } = usePersonalSelectionTable();

    // Логика фильтрации
    const filteredItems = personalSelect?.filter((item) => {
        // 1. Фильтр по поиску (название)
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        
        // 2. Фильтр по статусу (если выбран)
        const matchesStatus = status ? item.status === status : true;

        return matchesSearch && matchesStatus;
    }) || [];

    // Обработчики
    const handleCreate = () => {
        router.push('/admin/personal-selection/create');
    };

    const handleEdit = (id: string) => {
        router.push(`/admin/personal-selection/edit/${id}`);
    };

    const handleCopyLink = (slug: string) => {
        const link = `${window.location.origin}/personal-selection/${slug}`;
        navigator.clipboard.writeText(link);
    };

    return (
        <div>
            <AdminPageTitle title="Персональная подборка" />

            {/* Фильтры и действия */}
            <div className="grid grid-cols-4 gap-2.5 mb-7.5">
                <div className="col-span-2">
                    <AdminInput 
                        variant="alternative"
                        placeholder="Поиск по названию"
                        icon={<Search size={16} className="text-white" />}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <AdminSelect 
                    variant="alternative"
                    placeholder="Выбрать статус"
                    options={STATUS_OPTIONS}
                    value={status}
                    onChange={setStatus}
                    isSearchable={false} 
                />

                <AdminButton onClick={handleCreate}>
                    Создать подборку
                </AdminButton>
            </div>

            {/* Таблица */}
            <AdminSelectionTable 
                items={filteredItems}
                isLoading={personalSelectLoading}
                searchTerm={searchTerm}
                onEdit={handleEdit}
                onCopyLink={handleCopyLink}
            />
        </div>
    )
}