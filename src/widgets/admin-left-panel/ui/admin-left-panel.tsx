"use client";

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { AdminCard } from "@/shared/ui";
import { Navigation as NavigationItem } from "./navigation";
import { NavigationSkeleton } from "./navigation-sekeleton";
import { ProfileCard } from "./profile-card";
import { useAdminProfile } from "../api/use-admin-profile";
import { NAV_DATA } from "../config/nav-data";
import { LogOut } from 'lucide-react';
import { logout } from '../api/logout';

export const AdminLeftPanel = () => {
    const { data: profile, isLoading } = useAdminProfile();
    const userRole = profile?.type; 

    const pathname = usePathname();

    const handleLogout = async () => {
        await logout();
    }

    return (
        <AdminCard className="p-5 w-[290px] min-h-[700px] flex flex-col">
            <Image 
                src='/logo.svg'
                alt='Логотип'
                width={115}
                height={37}
                className="mb-[57px]"
            />

            <ProfileCard 
                loading={isLoading}
                name={profile?.name || 'Загрузка...'}
                type={userRole || 'moderator'}
                className="mb-9.5"
            />

            <div className="flex flex-col gap-3 w-full">
                {isLoading ? (
                    Array.from({ length: 4 }).map((_, index) => (
                        <NavigationSkeleton key={index} />
                    ))
                ) : (
                    NAV_DATA.map((item) => {
                        if (item.roles && userRole && !item.roles.includes(userRole)) {
                            return null;
                        }

                        if (!userRole && item.roles) return null;
                        
                        const isActive = 
                            pathname === item.href || 
                            item.additionalHrefs?.some(path => pathname.startsWith(path));

                        return (
                            <NavigationItem
                                key={item.name + item.href}
                                icon={item.icon}
                                name={item.name}
                                href={item.href}
                                active={!!isActive} // Передаем результат новой проверки
                            />
                        );
                    })
                )}
            </div>

            <button onClick={handleLogout} className='mt-auto cursor-pointer group flex items-center gap-1.5 pt-5'>
                <LogOut 
                    size={18}
                    className='text-white transition group-hover:text-red-500/80'
                />

                <p className='text-white transition group-hover:text-red-500/80 text-[14px] leading-[112%]'>
                    Выйти
                </p>
            </button>
        </AdminCard>
    )
}