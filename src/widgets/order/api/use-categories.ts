import { CategoryResponse } from '@/shared/types';
import { $api } from '@/shared/utils';
import { useQuery } from "@tanstack/react-query"

export const useCategories = () => {
    return useQuery({
        queryKey: ['Category Order'],
        queryFn: async () => {
            const { data } = await $api.get<CategoryResponse[]>('/categories');

            const categories = data.map((c) => {
                return {
                    id: c.id,
                    title: c.name,
                    icon: c.icon
                }
            }) 

            return categories;
        }
    })
}