import { AdminMap } from '@/features/admin-map'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Редактирование карты'
}

export default function page() {
    return (
        <AdminMap />
    )
}
