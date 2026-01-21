import { HeroForm } from '@/features/hero-form';
import { Metadata } from 'next'
import React from 'react'

type Props = {
    params: Promise<{ id: string }>
}

export const metadata: Metadata = {
    title: 'Редактирование hero'
}

export default async function Page({ params }: Props) {
    const { id } = await params;

    return (
        <HeroForm type='edit' id={id} />
    )
}
