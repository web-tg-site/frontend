import { $apiAdmin } from '@/shared/utils';
export const deleteHero = async (id: number) => {
    return $apiAdmin.delete(`/hero/${id}`);
}