import { $apiAdmin } from '@/shared/utils';
import { Payload } from "./create-channel";

export const updateChannel = async (id: number, payload: Payload) => {
    return await $apiAdmin.put(`/channel/${id}`, payload);
}