import { DocumentTemplate } from "@/widgets/document-template";
import { PERSONAL_DATA_CONSENT_ITEMS } from "./data";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Согласие на обработку персональных данных | Sway",
    description: "Согласие Пользователя на обработку персональных данных",
};

export default function PersonalDataConsentPage() {
    return (
        <DocumentTemplate
            title="Согласие Пользователя на обработку персональных данных"
            items={PERSONAL_DATA_CONSENT_ITEMS}
        />
    );
}
