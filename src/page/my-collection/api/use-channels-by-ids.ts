// features/my-collection/api/use-channels-by-ids.ts
import { useQuery } from "@tanstack/react-query";
import { $api } from "@/shared/utils";
import { ChannelResponse } from "@/shared/types"; // Твои типы с бэка
import { fromChannelResponseArrayToIChannelArray } from "@/shared/mappers"; // Твой маппер

export const useChannelsByIds = (ids: number[]) => {
    return useQuery({
        // Уникальный ключ зависит от массива ID
        queryKey: ['channels-by-ids', ids],
        queryFn: async () => {
            if (!ids || ids.length === 0) return [];

            // Делаем POST запрос с массивом ID
            const { data } = await $api.post<ChannelResponse[]>('/channel/ids', { ids });
            
            // Прогоняем через маппер, чтобы привести к виду для ChannelCard
            return fromChannelResponseArrayToIChannelArray(data);
        },
        // Запрос идет только если есть ID и мы на клиенте
        enabled: ids.length > 0
    });
};