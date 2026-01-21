import { HeroForm } from '@/features/hero-form'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Добавление канала'
}

export default function page() {
    return (
        <HeroForm />
    )
}
