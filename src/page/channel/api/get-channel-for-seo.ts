import { ChannelResponse } from '@/shared/types';
import { $api } from '@/shared/utils';

export const getChannelForSeo = async (slug: string): Promise<ChannelResponse | null> => {
    try {
        const { data } = await $api.get<ChannelResponse>(`/channel/${slug}`);
        
        return data;
    } catch {
        return null;
    }
}