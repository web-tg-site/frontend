import { AdminChannels } from '@/page/admin-channels'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Редактировать каталог'
}

export default function page() {
    return (
        <AdminChannels type='admin' />
    )
}
