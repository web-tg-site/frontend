import { LandingBlock, Title } from "@/shared/ui"
import { ChannelEngagementCard, ConsumptionCard, FrequencyCard, GeographyCard, HowReadCard, Interests, ReactionCard } from "../cards/lacture-hall"

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

            {/* Используем grid-cols-6 для гибкости */}
            <div className="grid grid-cols-6 gap-2.5">
                
                {/* 1. Левая колонка (Диаграмма) */}
                {/* col-span-2 (занимает 1/3 ширины) */}
                {/* row-span-2 (растягивается на 2 ряда в высоту, чтобы быть наравне с блоками справа) */}
                <ChannelEngagementCard 
                    activePercentage={77} 
                    stats={statsData}
                    className="col-span-2 row-span-2 h-full"
                />

                {/* 2. Центральная колонка (Интересы) */}
                {/* col-span-2 (занимает 1/3 ширины) */}
                <Interests 
                    items={interestsItems}
                    className="col-span-2 h-full"
                />

                {/* 3. Правая колонка (Две карточки друг под другом) */}
                {/* col-span-2 (занимает 1/3 ширины) */}
                <div className="col-span-2 flex flex-col gap-2.5 h-full">
                    <ConsumptionCard 
                        text="Аудитория ценит авторский тон, экспертность и личное мнение, читает не «на бегу», а с вовлечением"
                        className="h-full"
                    />

                    <HowReadCard 
                        text="Читают вдумчиво, часто возвращаются к постам и сохраняют полезные разборы"
                        className="h-full"
                    />
                </div>

                {/* 4. География (Второй ряд, под Интересами и Правой колонкой) */}
                {/* col-span-4 (занимает 2/3 ширины: центр + право) */}
                <GeographyCard 
                    items={geographyItems}
                    className="col-span-4"
                />

                {/* 5. Нижний ряд: Реакция */}
                {/* col-span-3 (занимает 50% ширины) */}
                <ReactionCard 
                    text="Лучше всего заходят нативные интеграции и личные рекомендации автора. Плохо воспринимаются агрессивные офферы и шаблонные рекламные форматы"
                    className="col-span-3 h-full"
                />

                {/* 6. Нижний ряд: Частота */}
                {/* col-span-3 (занимает 50% ширины) */}
                <FrequencyCard 
                    text="Читают вечером или заходят несколько раз в день, как к «тихому личному источнику мнений»"
                    className="col-span-3 h-full"
                />
            </div>
        </LandingBlock>
    )
}