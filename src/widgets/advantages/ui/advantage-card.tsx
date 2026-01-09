import { Numbers, Title } from "@/shared/ui/text"
import { AdvantageCardProps } from "../types/advantage-card.props"

export const AdvantageCard = ({
    text,
    num,
    color,
    empty = false
}: AdvantageCardProps) => {
    if (empty) {
        return (
            <div className="h-full lg:min-h-[336px] min-h-[200px] bg-transparent border border-white/20 rounded-[20px]" />
        )
    }

    return (
        <div className="rounded-[20px] w-full bg-white/15 p-5.5 h-full lg:min-h-[336px] min-h-[200px] flex flex-col justify-between items-start">
            <div
                style={{
                    backgroundColor: color
                }}
                className="lg:w-[54px] w-9 lg:h-[54px] h-9 rounded-full flex justify-center items-center shrink-0"
            >
                <Numbers variant="2" className="leading-none">
                    {num < 10 ? `0${num}` : num}
                </Numbers>
            </div>

            <Title variant="h3">
                {text}
            </Title>
        </div>
    )
}