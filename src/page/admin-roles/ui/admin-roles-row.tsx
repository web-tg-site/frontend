"use client";

import { Trash } from "lucide-react";
import { AdminRolesRowProps } from "../types/admin-roles";
import { ROLES_OPTION } from "../config/roles-option";
import { AdminRowSelect } from "@/shared/ui/admin/ui/form/admin-row-select";

export const AdminRolesRow = ({
    id,
    name,
    role,
    onDelete,
    searchTerm = "",
    onRoleChange,
}: AdminRolesRowProps) => {
    
    const gridClassName = "grid grid-cols-[0.5fr_3fr_1.5fr_0.5fr] gap-4 items-center";

    // Подсветка поиска
    const renderHighlightedName = (text: string, highlight: string) => {
        if (!highlight.trim()) return <span className="text-white">{text}</span>;
        const parts = text.split(new RegExp(`(${highlight})`, "gi"));
        return (
            <span>
                {parts.map((part, i) => {
                    const isMatch = part.toLowerCase() === highlight.toLowerCase();
                    return (
                        <span key={i} className={isMatch ? "text-white" : "text-gray-500"}>
                            {part}
                        </span>
                    );
                })}
            </span>
        );
    };

    return (
        // ВАЖНО: relative здесь нужен, но НЕ overflow-hidden, иначе селект обрежется
        <div className={`${gridClassName} bg-card hover:bg-[#2b2b2b] transition-colors rounded-xl px-5 py-4 text-white relative`}>
            {/* ID */}
            <div className="text-gray-400 text-[14px]">
                №{id}
            </div>
            
            {/* Имя */}
            <div className="truncate pr-4 text-[14px]" title={name}>
                {renderHighlightedName(name, searchTerm)}
            </div>
            
            {/* Селект */}
            <div className="w-full max-w-[200px] relative">
                <AdminRowSelect
                    options={ROLES_OPTION}
                    value={role}
                    onChange={(val) => onRoleChange(id, String(val))}
                />
            </div>
            
            {/* Удаление */}
            <div className="flex items-center justify-end">
                <button
                    onClick={() => onDelete(id)}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-red-500/20 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all cursor-pointer"
                >
                    <Trash size={16} />
                </button>
            </div>
        </div>
    );
};