import { AdminForm } from '@/features/admin-form'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Добавить участника'
}

export default function page() {
    return (
        <AdminForm />
    )
}
