import { FilePenLine, Plus, Drama, UsersRound, FileText } from "lucide-react";
import { Navigation } from "../types/navigation";

export const NAV_DATA: Navigation[] = [
    // --- ДЛЯ АДМИНА ---
    {
        icon: FilePenLine,
        name: "Редактировать каталог",
        href: "/admin/channels", // Ссылка на редактирование
        roles: ['admin'], 
    },
    {
        icon: Plus,
        name: "Добавить канал",
        href: "/admin/channels/create",
        roles: ['admin'],
    },
    
    // --- ДЛЯ МЕНЕДЖЕРА (МОДЕРАТОРА) ---
    {
        icon: FileText, // Чуть другая иконка для просмотра
        name: "Каталог каналов",
        href: "/admin/catalog", // Ссылка на просмотр
        roles: ['moderator'],
    },

    // --- ОБЩИЕ (Или специфичные права) ---
    {
        icon: Drama,
        name: "Персональная подборка",
        href: "/admin/personal-selection",
        roles: ['admin', 'moderator'], 
    },
    {
        icon: UsersRound,
        name: "Роли и права",
        href: "/admin/roles",
        roles: ['admin']
    }
];