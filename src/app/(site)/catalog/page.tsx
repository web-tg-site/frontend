import { Catalog } from '@/page/catalog-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Каталог каналов',
    description: 'Каталог телеграм, VK и MAX каналов для размещения рекламы. Подборка площадок по категориям, охватам и стоимости.',
    openGraph: {
        title: 'Каталог каналов — Sway',
        description: 'Каталог телеграм, VK и MAX каналов для размещения рекламы.',
        url: 'https://swaymedia.ru/catalog',
    },
}

export default function Page() {
    return (
        <Catalog />
    )
}
