import Image from "next/image"
import { ProfileCardProps } from "../types/profile-card.props"
import { cn } from "@/shared/utils"

export const ProfileCard = ({
    name,
    type,
    loading,
    className
}: ProfileCardProps) => {

    if (loading) {
        return (
            <div className={cn("bg-white/8 rounded-[20px] p-0.5 pr-4 flex items-center gap-2 animate-pulse select-none", className)}>
                <div className="w-[38px] h-[38px] rounded-full bg-white/10 shrink-0" />

                <div className="flex flex-col gap-1.5">
                    <div className="h-3.5 w-24 bg-white/10 rounded-md" />
                    <div className="h-2.5 w-16 bg-white/10 rounded-md" />
                </div>
            </div>
        )
    }

    return (
        <div className={cn("bg-white/8 rounded-[20px] p-0.5 pr-4 flex items-center gap-2", className)}>
            <Image 
                src="/admin/profile.png"
                alt="Изображение профиля"
                width={38}
                height={38}
                className="rounded-full"
            />

            <div className="flex flex-col gap-px">
                <p className="text-[14px] text-white font-medium leading-tight">{name}</p>
                <p className="text-[12px] text-white/60 leading-tight">
                    {type === 'admin' ? 'Суперадмин' : 'Модератор'}
                </p>
            </div>
        </div>
    )
}