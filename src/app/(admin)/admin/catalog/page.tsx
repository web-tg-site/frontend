import { AdminChannels } from '@/page/admin-channels';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Каталог каналов"
}

export default function page() {
    return (
        <AdminChannels type='moderator' />
    )
}
