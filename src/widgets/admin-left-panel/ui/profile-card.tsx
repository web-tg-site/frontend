import Image from "next/image"
import { ProfileCardProps } from "../types/profile-card.props"

export const ProfileCard = ({
    name,
    type,
    loading
}: ProfileCardProps) => {

    if (loading) {
        return (
            <div className="bg-white/8 rounded-[20px] p-0.5 pr-4 flex items-center gap-2 animate-pulse select-none">
                <div className="w-[38px] h-[38px] rounded-full bg-white/10 shrink-0" />

                <div className="flex flex-col gap-1.5">
                    <div className="h-3.5 w-24 bg-white/10 rounded-md" />
                    <div className="h-2.5 w-16 bg-white/10 rounded-md" />
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white/8 rounded-[20px] p-0.5 pr-4 flex items-center gap-2">
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