import { $apiAdmin } from '@/shared/utils';
export const getCategory = async (id: number | string) => {
    const { data } = await $apiAdmin.get(`/category/${id}`);

    return data;
}