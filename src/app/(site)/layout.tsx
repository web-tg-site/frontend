import type { Metadata, Viewport } from "next";
import { Onest } from "next/font/google";
import "@/shared/styles/globals.css";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { GlobalCollectionModal } from "@/features/modal-collection/ui/global-collection-modal";

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-onest",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1A1A1A",
};

// ВАЖНО: Замените на ваш реальный домен, когда задеплоите (нужно для корректного отображения картинки в ТГ)
const DOMAIN = "https://sway.pro"; 

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN),
  title: "Sway",
  description: "Сервис по продаже рекламы в Telegram каналах. Удобный поиск, возможность создавать свои подборки каналов и заказ персональной подборки под задачи вашего бизнеса.",
  keywords: [
    "реклама в телеграм",
    "биржа телеграм каналов",
    "купить рекламу telegram",
    "подборка каналов",
    "продвижение в тг",
    "посевы телеграм",
    "нативная реклама",
    "каталог каналов",
    "Sway",
    "персональная подборка",
    "закупка рекламы",
  ],
  // Настройки для соцсетей (Telegram, VK, FB)
  openGraph: {
    title: "Sway",
    description: "Сервис по продаже рекламы в Telegram каналах и создание подборок.",
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
  icons: {
    icon: [
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      // Добавляем и эти, чтобы браузер мог выбрать качество получше
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
        <Header />
        {children}
        <Footer />

        <GlobalCollectionModal />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Sway",
              url: DOMAIN,
              logo: `${DOMAIN}/android-chrome-512x512.png`,
              description: "Биржа рекламы в Telegram",
            }),
          }}
        />
      </body>
    </html>
  );
}