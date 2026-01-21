import { $apiAdmin } from '@/shared/utils';
import { fromChannelResponseArrayToIChannelArray } from '@/shared/mappers';
import { ChannelResponse } from '@/shared/types';
import { useQuery } from '@tanstack/react-query';

export const useGetChannelForSelection = () => {
    return useQuery({
        queryKey: ['Channels For Selection'],
        queryFn: async () => {
            const { data } = await $apiAdmin.get<ChannelResponse[]>('/channel');

            return fromChannelResponseArrayToIChannelArray(data);
        }
    })
}