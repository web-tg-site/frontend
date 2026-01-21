export interface ICategory {
    id: number | string;
    name: string;
    color: string; // Например "#FF0000" или "red"
    icon: string;  // Например "Home", "User", "Settings"
}

export interface AdminCategoriesTableProps {
    items: ICategory[];
    isLoading?: boolean;
    searchTerm?: string;
    withActions?: boolean;
    onEdit?: (id: number | string) => void;
    onDelete?: (id: number | string) => void;
}

export interface AdminCategoriesRowProps extends ICategory {
    searchTerm?: string;
    withActions?: boolean;
    onEdit?: (id: number | string) => void;
    onDelete?: (id: number | string) => void;
}