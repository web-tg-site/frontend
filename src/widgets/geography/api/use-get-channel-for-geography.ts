import { ChannelResponse, MapResponse } from '@/shared/types';
import { $api } from '@/shared/utils';
import { useQuery } from "@tanstack/react-query"
import { fromChannelResponseArrayToChannelDataArray } from '../mappers/from-channel-response-to-channel-data';

export const useGetChannelForGeography = () => {
    return useQuery({
        queryKey: ['channe-for-geography'],
        queryFn: async () => {
            const { data } = await $api.get<MapResponse[]>('/map');

            return fromChannelResponseArrayToChannelDataArray(data);
        }
    })
}