'use client'

import { Headline, LinkButton, Loading, Text, Title } from "@/shared/ui"
import { Category } from "@/shared/ui/category"
import { CrumbItem, Crumbs } from "@/shared/ui/crumbs"
import { useCollections } from "@/shared/store/use-collections"
import { LectureHall, Content, PriceAdd } from "@/widgets/channel"
import { ChannelHeaderCards } from "@/widgets/channel/ui/header-cards"
import { useGetChannel } from "../api/use-get-channel"
import { notFound } from "next/navigation"

export const Channel = ({
    slug
}: {
    slug: string
}) => {
    const openModal = useCollections((state) => state.openModal);
    const { data: channel, isLoading } = useGetChannel(slug);

    if (isLoading) {
        return (
            <Loading 
                title="Загрузка канала..."
            />
        )
    }

    if (!channel) {
        return notFound();
    }
    
    const crumbs: CrumbItem[] = [
        {
            label: 'Главная',
            href: '/'
        },
        {
            label: 'Каталог',
            href: '/catalog'
        },
        {
            label: channel.name
        }
    ]

    return (
        <section className="pt-[106px] pb-2.5">
            <div className="px-7.5 mb-16.5">
                <Crumbs items={crumbs} className="mb-8" />

                <Category 
                    icon={channel.category.icon}
                    title={channel.category.name}
                    color={channel.category.color}
                    className="mb-7"
                />

                <div className="flex gap-[51px] items-start">
                    <div className="flex-1">
                        <Headline variant="h4" className="mb-4 lg:mb-7">
                            {channel.name}
                        </Headline>

                        <div className="hidden max-[500px]:block mb-4">
                            <ChannelHeaderCards 
                                subs={channel.subscribers}
                                coast={channel.coast}
                                image={channel.image}
                            />
                        </div>

                        <Text className="text-white/70 lg:mb-9 mb-7">
                            {channel.description}
                        </Text>

                        <LinkButton 
                            className="text-[18px] h-11"
                            onClick={() => openModal(channel.id, channel.image)}
                        >
                            Добавить в подборку
                        </LinkButton>
                    </div>

                    <div className="block max-[500px]:hidden">
                        <ChannelHeaderCards 
                            subs={channel.subscribers}
                            coast={channel.coast}
                            image={channel.image}
                        />
                    </div>
                </div>

            </div>
            <div className="grid grid-cols-1 gap-2.5">
                <LectureHall 
                    activePercentage={channel.lectureHall.activePercentage}
                    statsData={channel.lectureHall.statsData}
                    interestsItems={channel.lectureHall.interestsItems}
                    geographyItems={channel.lectureHall.geographyItems}
                    consumption={channel.lectureHall.frequency}
                    howRead={channel.lectureHall.howRead}
                    reaction={channel.lectureHall.reaction}
                    frequency={channel.lectureHall.frequency}
                />

                <Content
                    {...channel.content}
                />

                <PriceAdd 
                    price={channel.priceAdd}
                />
            </div>
        </section>
    )
}