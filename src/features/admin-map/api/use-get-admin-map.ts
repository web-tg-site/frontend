import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { $apiAdmin } from "@/shared/utils";
import { MapCreateDto, UpdateMapPinPayload } from "../types";
import { MapResponse } from "@/shared/types";

export const useGetAdminMap = () => {
    return useQuery({
        queryKey: ['Admin Map'],
        queryFn: async () => {
            const { data } = await $apiAdmin.get<MapResponse[]>('/map');

            return data;
        }
    })
}

export const useAdminMapMutations = () => {
    const queryClient = useQueryClient();

    // 1. UPDATE (Massive)
    const updatePositions = useMutation({
        mutationFn: async (pins: UpdateMapPinPayload[]) => {
            // Создаем массив промисов
            const promises = pins.map((pin) => {
                const { id, ...body } = pin; // Отделяем ID от данных
                
                // URL: /map/5
                // Body: { channelId: 1, left: 50, top: 50 }
                return $apiAdmin.put<void>(`/map/${id}`, body);
            });

            // Ждем выполнения всех запросов
            await Promise.all(promises);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['Admin Map'] });
        },
        onError: (error) => {
            console.error(error);
            alert("Ошибка при сохранении. Проверьте консоль.");
        }
    });

    // 2. CREATE
    const addPin = useMutation({
        mutationFn: async (data: MapCreateDto) => {
            await $apiAdmin.post('/map', data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['Admin Map'] });
        }
    });

    // 3. DELETE
    const deletePin = useMutation({
        mutationFn: async (id: number) => {
            await $apiAdmin.delete(`/map/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['Admin Map'] });
        }
    });

    return { updatePositions, addPin, deletePin };
};