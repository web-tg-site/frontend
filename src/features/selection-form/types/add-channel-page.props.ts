import { IChannel } from "@/entities/channel";

export interface AddChannelPageProps {
    onBack: () => void;
    channels: IChannel[];
    channelLoading: boolean;
    onAdd: (id: number) => void;
    onRemove: (id: number) => void;
    selectedChannels: number[]; 
}