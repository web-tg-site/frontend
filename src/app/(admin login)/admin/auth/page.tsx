import { AdminAuth } from "@/features/admin-auth";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Вход'
}

export default function AdminLogin() {
    return (
        <AdminAuth />
    )
}
