import { useQuery } from '@tanstack/react-query';
import { $apiAdmin } from '@/shared/utils';

export interface AdminProfileResponse {
    id: number;
    email: string;
    name: string;
    type: 'admin' | 'moderator';
}

export const useAdminProfile = () => {
    return useQuery({
        queryKey: ['admin-profile'],
        queryFn: async () => {
            const { data } = await $apiAdmin.get<AdminProfileResponse>('/profile');
            return data;
        },
        retry: (failureCount, error: any) => {
            if (error.response?.status === 401) return false;
            return failureCount < 3;
        }
    });
};