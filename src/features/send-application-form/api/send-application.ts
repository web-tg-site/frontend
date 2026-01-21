import { $api } from "@/shared/utils";
import { SendApplicationFormData } from "../types/send-application-form-data";

export const SendApplication = async (formData: SendApplicationFormData) => {
    const { data } = await $api.post('/send-notify', formData);

    console.log(data);

    return data;
}