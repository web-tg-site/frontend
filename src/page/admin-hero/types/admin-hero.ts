export interface HeroChannelViewDto {
    id: number;
    channelId: number;
    message: string;
    time: string;
    isPinned: boolean;
    isVerified: boolean;
}

export interface AdminHeroTableProps {
    items: HeroChannelViewDto[]; // Используем правильный DTO
    isLoading: boolean;
    searchTerm: string;
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
}

export interface AdminHeroRowProps extends HeroChannelViewDto {
    searchTerm: string;
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
}