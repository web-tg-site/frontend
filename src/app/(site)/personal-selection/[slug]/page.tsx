import { PersonalSelection } from '@/page/personal-selection'
import type { Metadata } from 'next'

// Персональные подборки — приватные, не индексируем
export const metadata: Metadata = {
    title: 'Персональная подборка',
    robots: { index: false, follow: false },
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    return (
        <PersonalSelection slug={slug} />
    )
}