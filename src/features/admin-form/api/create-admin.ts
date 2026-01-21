import { $apiAdmin } from "@/shared/utils";

interface CreateAdminPayload {
    name: string;
    email: string;
    type: string; // Роль
    password?: string;
}

export const createAdmin = async (data: CreateAdminPayload) => {
    return $apiAdmin.post('/create', data);
};