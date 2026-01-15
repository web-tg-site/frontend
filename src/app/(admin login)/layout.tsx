import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "@/shared/styles/admin.css";

// Настройка шрифта Onest
const onest = Onest({
    subsets: ["latin", "cyrillic"],
    variable: "--font-onest",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        template: "%s | SWAY Admin",
        default: "Dashboard | SWAY Admin",
    },
    description: "SWAY Administration Panel",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <body className={`${onest.className} bg-background min-h-screen antialiased`}>
                {children}
            </body>
        </html>
    );
}