import { IChannel } from "./ichannel";

export interface ChannelCardProps extends IChannel {
    loading?: boolean;
    haveAddButton?: boolean;
}