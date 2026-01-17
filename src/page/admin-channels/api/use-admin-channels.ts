import { ChannelResponse } from '@/shared/types';
import { $apiAdmin } from '@/shared/utils';
import { useQuery } from "@tanstack/react-query"
import { AdminChannelItem } from '../types/channel-item';

export const useAdminChannels = () => {
    return useQuery({
        queryKey: ["Admin Channel"],
        queryFn: async () => {
            const { data } = await $apiAdmin.get<ChannelResponse[]>('/channel');

            const channels: AdminChannelItem[] = data.map((channel) => {
                return {
                    id: channel.id,
                    name: channel.name,
                    category: channel.category.name,
                    subscribers: Number(channel.subscribers),
                    price: Number(channel.coast),
                    image: channel.image
                }
            });

            return channels;
        }
    })
}