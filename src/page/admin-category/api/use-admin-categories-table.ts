import { CategoryResponse } from '@/shared/types';
import { $apiAdmin } from '@/shared/utils';
import { useQuery } from "@tanstack/react-query"
import { ICategory } from '../types/props';

export const useAdminCategoriesTable = () => {
    return useQuery({
        queryKey: ['Admin Categories Table'],
        queryFn: async () => {
            const { data } = await $apiAdmin.get<CategoryResponse[]>('/category');

            const categories: ICategory[] = data.map((cat) => {
                return {
                    id: cat.id,
                    name: cat.name,
                    icon: cat.icon,
                    color: cat.color
                }
            })

            return categories;
        }
    })
}