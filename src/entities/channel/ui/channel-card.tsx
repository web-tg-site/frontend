'use client'

import Image from "next/image";
import Link from "next/link";
import { Check, Plus, Trash } from "lucide-react";
import { Text } from "@/shared/ui";
import { cn, formatPrice } from "@/shared/utils";
import { ChannelCardProps } from "../types/channel-card.props";
import { useCollections } from "@/shared/store/use-collections";

export const ChannelCard = ({
    id,
    image,
    name,
    category,
    subscribers,
    price,
    loading,
    haveAddButton = true,
    type = "site",
    isSelected = false,
    buttonAction = 'add',
    slug,
    onAdminClick
}: ChannelCardProps) => {
    const openModal = useCollections((state) => state.openModal);

    const isAdmin = type === 'admin';

    if (loading) {
        return (
            <div className={cn(
                "py-3 px-4 rounded-[20px] border border-transparent",
                isAdmin ? "bg-[#282828]" : "bg-white"
            )}>
                <div className="flex items-center mb-[21px]">
                    <div className={cn("w-[100px] h-[100px] rounded-[20px] mr-5 animate-pulse shrink-0", isAdmin ? "bg-white/5" : "bg-gray-200")} />
                    <div className="flex-1">
                        <div className={cn("h-7 w-3/4 rounded-lg mb-2 animate-pulse", isAdmin ? "bg-white/5" : "bg-gray-200")} />
                        <div className="flex items-center gap-1.5">
                            <div className={cn("w-[9px] h-[9px] rounded-full animate-pulse", isAdmin ? "bg-white/5" : "bg-gray-200")} />
                            <div className={cn("h-4 w-1/3 rounded-md animate-pulse", isAdmin ? "bg-white/5" : "bg-gray-200")} />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className={cn("h-[60px] w-full rounded-2xl animate-pulse", isAdmin ? "bg-white/5" : "bg-gray-100")} />
                    <div className={cn("h-[60px] w-full rounded-2xl animate-pulse", isAdmin ? "bg-white/5" : "bg-gray-100")} />
                </div>
            </div>
        )
    }

    const handleButtonClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isAdmin && onAdminClick) {
            onAdminClick(id);
        } else {
            openModal(id, image);
        }
    };

    const cardClassName = cn(
        "py-3 px-4 rounded-[20px] group block transition-all duration-300",
        !isAdmin && "bg-white hover:-translate-y-1 hover:shadow-xl",
        isAdmin && "bg-[#1E1E1E] border border-transparent hover:border-white/10"
    );

    const cardContent = (
        <>
            <div className="flex items-center mb-[21px]">
                <Image 
                    width={100}
                    height={100}
                    src={image}
                    alt={name}
                    className="w-[100px] h-[100px] object-cover rounded-[20px] mr-5 shrink-0 transition-opacity duration-300 group-hover:opacity-90 bg-gray-800"
                />

                <div className="flex-1 min-w-0 pr-2">
                    <p className={cn(
                        "mb-1.5 lg:text-[24px] text-[20px] font-medium leading-tight line-clamp-2",
                        isAdmin ? "text-white" : "text-black"
                    )}>
                        {name}
                    </p>

                    <div className="flex items-center gap-1.5">
                        <span 
                            style={{ backgroundColor: category.color }}
                            className="lg:w-[9px] w-1.5 lg:h-[9px] h-1.5 rounded-full shrink-0"
                        />
                        <p
                            style={{ color: category.color }}
                            className="font-medium text-[14px] lg:text-[16px] truncate"
                        >
                            {category.name}
                        </p>
                    </div>
                </div>

                {haveAddButton && (
                    <button 
                        onClick={handleButtonClick}
                        className={cn(
                            "mb-auto ml-auto cursor-pointer w-10.5 h-10.5 rounded-full flex items-center justify-center shrink-0 z-10 transition-all hover:scale-105",
                            !isAdmin && "bg-black text-white hover:bg-black/80",
                            isAdmin && buttonAction === 'add' && !isSelected && "bg-white text-black hover:bg-gray-200",
                            isAdmin && buttonAction === 'add' && isSelected && "bg-[#22C55E] text-white",
                            isAdmin && buttonAction === 'delete' && "bg-[#DD2C00] text-white hover:bg-[#BF2600]"
                        )}
                    >
                        {isAdmin && buttonAction === 'delete' ? (
                            <Trash size={18} />
                        ) : (
                            isAdmin && isSelected ? <Check size={20} /> : <Plus size={20} />
                        )}
                    </button>
                )}
            </div>

            <div className="grid grid-cols-2 gap-3">
                <BottomCard 
                    topText={subscribers}
                    bottomText="Подписчиков"
                    isAdmin={isAdmin}
                />

                <BottomCard 
                    topText={`${formatPrice(price)}р`}
                    bottomText="Стоимость"
                    isAdmin={isAdmin}
                />
            </div>
        </>
    );

    if (isAdmin) {
        return (
            <div className={cardClassName}>
                {cardContent}
            </div>
        );
    }

    return (
        <Link href={`/channel/${slug}`} className={cardClassName}>
            {cardContent}
        </Link>
    );
}

const BottomCard = ({
    topText,
    bottomText,
    isAdmin
}: {
    topText: string,
    bottomText: string,
    isAdmin: boolean
}) => {
    return (
        <div className={cn(
            "w-full pt-1 pb-2 px-2 border text-center rounded-2xl transition-colors duration-300",
            !isAdmin && "border-black/5 bg-[#F9F9F9] group-hover:bg-[#f0f0f0]",
            isAdmin && "border-transparent bg-[#282828]" 
        )}>
            <Text variant="2" className={cn(isAdmin ? "text-white" : "text-black")}>
                {topText}
            </Text>
            <Text variant="4" className={cn(isAdmin ? "text-[#656565]" : "text-black/60")}>
                {bottomText}
            </Text>
        </div>
    )
}