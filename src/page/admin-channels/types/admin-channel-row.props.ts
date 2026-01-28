export interface AdminChannelsRowProps {
    id: number | string;
    name: string;
    category: string;
    subscribers: number;
    price: number;
    socialType: string;
    onEdit?: (id: number | string) => void;
    onDelete?: (id: number | string) => void;
    
    searchTerm?: string;
    withActions?: boolean;
}