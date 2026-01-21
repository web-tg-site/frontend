import { CategoryForm } from '@/features/category-form'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Добавить категорию'
}

export default function page() {
    return (
        <CategoryForm />
    )
}
