import { HeroChannelResponse } from '@/shared/types/hero-response';
import { $apiAdmin } from '@/shared/utils';
import { useQuery } from "@tanstack/react-query"
import { HeroChannelViewDto } from '../types/admin-hero';

export const useAdminHero = () => {
    return useQuery({
        queryKey: ['Admin Hero Table'],
        queryFn: async () => {
            const { data } = await $apiAdmin.get<HeroChannelResponse[]>('/hero');

            const heroes: HeroChannelViewDto[] = data.map((h) => {
                return {
                    id: h.id,
                    channelId: h.channelId,
                    message: h.message,
                    time: h.time,
                    isPinned: h.isPinned,
                    isVerified: h.isVerified
                }
            });

            return heroes;
        }
    })
}