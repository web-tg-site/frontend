import { AdminCategory } from '@/page/admin-category'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Категории'
}

export default function page() {
    return (
        <AdminCategory type='moderation' />
    )
}
