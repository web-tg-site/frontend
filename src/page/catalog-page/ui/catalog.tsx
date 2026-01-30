"use client"

import { useState, useMemo } from "react"
import { AnimatePresence } from "framer-motion"

import { useCatalog } from "../api/use-catalog";

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

import { Headline, LinkButton, Text } from "@/shared/ui"
import { ChannelCard } from "@/entities/channel"
import { SUBSCRIBER_RANGES } from "../config/filter-options"
import { BATCH_SIZE, SKELETON_COUNT } from "../config/catalog-config"
import { FilterButton } from "./filter-button"
import { FilterModal } from "./filter-modal"
import { SOCIALS } from "../config/socials";
import { SocialTypeButton } from "./social-type-button";
import { getNoun, parseSubscribers } from "../utils";

export const Catalog = () => {
    const { data, isLoading: isCatalogLoading } = useCatalog();
    
    const channels = data?.ichannels ?? [];
    const availableCategories = data?.category ?? [];

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filterCategories, setFilterCategories] = useState<string[]>([]);
    const [filterRangeIndex, setFilterRangeIndex] = useState<number>(0);
    const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
    
    const [selectedSocial, setSelectedSocial] = useState<string>('all');
    
    const [isMoreLoading, setIsMoreLoading] = useState(false);

    const filteredChannels = useMemo(() => {
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

            const socialMatch = selectedSocial === 'all' || channel.socialType === selectedSocial;
            
            return categoryMatch && subsMatch && socialMatch;
        });
    }, [channels, filterCategories, filterRangeIndex, isCatalogLoading, selectedSocial]);

    const currentChannels = filteredChannels.slice(0, visibleCount);
    const hasMore = visibleCount < filteredChannels.length;

    const handleSocialChange = (type: string) => {
        setSelectedSocial(type);
        setVisibleCount(BATCH_SIZE); 
    };

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

    const renderGridContent = () => {
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
                            socialType="telegram"
                            category={{ id: 0, name: "", icon: "" } as any}
                        />
                    ))}
                </div>
            );
        }

        if (currentChannels.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center py-20 text-white/50">
                    <p className="text-xl">Ничего не найдено</p>
                    <button 
                        onClick={() => {
                            setFilterCategories([]);
                            setFilterRangeIndex(0);
                            handleSocialChange('all');
                        }}
                        className="mt-4 text-primary hover:underline"
                    >
                        Сбросить фильтры
                    </button>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-5 mb-15">
                {currentChannels.map((channel: any, idx: number) => (
                    <ChannelCard key={channel.id || idx} {...channel} />
                ))}
            </div>
        );
    };

    return (
        <section className="mt-[106px] mb-[110px] md:px-7.5 px-2.5 relative overflow-x-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end md:mb-8.5 mb-6">
                <Headline className="mb-3 md:mb-0">Каталог</Headline>
                <Text variant="2" className="text-white/50 max-w-[309px]">
                    Подберите каналы по тематике, охвату и формату размещения
                </Text>
            </div>

            <div className="md:mb-7.5 mb-6 w-[calc(100%+3.75rem)] -ml-7.5">
                <Swiper
                    modules={[FreeMode, Mousewheel]}
                    slidesPerView="auto"
                    spaceBetween={8}
                    freeMode={true}
                    mousewheel={true}
                    className="w-full px-7.5! py-1!"
                >
                    {SOCIALS.map(social => (
                        <SwiperSlide key={social.type} className="w-auto!">
                            <SocialTypeButton 
                                {...social}
                                isSelected={selectedSocial === social.type}
                                onClick={() => handleSocialChange(social.type)}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="flex flex-col mb-9">
                <div className="flex justify-between items-center w-full">
                    <p className="text-white shrink-0 whitespace-nowrap md:whitespace-nowrap flex flex-col md:flex-row md:items-center">
                        <span>
                            {isCatalogLoading ? "..." : filteredChannels.length} {getNoun(filteredChannels.length, 'канал', 'канала', 'каналов')}
                        </span>
                        <span className="text-white/60 text-[10px] md:ml-1 block md:inline">
                            (каталог в процессе пополнения)
                        </span>
                    </p>

                    <div className="flex items-center justify-end gap-3 flex-1 min-w-0 ml-4">
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

                        <div className="relative shrink-0">
                            <FilterButton 
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

                {filterCategories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4 min-[1025px]:hidden">
                        {filterCategories.map(cat => (
                            <TagItem key={cat} cat={cat} />
                        ))}
                    </div>
                )}
            </div>

            {renderGridContent()}

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