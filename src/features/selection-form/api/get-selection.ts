import { PersonalSelectionResponse } from '@/shared/types/perosnal-selection-response';
import { $apiAdmin } from '@/shared/utils';

export const getSelection = async (id: string) => {
    const {data} = await $apiAdmin.get<PersonalSelectionResponse>(`/personal-selection/${id}`);

    return data;
}