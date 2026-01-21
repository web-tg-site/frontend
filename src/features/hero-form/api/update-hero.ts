import { $apiAdmin } from "@/shared/utils";

export const updateHero = async (id: number, data: any) => {
    return $apiAdmin.put(`/hero/${id}`, data);
};