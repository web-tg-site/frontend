// Определяем статусы (должны совпадать со строками, которые присылает бэкенд)
export enum PersonalSelectionStatus {
    send = 'send',
    draft = 'draft',
    agreed = 'agreed',
    archive = 'archive'
}

export interface IPersonalSelection {
    id: string;
    title: string;      // Название компании
    total: string; // Итоговая цена
    status: PersonalSelectionStatus;
    slug: string;
}

export interface AdminSelectionTableProps {
    items: IPersonalSelection[];
    isLoading?: boolean;
    searchTerm?: string;
    onEdit?: (id: string) => void;
    onCopyLink?: (slug: string) => void;
}