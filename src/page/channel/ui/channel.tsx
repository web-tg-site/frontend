'use client'

import { Headline, LinkButton, Text } from "@/shared/ui"
import { Category } from "@/shared/ui/category"
import { CrumbItem, Crumbs } from "@/shared/ui/crumbs"
import { Heart } from "lucide-react"
import { useCollections } from "@/shared/store/use-collections"
import { TopCard, LectureHall } from "@/widgets/channel"
import Image from "next/image"

const MOCK_ID = 1;

export const Channel = () => {
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

                <div className="flex flex-col lg:flex-row gap-[51px] items-start">
                    <div className="flex-1">
                        <Headline variant="h4" className="mb-7">
                            Критик в шёлковом халате
                        </Headline>

                        <Text className="text-white/70 mb-9">
                            Телеграм-канал о красоте без иллюзий и рекламы. Честные разборы бьюти-трендов, средств и процедур, эстетика ухода и ироничный взгляд на индустрию. Коротко, по делу и со вкусом
                        </Text>

                        <LinkButton 
                            className="text-[18px] h-11"
                            onClick={() => openModal(MOCK_ID)}
                        >
                            Добавить в подборку
                        </LinkButton>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0 overflow-x-auto max-w-full pb-2 lg:pb-0">
                        <TopCard 
                            title="200к"
                            desc="Подписчиков"
                        />

                        <TopCard 
                            title="20000р"
                            desc="Стоимость"
                        />

                        <Image 
                            width={150}
                            height={121}
                            className="rounded-[28px] h-[121px] w-[150px] object-cover shrink-0"
                            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=200&auto=format&fit=crop"
                            alt="Фото"
                        />
                    </div>
                </div>

            </div>
            <div className="grid grid-cols-1 gap-2.5">
                <LectureHall />
            </div>
        </section>
    )
}