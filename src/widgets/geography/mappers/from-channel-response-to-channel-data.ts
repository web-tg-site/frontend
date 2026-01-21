import { ChannelResponse } from "@/shared/types";
import { ChannelData } from "../ui/map";

const getRandom = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const fromChannelResponseToChannelData = (channel: ChannelResponse): ChannelData => {
    return {
        id: channel.id,
        name: channel.name,
        region: 'РФ',
        subscribers: channel.subscribers,
        label: 'Подписчиков',
        price: channel.coast,
        iconUrl: channel.image,
        slug: channel.slug,
        coords: {
            top: getRandom(10, 80),
            left: getRandom(10, 90),
        }
    }
}

export const fromChannelResponseArrayToChannelDataArray = (channel: ChannelResponse[]): ChannelData[] => {
    return channel.map((c) => fromChannelResponseToChannelData(c));
}