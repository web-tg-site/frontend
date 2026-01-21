import { AdminPersonalSelection } from '@/page/admin-personal-selection'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Персональная подборка'
}

export default function page() {
    return (
        <AdminPersonalSelection />
    )
}
