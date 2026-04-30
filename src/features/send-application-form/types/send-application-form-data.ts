export interface SendApplicationFormData {
    name?: string;
    phone: string;
    telegram: string;
    comment: string;
    isAgreed?: boolean;
    isCookieAndMetricsAgreed?: boolean;
    isPersonalDataAgreed?: boolean;
}