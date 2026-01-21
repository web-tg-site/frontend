import { $api } from '@/shared/utils';
import { HeroResponse } from '@/shared/types/hero-response';
import { useQuery } from "@tanstack/react-query"
import { TelegramChannel } from '../types';
import { BubbleData } from '../ui/bubbles-layer';

export const useHero = () => {
    return useQuery({
        queryKey: ['hero'],
        queryFn: async () => {
            const {data} = await $api.get<HeroResponse>('/hero');

            const channels: TelegramChannel[] = data.heroChannels.map((h) => {
                return {
                    id: h.id,
                    title: h.channel.name,
                    message: h.message,
                    avatarUrl: h.channel.image,
                    time: h.time,
                    href: `/channel/${h.channel.slug}`,
                    isPinned: h.isPinned,
                    isVerified: h.isVerified
                }
            });

            const categories: BubbleData[] = data.categories.map((c) => {
                return {
                    id: c.id,
                    title: c.name,
                    icon: c.icon,
                    color: c.color,
                    href: `/catalog?filter=${c.id}`
                }
            })

            return {
                channels,
                categories
            }
        }
    })
}