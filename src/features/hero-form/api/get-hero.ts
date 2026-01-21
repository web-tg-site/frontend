import { $apiAdmin } from "@/shared/utils";

export const getHero = async (id: number | string) => {
    const { data } = await $apiAdmin.get(`/hero/${id}`);
    return data;
};