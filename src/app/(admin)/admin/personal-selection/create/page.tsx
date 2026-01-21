import { SelectionForm } from '@/features/selection-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Создание персональной подборки'
}

export default function page() {
    return (
        <SelectionForm />
    )
}
