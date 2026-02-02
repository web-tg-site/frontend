import { DocumentTemplate } from "@/widgets/document-template";
import { COOKIE_CONSENT_ITEMS } from "./data";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Согласие на обработку cookie и метрики | Sway",
    description: "Согласие на обработку персональных данных с использованием файлов cookie и сервисов веб-аналитики",
};

export default function CookieConsentPage() {
    return (
        <DocumentTemplate
            title="Согласие на обработку cookie и метрики"
            items={COOKIE_CONSENT_ITEMS}
        />
    );
}
