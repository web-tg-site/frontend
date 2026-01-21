import { FilePenLine, Plus, Drama, UsersRound, FileText, FolderPen, FolderPlus, Folder, LayoutTemplate } from "lucide-react";
import { Navigation } from "../types/navigation";

export const NAV_DATA: Navigation[] = [
    // --- ДЛЯ АДМИНА ---
    {
        icon: FilePenLine,
        name: "Редактировать каталог",
        href: "/admin/channels", // Ссылка на редактирование
        roles: ['admin'], 
        additionalHrefs: ['/admin/channels/edit']
    },
    {
        icon: Plus,
        name: "Добавить канал",
        href: "/admin/channels/create",
        roles: ['admin'],
    },
    {
        icon: FolderPen,
        name: "Редактировать категории",
        href: "/admin/category",
        roles: ['admin'],
        additionalHrefs: ['/admin/category/edit']
    },
    {
        icon: FolderPlus,
        name: "Добавить категорию",
        href: "/admin/category/create",
        roles: ['admin']
    },
    {
        icon: LayoutTemplate,
        name: "Редактирование hero",
        href: "/admin/hero",
        roles: ['admin']
    },
    
    // --- ДЛЯ МЕНЕДЖЕРА (МОДЕРАТОРА) ---
    {
        icon: FileText, // Чуть другая иконка для просмотра
        name: "Каталог каналов",
        href: "/admin/catalog", // Ссылка на просмотр
        roles: ['moderator'],
    },
    {
        icon: Folder,
        name: "Категории",
        href: "/admin/category-check",
        roles: ['moderator']
    },

    // --- ОБЩИЕ (Или специфичные права) ---
    {
        icon: Drama,
        name: "Персональная подборка",
        href: "/admin/personal-selection",
        roles: ['admin', 'moderator'], 
        additionalHrefs: ['/admin/personal-selection/edit', '/admin/personal-selection/create']
    },
    {
        icon: UsersRound,
        name: "Роли и права",
        href: "/admin/roles",
        roles: ['admin'],
        additionalHrefs: ['/admin/roles/create', '/admin/roles/edit']
    }
];