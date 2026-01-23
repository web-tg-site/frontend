import { MapResponse } from "@/shared/types";
import { ChannelData } from "../ui/map";

export const fromChannelResponseToChannelData = (map: MapResponse): ChannelData => {
    return {
        id: map.channel.id,
        name: map.channel.name,
        subscribers: map.channel.subscribers,
        label: 'Подписчиков',
        price: map.channel.coast,
        iconUrl: map.channel.image,
        slug: map.channel.slug,
        coords: {
            top: map.top,
            left: map.left,
        }
    }
}

export const fromChannelResponseArrayToChannelDataArray = (channel: MapResponse[]): ChannelData[] => {
    return channel.map((c) => fromChannelResponseToChannelData(c));
}