import { $apiAdmin } from '@/shared/utils';
export const deleteChannel = async (id: number | string) => {
    return await $apiAdmin.delete(`/channel/${id}`);
}