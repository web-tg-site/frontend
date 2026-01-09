'use client'

import Image from "next/image";
import { Plus } from "../icons/plus";
import { Text } from "@/shared/ui";
import { formatPrice } from "@/shared/utils";
import { ChannelCardProps } from "../types/channel-card.props";
import { useCollections } from "@/shared/store/use-collections";
import Link from "next/link";

export const ChannelCard = ({
    id,
    image,
    name,
    category,
    subscribers,
    price,
    loading,
    haveAddButton=true
}: ChannelCardProps) => {
    const openModal = useCollections((state) => state.openModal);

    // --- 1. SKELETON ---
    if (loading) {
        return (
            <div className="bg-white py-3 px-4 rounded-[20px] border border-transparent">
                <div className="flex items-center mb-[21px]">
                    <div className="w-[100px] h-[100px] bg-gray-200 rounded-[20px] mr-5 animate-pulse shrink-0" />
                    <div className="flex-1">
                        <div className="h-7 w-3/4 bg-gray-200 rounded-lg mb-2 animate-pulse" />
                        <div className="flex items-center gap-1.5">
                            <div className="w-[9px] h-[9px] bg-gray-200 rounded-full animate-pulse" />
                            <div className="h-4 w-1/3 bg-gray-200 rounded-md animate-pulse" />
                        </div>
                    </div>
                    <div className="mb-auto ml-auto w-10.5 h-10.5 rounded-full bg-gray-200 animate-pulse shrink-0" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="h-[60px] w-full bg-gray-100 rounded-2xl animate-pulse border border-black/5" />
                    <div className="h-[60px] w-full bg-gray-100 rounded-2xl animate-pulse border border-black/5" />
                </div>
            </div>
        )
    }

    // --- 2. MAIN CARD ---
    return (
        <Link 
            href={`/channel/${id}`} 
            // 👇 ДОБАВИЛИ КЛАССЫ СЮДА:
            // transition-all duration-300 — плавная анимация
            // hover:-translate-y-1 — поднимает карточку на 4px вверх
            // hover:shadow-xl — добавляет глубокую тень
            className="bg-white py-3 px-4 rounded-[20px] group block transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
            <div className="flex items-center mb-[21px]">
                {/* Добавил transition-opacity для картинки, чтобы она чуть "мигала" при наведении */}
                <Image 
                    width={100}
                    height={100}
                    src={image}
                    alt={name}
                    className="w-[100px] h-[100px] object-cover rounded-[20px] mr-5 shrink-0 transition-opacity duration-300 group-hover:opacity-90"
                />

                <div>
                    <p className="mb-1.5 lg:text-[28px] text-[20px] font-medium leading-tight line-clamp-2">
                        {name}
                    </p>

                    <div className="flex items-center gap-1.5">
                        <span 
                            style={{ backgroundColor: category.color }}
                            className="lg:w-[9px] w-1.5 lg:h-[9px] h-1.5 rounded-full"
                        />
                        <p
                            style={{ color: category.color }}
                            className="font-medium text-[14px] lg:text-[16px]"
                        >
                            {category.name}
                        </p>
                    </div>
                </div>

                {/* Кнопка с фиксом клика */}
                {haveAddButton && (
                    <button 
                        onClick={(e) => {
                            e.preventDefault() 
                            e.stopPropagation()
                            openModal(id)
                        }}
                        // Добавил scale при ховере на саму кнопку для лучшего фидбека
                        className="mb-auto ml-auto border border-black bg-black transition-all hover:scale-105 hover:bg-black/80 cursor-pointer w-10.5 h-10.5 rounded-full flex items-center justify-center text-white shrink-0 z-10"
                    >
                        <Plus />
                    </button>
                )}
            </div>

            <div className="grid grid-cols-2 gap-3">
                <BottomCard 
                    topText={subscribers}
                    bottomText="Подписчиков"
                />

                <BottomCard 
                    topText={`${formatPrice(price)}р`}
                    bottomText="Стоимость"
                />
            </div>
        </Link>
    )
}

const BottomCard = ({
    topText,
    bottomText
}: {
    topText: string,
    bottomText: string
}) => {
    return (
        <div className="w-full pt-1 pb-2 px-2 border border-black/5 bg-[#F9F9F9] text-center rounded-2xl transition-colors duration-300 group-hover:bg-[#f0f0f0]">
            <Text variant="2" className="text-black">
                {topText}
            </Text>
            <Text variant="4" className="text-black/60">
                {bottomText}
            </Text>
        </div>
    )
}