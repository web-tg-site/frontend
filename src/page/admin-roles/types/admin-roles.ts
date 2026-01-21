export interface AdminRoleUser {
    id: number;
    name: string;
    role: string;
}

export interface AdminRolesTableProps {
    items: AdminRoleUser[];
    isLoading: boolean;
    searchTerm?: string;
    onDelete: (id: number) => void;
    onRoleChange: (id: number, newRole: string) => void; // <-- Обязательный колбэк
}

export interface AdminRolesRowProps extends AdminRoleUser {
    searchTerm?: string;
    onDelete: (id: number) => void;
    onRoleChange: (id: number, newRole: string) => void; // <-- Обязательный колбэк
}