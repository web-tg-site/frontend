import { ChannelResponse } from "./channel-response";

export interface MapResponse {
    id: number;
    left: number;
    top: number;
    channelId: number;
    channel: ChannelResponse;
}