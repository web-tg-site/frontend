import { Channel } from '@/page/channel'

export default async function Page({params}: {params: Promise<{id: string}>}) {
    const { id } = await params;
    
    return (
        <Channel id={id} />
    )
}
