import { $apiAdmin } from '@/shared/utils';
export const updateAdminRole = (id: number | string, newRole: string) => {
    return $apiAdmin.put(`/update-type/${id}`, {
        type: newRole
    })
}