import { AdminResponse } from '@/shared/types';
import { $apiAdmin } from '@/shared/utils';
import { useQuery } from "@tanstack/react-query"
import { AdminRoleUser } from '../types/admin-roles';

export const useAdminTable = () => {
    return useQuery({
        queryKey: ['Admin Table'],
        queryFn: async () => {
            const { data } = await $apiAdmin.get<AdminResponse[]>('/all');

            const adminTable: AdminRoleUser[] = data.map((a) => {
                return {
                    id: a.id,
                    name: a.name,
                    role: a.type
                }
            })

            return adminTable;
        }
    })
}