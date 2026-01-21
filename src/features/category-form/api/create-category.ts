import { $apiAdmin } from '@/shared/utils';
import { CategoryFormData } from "../type/category-form-data";

export const createCategory = async (payload: CategoryFormData) => {
    return await $apiAdmin.post('/category/create', payload);
}