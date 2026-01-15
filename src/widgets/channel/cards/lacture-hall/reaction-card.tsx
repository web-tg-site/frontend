import { GridCard } from "../../template/grid-card"

export const ReactionCard = ({
    text,
    className
}: {
    text: string,
    className?: string
}) => {
    return (
        <GridCard title="Реакция на рекламу" className={className}>
            <p className="lg:text-[22px] text-[16px] leading-[110%] text-black/60 min-[500px]:max-h-18">
                {text}
            </p>
        </GridCard>
    )
}