"use client"

import { useEffect, useState } from "react"
import { CHANNEL_MOCK } from "@/page/catalog-page/config/channel-mock"
import { useCollections } from "@/shared/store/use-collections"
import { Headline, Numbers } from "@/shared/ui"
import { notFound } from "next/navigation"
import { ChannelCard } from "@/entities/channel"
import { SendApplicationForm } from "@/features/send-application-form"
import { Order } from "@/widgets/order"

export const MyCollections = ({
    id
}: {
    id: string
}) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const collection = useCollections((state) => 
        state.collections.find((c) => c.id === id)
    )

    if (!isMounted) return null

    if(!collection) {
        notFound()
    }

    const channelIds = collection.channelIds || []
    const channels = CHANNEL_MOCK.filter(channel => channelIds.includes(channel.id))

    return (
        <section className="px-[30px] pt-[106px] pb-20">
            <div className="flex justify-between items-end mb-12">
                <Headline variant="h1">
                    {collection.name}
                </Headline>

                <Numbers variant="2">
                    {channels.length} канал{channels.length % 10 === 1 && channels.length % 100 !== 11 ? '' : channels.length % 10 >= 2 && channels.length % 10 <= 4 && (channels.length % 100 < 10 || channels.length % 100 >= 20) ? 'а' : 'ов'}
                </Numbers>
            </div>

            {/* 👇 Общая сетка: 3 колонки. Слева 2 под карточки, справа 1 под форму */}
            <div className="lg:grid lg:grid-cols-3 block gap-4 items-start">
                <div className="col-span-2 grid md:grid-cols-2 grid-cols-1 lg:gap-4 gap-3 mb-3">
                    {channels.map((channel, idx) => (
                        <ChannelCard 
                            {...channel}
                            haveAddButton={false}
                            key={idx}
                        />
                    ))}
                    {channels.length === 0 && (
                        <div className="col-span-2 text-[#9D9D9D] py-10 text-center border border-[#2A2A2A] rounded-xl">
                            В этой подборке пока нет каналов
                        </div>
                    )}
                </div>

                <div className="col-span-1 sticky top-[120px] hidden lg:block">
                    <SendApplicationForm 
                        className="py-8"
                    />
                </div>

                <div className="block lg:hidden">
                    <Order />
                </div>
            </div>
        </section>
    )
}