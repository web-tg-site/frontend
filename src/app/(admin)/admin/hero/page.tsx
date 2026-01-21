import { AdminHero } from '@/page/admin-hero'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Редактирование hero'
}

export default function page() {
    return (
        <AdminHero />
    )
}
