import { $apiAdmin } from '@/shared/utils';

export const getChannel = async (id: number) => {
    const reponse = await $apiAdmin.get(`/channel/${id}`);
    return reponse.data;
}