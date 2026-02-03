import type { Metadata, Viewport } from "next";
import { Onest } from "next/font/google";
import "@/shared/styles/globals.css";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { GlobalCollectionModal } from "@/features/modal-collection/ui/global-collection-modal";
import { QueryProvider, YandexMetrika } from "@/shared/providers";
import { CookieBanner } from "@/widgets/cookie-banner";
import { Suspense } from "react";

const onest = Onest({
    subsets: ["latin", "cyrillic"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-onest",
    display: "swap",
});

export const viewport: Viewport = {
    themeColor: "#1A1A1A",
};

const DOMAIN = "https://swaymedia.ru"; 

export const metadata: Metadata = {
    metadataBase: new URL(DOMAIN),
    title: "Sway",
    description: "Сервис по продаже рекламы в Telegram, ВКонтакте и MAX. Возможность создавать свои подборки каналов и заказ персональной подборки под задачи вашего бизнеса.",
    keywords: [
        // Telegram
        "реклама в телеграм",
        "биржа телеграм каналов",
        "купить рекламу telegram",
        "подборка каналов",
        "продвижение в тг",
        "посевы телеграм",
        "нативная реклама",
        "каталог каналов",
        
        // ВКонтакте (VK)
        "реклама в vk",
        "реклама в вк",
        "реклама в вконтакте",
        "реклама в ВКонтакте",
        "продвижение в вк",
        "продвижение вконтакте",
        "посевы вк",
        "посевы вконтакте",
        "биржа вк",
        "биржа вконтакте",
        "купить рекламу вк",
        "реклама в пабликах",

        // MAX
        "реклама в MAX",
        "реклама в max",
        "реклама в макс",
        "продвижение в max",
        "биржа max",
        "трафик max",

        // Общие / Бренд
        "Sway",
        "персональная подборка",
        "закупка рекламы",
    ],
    openGraph: {
        title: "Sway",
        description: "Сервис по продаже рекламы в Telegram, VK, MAX и создание подборок.",
        url: DOMAIN,
        siteName: "Sway",
        locale: "ru_RU",
        type: "website",
        images: [
            {
                url: "/android-chrome-512x512.png",
                width: 512,
                height: 512,
                alt: "Sway Logo",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Sway",
        description: "Сервис по продаже рекламы в Telegram, VK, MAX и создание подборок.",
        images: ["/android-chrome-512x512.png"],
    },
    alternates: {
        canonical: DOMAIN,
    },
    icons: {
        icon: [
            { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
            { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
            { url: "/android-chrome-192x192.png", type: "image/png", sizes: "192x192" },
        ],
        apple: [
            { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
        ],
    },
    manifest: "/site.webmanifest",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" className="scroll-smooth">
            <body
                className={`${onest.className} antialiased bg-background`}
                suppressHydrationWarning
            >
                <Suspense fallback={<></>}>
                    <YandexMetrika />
                </Suspense>
                <QueryProvider>
                    <Header />
                    {children}
                    <Footer />

                    <GlobalCollectionModal />
                    <CookieBanner />
                </QueryProvider>
                
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            name: "Sway",
                            url: DOMAIN,
                            logo: `${DOMAIN}/android-chrome-512x512.png`,
                            description: "Биржа рекламы в Telegram, VK, MAX",
                        }),
                    }}
                />
            </body>
        </html>
    );
}