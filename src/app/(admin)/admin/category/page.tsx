import { AdminCategory } from '@/page/admin-category';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Редактирование категорий'
}

export default function page() {
    return (
        <AdminCategory />
    )
}
