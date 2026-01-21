import { IChannel } from "@/entities/channel";
import { ChannelResponse } from "../types";

export const fromChannelResponseToIChannel = (data: ChannelResponse): IChannel => {
    return {
        id: data.id,
        image: data.image,
        name: data.name,
        category: {
            id: data.category.id,
            name: data.category.name,
            color: data.category.color
        },
        subscribers: data.subscribers,
        price: Number(data.coast),
        slug: data.slug
    }
}

export const fromChannelResponseArrayToIChannelArray = (data: ChannelResponse[]): IChannel[] => {
    return data.map((channel) => fromChannelResponseToIChannel(channel));
}