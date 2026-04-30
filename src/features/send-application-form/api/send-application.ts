import { $api } from "@/shared/utils";
import { SendApplicationFormData } from "../types/send-application-form-data";

export const SendApplication = async (formData: SendApplicationFormData) => {
    const { isAgreed, isPersonalDataAgreed, ...payload } = formData;
    const { data } = await $api.post('/send-notify', payload);
    return data;
}