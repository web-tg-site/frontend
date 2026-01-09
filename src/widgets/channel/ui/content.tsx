import { LandingBlock, Title } from "@/shared/ui"
import { FormatCard } from "../cards/content"
import { StatsCard } from "../cards/content/stats-card"

const items = [
    "Авторские тексты",
    "Аналитика и разборы",
    "Короткие наблюдения",
    "Визуал в минималистичном стиле",
    "Ироничные комментарии к трендам",
]

export const Content = () => {
    return (
        <LandingBlock className="py-8 px-7.5">
            <Title className="mb-8 text-black">
                Контент
            </Title>

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-2.5">
                <FormatCard 
                    items={items}
                />

                <StatsCard 
                />
            </div>
        </LandingBlock>
    )
}