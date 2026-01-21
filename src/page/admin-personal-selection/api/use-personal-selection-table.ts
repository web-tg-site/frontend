import { PersonalSelectionResponse } from '@/shared/types/perosnal-selection-response';
import { $apiAdmin } from '@/shared/utils';
import { useQuery } from "@tanstack/react-query"
import { IPersonalSelection } from '../types/perosnal-selection.types';

export const usePersonalSelectionTable = () => {
    return useQuery({
        queryKey: ['Admin Personal Selection Table'],
        queryFn: async () => {
            const { data } = await $apiAdmin.get<PersonalSelectionResponse[]>('/personal-selection');

            const personalSelectionTable: IPersonalSelection[] = data.map((ps) => {
                return {
                    id: ps.id,
                    title: ps.for.name,
                    total: ps.total,
                    status: ps.status,
                    slug: ps.slug
                }
            });

            return personalSelectionTable;
        }
    })
}