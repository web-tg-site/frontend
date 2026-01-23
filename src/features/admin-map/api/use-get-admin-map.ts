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

    const updatePositions = useMutation({
        mutationFn: async (pins: UpdateMapPinPayload[]) => {
            const promises = pins.map(({ id, ...body }) => 
                $apiAdmin.put<void>(`/map/${id}`, body)
            );
            await Promise.all(promises);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['Admin Map'] });
        },
        onError: (e) => {
            console.error(e);
            alert("Ошибка сохранения");
        }
    });

    // 2. ADD (Добавление)
    const addPin = useMutation({
        mutationFn: async (data: MapCreateDto) => {
            const res = await $apiAdmin.post<MapResponse>('/map', data);
            return res.data;
        },
    });

    // 3. DELETE (Удаление)
    const deletePin = useMutation({
        mutationFn: async (id: number) => {
            await $apiAdmin.delete(`/map/${id}`);
        },
    });

    return { updatePositions, addPin, deletePin };
};