import { GridCard } from "../../template/grid-card"

export const ConsumptionCard = ({
    text,
    className
}: {
    text: string,
    className?: string
}) => {
    return (
        <GridCard title="Формат потребления" className={className}>
            <p className="text-[22px] leading-[110%] text-black/60 max-h-24">
                {text}
            </p>
        </GridCard>
    )
}