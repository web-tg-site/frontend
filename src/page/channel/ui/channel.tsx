'use client'

import { Headline, LinkButton, Text } from "@/shared/ui"
import { Category } from "@/shared/ui/category"
import { CrumbItem, Crumbs } from "@/shared/ui/crumbs"
import { Heart } from "lucide-react"
import { useCollections } from "@/shared/store/use-collections"
import { LectureHall, Content, PriceAdd } from "@/widgets/channel"
import { ChannelHeaderCards } from "@/widgets/channel/ui/header-cards"

const MOCK_ID = 1;

export const Channel = ({
    id
}: {
    id: string
}) => {
    const openModal = useCollections((state) => state.openModal)
    
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
            label: 'Критик в шёлковом халате'
        }
    ]

    return (
        <section className="pt-[106px] pb-2.5">
            <div className="px-7.5 mb-16.5">
                <Crumbs items={crumbs} className="mb-8" />

                <Category 
                    icon={Heart}
                    title="Красота"
                    color="#FF383C"
                    className="mb-7"
                />

                <div className="flex gap-[51px] items-start">
                    <div className="flex-1">
                        <Headline variant="h4" className="mb-4 lg:mb-7">
                            Критик в шёлковом халате
                        </Headline>

                        <div className="hidden max-[500px]:block mb-4">
                            <ChannelHeaderCards 
                                subs="200к"
                                coast="20 000 ₽"
                                image="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=200&auto=format&fit=crop"
                            />
                        </div>

                        <Text className="text-white/70 lg:mb-9 mb-7">
                            Телеграм-канал о красоте без иллюзий и рекламы. Честные разборы бьюти-трендов, средств и процедур, эстетика ухода и ироничный взгляд на индустрию. Коротко, по делу и со вкусом
                        </Text>

                        <LinkButton 
                            className="text-[18px] h-11"
                            onClick={() => openModal(MOCK_ID)}
                        >
                            Добавить в подборку
                        </LinkButton>
                    </div>

                    <div className="block max-[500px]:hidden">
                        <ChannelHeaderCards 
                            subs="200к"
                            coast="20 000 ₽"
                            image="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=200&auto=format&fit=crop"
                        />
                    </div>
                </div>

            </div>
            <div className="grid grid-cols-1 gap-2.5">
                <LectureHall />

                <Content />

                <PriceAdd />
            </div>
        </section>
    )
}