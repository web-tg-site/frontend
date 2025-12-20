export interface TelegramChannel {
    id: string | number;
    title: string;
    message: string;
    avatarUrl?: string;
    time: string;
    href: string;
    isPinned?: boolean;
    isVerified?: boolean;
}