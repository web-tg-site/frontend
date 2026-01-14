import { LandingBlock, Title } from "@/shared/ui"
import { ChannelEngagementCard, ConsumptionCard, FrequencyCard, GeographyCard, HowReadCard, Interests, ReactionCard } from "../cards/lacture-hall"

// interface LectureHall {
//     activePercentage: number,
//     statsData: {
//         likes: number,
//         comments: number,
//         reposts: number,
//     },
//     interestsItems: string[],
//     geographyItems: {
//         name: string,
//         percent: number
//     }[],
//     consumption: string,
//     howRead: string,
//     reaction: string,
//     frequency: string
// }

export const LectureHall = () => {
    const statsData = {
        likes: 40,
        comments: 25,
        reposts: 35
    }

    const interestsItems = [
        "Красота и уход",
        "Косметика и парфюмерия",
        "Осознанное потребление",
        "Эстетика и стиль жизни",
        "Бьюти-процедуры"
    ]

    const geographyItems = [
        { name: "Россия", percent: 76 },
        { name: "Снг", percent: 22 },
        { name: "Другое", percent: 2 }
    ]

    return (
        <LandingBlock className="py-8 px-7.5">
            <Title className="mb-8 text-black">
                Аудитория
            </Title>

            {/* 
               Контейнер:
               < 500px: flex-col (одна колонка)
               500-1024px: grid-cols-2 (две колонки для планшета)
               > 1024px: grid-cols-6 (оригинальная сложная сетка)
            */}
            <div className="flex flex-col gap-2.5 min-[500px]:grid min-[500px]:grid-cols-2 min-[500px]:items-start lg:grid-cols-6 lg:auto-rows-min">
                
                {/* 
                    ГРУППА 1 (Левая на планшете) 
                    На ПК (lg) становится 'contents', то есть исчезает как блок, 
                    а её дети встают в главную сетку grid-cols-6
                */}
                <div className="flex flex-col gap-2.5 w-full lg:contents">
                    {/* График: На ПК занимает 2 колонки и 2 ряда (слева) */}
                    <ChannelEngagementCard 
                        activePercentage={77} 
                        stats={statsData}
                        className="w-full lg:col-span-2 lg:row-span-2 lg:h-full"
                    />

                    {/* Интересы: На ПК занимает 2 колонки (центр верх) */}
                    <Interests 
                        items={interestsItems}
                        className="w-full lg:col-span-2 lg:h-full"
                    />
                </div>

                {/* 
                    ГРУППА 2 (Правая на планшете)
                    На ПК (lg) также исчезает (contents)
                */}
                <div className="flex flex-col gap-2.5 w-full lg:contents">
                    
                    {/* 
                        Обертка для 2-х карточек справа. 
                        На планшете это просто часть правой колонки.
                        На ПК занимает 2 колонки справа сверху.
                    */}
                    <div className="flex flex-col gap-2.5 lg:col-span-2 lg:h-full">
                        <ConsumptionCard 
                            text="Аудитория ценит авторский тон, экспертность и личное мнение, читает не «на бегу», а с вовлечением"
                            className="w-full lg:flex-1" // flex-1 чтобы растягивались равномерно
                        />
                        <HowReadCard 
                            text="Читают вдумчиво, часто возвращаются к постам и сохраняют полезные разборы"
                            className="w-full lg:flex-1"
                        />
                    </div>

                    {/* География: На ПК встает под интересами и правой колонкой (span-4) */}
                    <GeographyCard 
                        items={geographyItems}
                        className="w-full lg:col-span-4 lg:h-full"
                    />

                    {/* Реакция: На ПК нижний ряд слева (span-3) */}
                    <ReactionCard 
                        text="Лучше всего заходят нативные интеграции и личные рекомендации автора. Плохо воспринимаются агрессивные офферы и шаблонные рекламные форматы"
                        className="w-full lg:col-span-3 lg:h-full"
                    />

                    {/* Частота: На ПК нижний ряд справа (span-3) */}
                    <FrequencyCard 
                        text="Читают вечером или заходят несколько раз в день, как к «тихому личному источнику мнений»"
                        className="w-full lg:col-span-3 lg:h-full"
                    />
                </div>
            </div>
        </LandingBlock>
    )
}