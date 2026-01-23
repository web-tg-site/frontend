import { $apiAdmin } from '@/shared/utils';

export const reorderHero = async (ids: number[]) => {
    return await $apiAdmin.post('/hero/reorder', {
        ids
    });
}