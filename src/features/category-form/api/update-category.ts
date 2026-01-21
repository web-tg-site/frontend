import { $apiAdmin } from '@/shared/utils';
import { CategoryFormData } from "../type/category-form-data";

export const updateCategory = async (id: number, payload: CategoryFormData) => {
    return await $apiAdmin.put(`/category/${id}`, payload);
}