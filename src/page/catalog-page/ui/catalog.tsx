"use client"

import { useState, useMemo } from "react"
import { AnimatePresence } from "framer-motion"

import { useCatalog } from "../api/use-catalog";

// --- Swiper Imports ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

// --- Shared UI & Utils ---
import { Headline, LinkButton, Text } from "@/shared/ui"

// --- Entities & Configs ---
import { ChannelCard } from "@/entities/channel"
import { SUBSCRIBER_RANGES } from "../config/filter-options"

// --- Local Components ---
import { FilterButton } from "./filter-button"
import { FilterModal } from "./filter-modal"

// --- Helper: Парсинг подписчиков ---
const parseSubscribers = (str: string): number => {
    if (!str) return 0;
    const s = str.toLowerCase().replace(/,/g, '.');
    if (s.includes("млн")) return parseFloat(s) * 1_000_000;
    if (s.includes("к") || s.includes("k")) return parseFloat(s) * 1_000;
    return parseFloat(s) || 0;
};

export const Catalog = () => {
    // --- КОНСТАНТЫ ---
    const ITEMS_PER_ROW = 3;
    const ROWS_TO_LOAD = 7;
    const BATCH_SIZE = ITEMS_PER_ROW * ROWS_TO_LOAD;
    const SKELETON_COUNT = 6; // Сколько карточек-скелетонов показывать при загрузке

    // --- DATA FETCHING ---
    const { data, isLoading: isCatalogLoading } = useCatalog();
    
    // Безопасно извлекаем данные
    const channels = data?.ichannels ?? [];
    const availableCategories = data?.category ?? [];

    // --- STATE ---
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filterCategories, setFilterCategories] = useState<string[]>([]);
    const [filterRangeIndex, setFilterRangeIndex] = useState<number>(0);
    const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
    
    // Локальная загрузка для пагинации (кнопка "Показать еще")
    const [isMoreLoading, setIsMoreLoading] = useState(false);

    // --- ЛОГИКА ФИЛЬТРАЦИИ ---
    const filteredChannels = useMemo(() => {
        // Если данные еще грузятся, возвращаем пустой массив, чтобы не было ошибок
        if (isCatalogLoading) return [];

        return channels.filter(channel => {
            const catName = typeof channel.category === 'string' 
                ? channel.category 
                : channel.category?.name;

            const categoryMatch = 
                filterCategories.length === 0 || 
                (catName && filterCategories.includes(catName));

            const subCount = parseSubscribers(channel.subscribers);
            const range = SUBSCRIBER_RANGES[filterRangeIndex];
            const subsMatch = subCount >= range.min && subCount < range.max;
            
            return categoryMatch && subsMatch;
        });
    }, [channels, filterCategories, filterRangeIndex, isCatalogLoading]);

    const currentChannels = filteredChannels.slice(0, visibleCount);
    const hasMore = visibleCount < filteredChannels.length;

    // --- ХЕНДЛЕРЫ ---
    const handleShowMore = async () => {
        setIsMoreLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 600));
        setVisibleCount((prev) => prev + BATCH_SIZE);
        setIsMoreLoading(false);
    };

    const removeCategoryTag = (cat: string) => {
        setFilterCategories(prev => prev.filter(c => c !== cat));
    };

    const TagItem = ({ cat }: { cat: string }) => (
        <button 
            onClick={() => removeCategoryTag(cat)}
            className="px-4 py-2 rounded-full border border-white/30 text-white text-sm hover:bg-white/10 transition-colors whitespace-nowrap flex items-center gap-2"
        >
            {cat}
            <span className="opacity-60 text-base leading-none">×</span>
        </button>
    );

    // --- RENDER HELPERS ---
    
    // Функция для рендера контента сетки
    const renderGridContent = () => {
        // 1. Состояние ЗАГРУЗКИ (Показываем скелетоны)
        if (isCatalogLoading) {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-5 mb-15">
                    {Array.from({ length: SKELETON_COUNT }).map((_, idx) => (
                        <ChannelCard 
                            key={`skeleton-${idx}`} 
                            loading={true}
                            id={0}
                            name=""
                            image=""
                            subscribers=""
                            slug=""
                            price={0}
                            category={{ id: 0, name: "", icon: "" } as any}
                        />
                    ))}
                </div>
            );
        }

        // 2. Состояние "НИЧЕГО НЕ НАЙДЕНО"
        if (currentChannels.length === 0) {
            return (
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
            );
        }

        // 3. Состояние ДАННЫЕ ЕСТЬ (Показываем карточки)
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-5 mb-15">
                {currentChannels.map((channel: any, idx: number) => (
                    <ChannelCard key={channel.id || idx} {...channel} />
                ))}
            </div>
        );
    };

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
                <div className="flex justify-between items-center w-full">
                    {/* Счетчик (если грузится - показываем 0 или прочерк) */}
                    <p className="text-white whitespace-nowrap shrink-0">
                        {isCatalogLoading ? "..." : filteredChannels.length} каналов
                    </p>

                    <div className="flex items-center justify-end gap-3 flex-1 min-w-0 ml-4">
                        {/* Tags Swiper */}
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

                        {/* КНОПКА ФИЛЬТРАЦИИ */}
                        <div className="relative shrink-0">
                            <FilterButton 
                                // Блокируем кнопку пока грузится, если нужно
                                disabled={isCatalogLoading}
                                isActive={isFilterOpen || filterCategories.length > 0 || filterRangeIndex !== 0}
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className={isCatalogLoading ? "opacity-50 cursor-not-allowed" : ""}
                            />

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
                                            availableCategories={availableCategories}
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

                {/* Mobile Tags */}
                {filterCategories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4 min-[1025px]:hidden">
                        {filterCategories.map(cat => (
                            <TagItem key={cat} cat={cat} />
                        ))}
                    </div>
                )}
            </div>

            {/* --- СЕТКА ТОВАРОВ (Вызываем функцию рендера) --- */}
            {renderGridContent()}

            {/* --- КНОПКА ПОКАЗАТЬ ЕЩЕ (Скрываем при первичной загрузке) --- */}
            {!isCatalogLoading && hasMore && (
                <div className="flex justify-center">
                    <LinkButton 
                        onClick={handleShowMore}
                        loading={isMoreLoading}
                        type="button"
                    >
                        Смотреть еще
                    </LinkButton>
                </div>
            )}
        </section>
    )
}