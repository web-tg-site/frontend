import { IChannel } from "./ichannel";

export interface ChannelCardProps extends IChannel {
    loading?: boolean;
    haveAddButton?: boolean;
    type?: "site" | "admin";
    onAdminClick?: (id: number) => void;
    isSelected?: boolean;
    buttonAction?: 'add' | 'delete'; 
}