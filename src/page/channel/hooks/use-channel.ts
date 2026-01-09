import { $api } from '@/shared/utils';
import { useQuery } from "@tanstack/react-query"
import { ChannelResponse } from '../types/channel-response';

export const useChannel = (id: string) => {
    return useQuery({
        queryKey: ['channel', id],
        queryFn: async () => {
            const data = await $api.get<ChannelResponse>(`/channel/${id}`);
            return data;
        },
        enabled: !!id
    })
}