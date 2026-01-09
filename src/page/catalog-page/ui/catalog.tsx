"use client"

import { useState, useMemo } from "react"
import { AnimatePresence } from "framer-motion"

// --- Swiper Imports ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

// --- Shared UI & Utils ---
import { Headline, LinkButton, Text } from "@/shared/ui"

// --- Entities & Configs ---
import { ChannelCard } from "@/entities/channel"
import { CHANNEL_MOCKS } from "../config/channel-mock"
import { SUBSCRIBER_RANGES } from "../config/filter-options"

// --- Local Components ---
import { FilterButton } from "./filter-button"
import { FilterModal } from "./filter-modal"
import { cn } from "@/shared/utils"; // Убедитесь, что cn импортирован

// --- Helper: Парсинг подписчиков ---
const parseSubscribers = (str: string): number => {
    const s = str.toLowerCase().replace(/,/g, '.');
    if (s.includes("млн")) return parseFloat(s) * 1_000_000;
    if (s.includes("к")) return parseFloat(s) * 1_000;
    return parseFloat(s);
};

export const Catalog = () => {
    // --- КОНСТАНТЫ ---
    const ITEMS_PER_ROW = 3;
    const ROWS_TO_LOAD = 7;
    const BATCH_SIZE = ITEMS_PER_ROW * ROWS_TO_LOAD;

    // --- STATE ---
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filterCategories, setFilterCategories] = useState<string[]>([]);
    const [filterRangeIndex, setFilterRangeIndex] = useState<number>(0);
    const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
    const [isLoading, setIsLoading] = useState(false);

    // --- ЛОГИКА ФИЛЬТРАЦИИ ---
    const filteredChannels = useMemo(() => {
        return CHANNEL_MOCKS.filter(channel => {
            const categoryMatch = filterCategories.length === 0 || filterCategories.includes(channel.category.name);
            const subCount = parseSubscribers(channel.subscribers);
            const range = SUBSCRIBER_RANGES[filterRangeIndex];
            const subsMatch = subCount >= range.min && subCount < range.max;
            return categoryMatch && subsMatch;
        });
    }, [filterCategories, filterRangeIndex]);

    const currentChannels = filteredChannels.slice(0, visibleCount);
    const hasMore = visibleCount < filteredChannels.length;

    // --- ХЕНДЛЕРЫ ---
    const handleShowMore = async () => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 600));
        setVisibleCount((prev) => prev + BATCH_SIZE);
        setIsLoading(false);
    };

    const removeCategoryTag = (cat: string) => {
        setFilterCategories(prev => prev.filter(c => c !== cat));
    };

    // Компонент тега (чтобы не дублировать код верстки)
    const TagItem = ({ cat }: { cat: string }) => (
        <button 
            onClick={() => removeCategoryTag(cat)}
            className="px-4 py-2 rounded-full border border-white/30 text-white text-sm hover:bg-white/10 transition-colors whitespace-nowrap flex items-center gap-2"
        >
            {cat}
            {/* Добавляем крестик визуально */}
            <span className="opacity-60 text-base leading-none">×</span>
        </button>
    );

    return (
        <section className="mt-[106px] mb-[110px] px-7.5 relative">
            {/* --- ЗАГОЛОВОК --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end md:mb-9 mb-0">
                <Headline className="mb-3 md:mb-0">Каталог</Headline>
                <Text variant="2" className="text-white/50 max-w-[309px]">
                    Подберите каналы по тематике, охвату и формату размещения
                </Text>
            </div>

            {/* --- ПАНЕЛЬ УПРАВЛЕНИЯ --- */}
            <div className="flex flex-col mb-9">
                {/* ВЕРХНИЙ РЯД: Счетчик + (Слайдер Desktop) + Кнопка */}
                <div className="flex justify-between items-center w-full">
                    {/* Левая часть: Счетчик */}
                    <p className="text-white whitespace-nowrap shrink-0">
                        {filteredChannels.length} каналов
                    </p>

                    {/* Правая часть: Desktop Tags + Button */}
                    <div className="flex items-center justify-end gap-3 flex-1 min-w-0 ml-4">
                        
                        {/* 
                            1. DESKTOP TAGS (> 1024px) 
                            Используем min-[1025px]:block, чтобы показать только на экранах больше 1024px
                        */}
                        {filterCategories.length > 0 && (
                            <div className="hidden min-[1025px]:block min-w-0 max-w-full">
                                <Swiper
                                    modules={[FreeMode, Mousewheel]}
                                    slidesPerView="auto"
                                    spaceBetween={8}
                                    freeMode={true}
                                    mousewheel={true}
                                    dir="rtl"
                                    className="w-full"
                                >
                                    {filterCategories.map(cat => (
                                        <SwiperSlide key={cat} className="w-auto!">
                                            <div dir="ltr">
                                                <TagItem cat={cat} />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        )}

                        {/* КНОПКА ФИЛЬТРАЦИИ (Всегда на месте) */}
                        <div className="relative shrink-0">
                            <FilterButton 
                                isActive={isFilterOpen || filterCategories.length > 0 || filterRangeIndex !== 0}
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                            />

                            {/* МОДАЛКА */}
                            <AnimatePresence>
                                {isFilterOpen && (
                                    <>
                                        <div 
                                            className="fixed inset-0 z-40" 
                                            onClick={() => setIsFilterOpen(false)} 
                                        />
                                        <FilterModal 
                                            initialCategories={filterCategories}
                                            initialSubscriberRangeIndex={filterRangeIndex}
                                            onClose={() => setIsFilterOpen(false)}
                                            onSave={(cats, rangeIdx) => {
                                                setFilterCategories(cats);
                                                setFilterRangeIndex(rangeIdx);
                                                setVisibleCount(BATCH_SIZE);
                                            }}
                                        />
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* 
                    2. MOBILE TAGS (<= 1024px)
                    Сетка тегов, которая появляется под верхней панелью.
                    Скрыта на min-[1025px]
                */}
                {filterCategories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4 min-[1025px]:hidden">
                        {filterCategories.map(cat => (
                            <TagItem key={cat} cat={cat} />
                        ))}
                    </div>
                )}
            </div>

            {/* --- СЕТКА ТОВАРОВ --- */}
            {currentChannels.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-5 mb-15">
                    {currentChannels.map((channel, idx) => (
                        <ChannelCard key={`${channel.id}-${idx}`} {...channel} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-white/50">
                    <p className="text-xl">Ничего не найдено</p>
                    <button 
                        onClick={() => {
                            setFilterCategories([]);
                            setFilterRangeIndex(0);
                        }}
                        className="mt-4 text-primary hover:underline"
                    >
                        Сбросить фильтры
                    </button>
                </div>
            )}

            {/* --- КНОПКА ЗАГРУЗКИ --- */}
            {hasMore && (
                <div className="flex justify-center">
                    <LinkButton 
                        onClick={handleShowMore}
                        loading={isLoading}
                        type="button"
                    >
                        Смотреть еще
                    </LinkButton>
                </div>
            )}
        </section>
    )
}   