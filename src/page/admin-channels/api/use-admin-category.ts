import { CategoryResponse } from '@/shared/types';
import { $apiAdmin } from '@/shared/utils';
import { useQuery } from "@tanstack/react-query"

export const useAdminCategories = () => {
    return useQuery({
        queryKey: ["Admin category"],
        queryFn: async () => {
            const { data } = await $apiAdmin.get<CategoryResponse[]>('/category');
            
            const categories = data.map((cat) => {
                return {
                    value: cat.id,
                    label: cat.name
                }
            });

            return categories
        }
    })
}