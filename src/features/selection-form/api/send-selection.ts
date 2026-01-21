import { $apiAdmin } from '@/shared/utils';
import { SelectionFormData } from "../types/selection-form-data";

export const createPersonalSelection = async (data: SelectionFormData) => {
    // Важно: передаем data вторым аргументом
    const { data: response } = await $apiAdmin.post('/personal-selection/create', data);
    return response;
}

export const updatePersonalSelection = async (id: string, data: SelectionFormData) => {
    const { data: response } = await $apiAdmin.put(`/personal-selection/${id}`, data);
    return response;
}