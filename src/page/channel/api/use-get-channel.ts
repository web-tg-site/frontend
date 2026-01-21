import { ChannelResponse } from '@/shared/types';
import { $api } from '@/shared/utils';
import { useQuery } from "@tanstack/react-query"

export const useGetChannel = (slug: string) => {
    return useQuery({
        queryKey: ['Channel', slug],
        queryFn: async () => {
            const { data } = await $api.get<ChannelResponse>(`/channel/${slug}`);

            return data;
        }
    })
}