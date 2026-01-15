"use client";

import { AdminCard } from "@/shared/ui";
import Image from 'next/image';
import { ProfileCard } from "./profile-card";
import { useAdminProfile } from "../api/use-admin-profile";

export const AdminLeftPanel = () => {
    const { data: profile, isLoading } = useAdminProfile();

    return (
        <AdminCard className="p-5 w-[290px]">
            <Image 
                src='/logo.svg'
                alt='Логотип'
                width={115}
                height={37}
                className="mb-[57px]"
            />

            <ProfileCard 
                loading={isLoading}
                name={profile?.name || 'Тестович'}
                type={profile?.type || 'admin'}
            />
        </AdminCard>
    )
}