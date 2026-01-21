import { PersonalSelection } from '@/page/personal-selection'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    return (
        <PersonalSelection slug={slug} />
    )
}