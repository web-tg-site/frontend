import { fromChannelResponseArrayToIChannelArray } from '@/shared/mappers';
import { CategoryResponse, ChannelResponse } from '@/shared/types';
import { $api } from '@/shared/utils';
import { useQuery } from "@tanstack/react-query"

export const useCatalog = () => {
    return useQuery({
        queryKey: ['catalog'],
        queryFn: async () => {
            const { data: channels } = await $api.get<ChannelResponse[]>('/channel');
            const { data: categories } = await $api.get<CategoryResponse[]>('/categories');

            const ichannels = fromChannelResponseArrayToIChannelArray(channels);
            const category = categories.map((c) => {
                return c.name
            })

            return {
                ichannels,
                category
            }
        }
    })
}