"use client"

import { useEffect, useState } from "react"
import { notFound } from "next/navigation"

import { useCollections } from "@/shared/store/use-collections"
import { Headline, Numbers } from "@/shared/ui"
import { ChannelCard } from "@/entities/channel"
import { SendApplicationForm } from "@/features/send-application-form"
import { Order } from "@/widgets/order"

// 👇 Импортируем новый хук
import { useChannelsByIds } from "../api/use-channels-by-ids"

export const MyCollections = ({
    id
}: {
    id: string
}) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    // 1. Получаем коллекцию из стора (localStorage)
    const collection = useCollections((state) => 
        state.collections.find((c) => c.id === id)
    )

    // 2. Достаем ID каналов (если коллекции нет — пустой массив, чтобы хук не ругался)
    const channelIds = collection?.channelIds || [];

    // 3. Запрашиваем РЕАЛЬНЫЕ данные по этим ID
    const { data: channels = [], isLoading } = useChannelsByIds(channelIds);

    // Если не смонтированы — пустота
    if (!isMounted) return null

    // Если коллекция не найдена в localStorage — 404
    if (!collection) {
        notFound()
    }

    // Хелпер для склонения (канал, канала, каналов)
    const getChannelEnding = (count: number) => {
        if (count % 10 === 1 && count % 100 !== 11) return '';
        if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) return 'а';
        return 'ов';
    }

    return (
        <section className="px-[30px] pt-[106px] pb-20">
            <div className="flex justify-between items-end mb-12">
                <Headline variant="h1">
                    {collection.name}
                </Headline>

                <Numbers variant="2">
                    {/* Показываем кол-во из стора (оно мгновенное) или из загруженных данных */}
                    {channelIds.length} канал{getChannelEnding(channelIds.length)}
                </Numbers>
            </div>

            <div className="lg:grid lg:grid-cols-3 block gap-4 items-start">
                <div className="col-span-2 grid md:grid-cols-2 grid-cols-1 lg:gap-4 gap-3 mb-3">
                    
                    {/* 4. Состояние загрузки */}
                    {isLoading && (
                        Array.from({ length: channelIds.length || 3 }).map((_, idx) => (
                            <ChannelCard 
                                key={`skeleton-${idx}`}
                                loading={true}
                                // Заглушки для TS
                                id={0} name="" slug="" image="" subscribers="" price={0} category={{} as any}
                                socialType="telegram"
                            />
                        ))
                    )}

                    {/* 5. Реальные данные */}
                    {!isLoading && channels.map((channel: any) => (
                        <ChannelCard 
                            key={channel.id}
                            {...channel}
                            haveAddButton={false}
                            // Можно добавить кнопку удаления из коллекции, если нужно
                        />
                    ))}

                    {/* Если каналов нет */}
                    {!isLoading && channels.length === 0 && (
                        <div className="col-span-2 text-[#9D9D9D] py-10 text-center border border-[#2A2A2A] rounded-xl">
                            В этой подборке пока нет каналов
                        </div>
                    )}
                </div>

                <div className="col-span-1 sticky top-[120px] hidden lg:block">
                    <SendApplicationForm className="py-8" />
                </div>

                <div className="block lg:hidden">
                    <Order />
                </div>
            </div>
        </section>
    )
}