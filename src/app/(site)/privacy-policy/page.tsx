import { DocumentTemplate } from "@/widgets/document-template";
import type { Metadata } from "next";
import { PRIVACY_POLICY_ITEMS } from "./data";

export const metadata: Metadata = {
    title: "Политика конфиденциальности | Sway",
    description: "Политика в отношении обработки, защиты, безопасности и соблюдения конфиденциальности персональных данных",
};

export default function PrivacyPolicyPage() {
    return (
        <DocumentTemplate
            title="Политика конфиденциальности"
            items={PRIVACY_POLICY_ITEMS}
        />
    );
}
