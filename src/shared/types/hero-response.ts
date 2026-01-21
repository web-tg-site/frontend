import { CategoryResponse } from "./category-response";
import { ChannelResponse } from "./channel-response";

export interface HeroChannelResponse {
    id: number;
    channelId: number;
    message: string;
    time: string;
    isPinned: boolean;
    isVerified: boolean;
    channel: ChannelResponse
}

export interface HeroResponse {
    categories: CategoryResponse[];
    heroChannels: HeroChannelResponse[];
}