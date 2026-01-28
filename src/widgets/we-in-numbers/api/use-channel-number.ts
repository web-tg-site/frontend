import { ChannelResponse } from '@/shared/types';
import { $api } from '@/shared/utils';
import { useQuery } from "@tanstack/react-query"
import { CHANNELS } from '../config/channels';

export const useChannelNumber = () => {
    return useQuery({
        queryKey: ['we-in-numbers-channels'],
        queryFn: async () => {
            const { data } = await $api.get<ChannelResponse[]>('/channel');

            const channels: typeof CHANNELS = data.map(channel => {
                return {
                    id: channel.id,
                    category: channel.category.name,
                    title: channel.name,
                    image: channel.image,
                    href: `/channel/${channel.slug}`
                }
            });

            return channels;
        }
    })
}