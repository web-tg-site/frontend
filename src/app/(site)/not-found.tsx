'use client'

import { NotFoundPage } from '@/page/not-found'
import { useEffect } from 'react'

export default function NotFound() {
    useEffect(() => {
        window.scrollTo(0, 0);
    });
    
    return (
        <NotFoundPage />
    )
}
