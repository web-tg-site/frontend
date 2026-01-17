import { ChannelForm } from '@/features/channel-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Добавление канала'
}

export default function page() {
    return (
        <ChannelForm /> 
    )
}
