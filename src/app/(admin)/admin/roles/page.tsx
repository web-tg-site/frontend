import { AdminRoles } from '@/page/admin-roles'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Роли и права'
}

export default function page() {
    return (
        <AdminRoles />
    )
}
