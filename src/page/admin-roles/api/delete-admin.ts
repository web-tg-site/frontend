import { $apiAdmin } from '@/shared/utils';
export const deleteAdmin = async (id: number | string) => {
    return $apiAdmin.delete(`/delete/${id}`);
}