import { $apiAdmin } from "@/shared/utils";
import { LoginFormData } from "../types/login-form-data";

export const sendAuth = async (authData: LoginFormData) => {
    const { data } = await $apiAdmin.post('/login', authData);

    console.log(data);

    return data;
}