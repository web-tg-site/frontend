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
            <p className="text-[22px] leading-[110%] text-black/60 max-h-18">
                {text}
            </p>
        </GridCard>
    )
}