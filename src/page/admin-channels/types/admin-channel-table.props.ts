import { AdminChannelItem } from "./channel-item";

export interface AdminChannelsTableProps {
    items: AdminChannelItem[];
    isLoading?: boolean;
    searchTerm?: string;
    withActions?: boolean;
    onEdit?: (id: number | string) => void;
    onDelete?: (id: number | string) => void;
}