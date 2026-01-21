import { $apiAdmin } from "@/shared/utils";

export const createHero = async (data: any) => {
    return $apiAdmin.post('/hero/create', data);
};