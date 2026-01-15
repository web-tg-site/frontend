import { useQuery } from '@tanstack/react-query';
import { $apiAdmin } from '@/shared/utils';

interface AdminProfileResponse {
    id: number;
    email: string;
    name: string;
    type: 'admin' | 'moderator';
}

export const useAdminProfile = () => {
    return useQuery({
        queryKey: ['admin-profile'],
        queryFn: async () => {
            const { data } = await $apiAdmin.get<AdminProfileResponse>('profile');
            return data;
        },
    });
};