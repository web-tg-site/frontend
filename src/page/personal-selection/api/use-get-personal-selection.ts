import { fromChannelResponseArrayToIChannelArray } from '@/shared/mappers';
import { PersonalSelectionResponse } from '@/shared/types';
import { $api } from '@/shared/utils';
import { useQuery } from "@tanstack/react-query"

export const useGetPersonalSelection = (slug: string) => {
    return useQuery({
        queryKey: ['Personal Selection', slug],
        queryFn: async () => {
            const { data } = await $api.get<PersonalSelectionResponse>(`/personal-selection/${slug}`);
            
            const { selection, ...rest } = data;
            const channels = fromChannelResponseArrayToIChannelArray(selection);

            const response = {
                ...rest,
                channels
            }

            return response;
        },
        retry: false 
    })
}