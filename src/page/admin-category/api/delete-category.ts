import { $apiAdmin } from '@/shared/utils';

export const deleteCategory = async (id: number) => {
    return await $apiAdmin.delete(`/category/${id}`);
}