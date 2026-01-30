import { Channel } from '@/page/channel'
import { getChannelForSeo } from '@/page/channel/api/get-channel-for-seo';
import type { Metadata } from 'next'

// Дефолтная заглушка (если канал не найден или ошибка API)
const DEFAULT_SEO = {
    title: 'Каталог каналов',
    description: 'Лучшие телеграм каналы',
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const channel = await getChannelForSeo(slug);

    if (!channel) {
        return {
            title: 'Канал не найден',
            description: 'Запрашиваемый канал не существует'
        }
    }

    const baseUrl = 'https://swaymedia.ru';
    const canonical = `${baseUrl}/channel/${slug}`;

    return {
        title: channel.name,
        description: channel.description || DEFAULT_SEO.description,
        openGraph: {
            title: channel.name,
            description: channel.description || DEFAULT_SEO.description,
            url: canonical,
            images: [
                {
                    url: channel.image || '',
                    width: 200,
                    height: 200,
                    alt: channel.name,
                }
            ],
            type: 'article',
        },
        alternates: {
            canonical,
        },
    }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return <Channel slug={slug} />
}