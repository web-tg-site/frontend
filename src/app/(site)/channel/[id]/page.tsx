import { Channel } from '@/page/channel'
import type { Metadata } from 'next'

// Временная заглушка данных для SEO, совпадающая с версткой
const MOCK_SEO = {
    title: 'Критик в шёлковом халате',
    description: 'Телеграм-канал о красоте без иллюзий и рекламы. Честные разборы бьюти-трендов, средств и процедур, эстетика ухода и ироничный взгляд на индустрию. Коротко, по делу и со вкусом',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=200&auto=format&fit=crop'
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    // const { id } = await params;
    // В будущем тут будет: const data = await getChannelById(id);
    
    return {
        title: MOCK_SEO.title,
        description: MOCK_SEO.description,
        openGraph: {
            title: MOCK_SEO.title,
            description: MOCK_SEO.description,
            images: [
                {
                    url: MOCK_SEO.image,
                    width: 200,
                    height: 200,
                    alt: MOCK_SEO.title,
                }
            ],
            type: 'article', // Или 'website', но для страницы канала лучше 'article' или 'profile'
        },
        twitter: {
            card: 'summary',
            title: MOCK_SEO.title,
            description: MOCK_SEO.description,
            images: [MOCK_SEO.image],
        }
    }
}

export default async function Page({params}: {params: Promise<{id: string}>}) {
    const { id } = await params;
    
    return (
        <Channel id={id} />
    )
}