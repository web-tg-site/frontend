import { cn } from "@/shared/utils"
import { FIRST_VARIANT, SECOND_VARIANT } from "../../config/eye-template.config"
import { GridCard } from "../../template/grid-card"
import { StatsTemplate } from "../../template/stats-template"

interface StatsCardProps {
    overallCoverage: string; // Средний охват постов (например: "40к-50к")
    monthlyCoverage: string; // Средний охват в месяц (например: "1 млн - 1,2 млн")
    er: string;              // ER (например: "8 - 12 %")
}

export const StatsCard = ({
    overallCoverage,
    monthlyCoverage,
    er
}: StatsCardProps) => {
    return (
        <GridCard title="Статистика">
            <div className="grid max-[500px]:grid-cols-1 grid-cols-2 gap-2.5">
                <StatsTemplate 
                    eyes={FIRST_VARIANT}
                    text={overallCoverage}
                    title="Средний охват постов"
                />

                <StatsTemplate 
                    eyes={SECOND_VARIANT}
                    text={monthlyCoverage}
                    title="Средний охват в месяц"
                />

                <div className={cn(
                    "bg-white rounded-2xl p-4 flex justify-center w-full max-[500px]:col-span-1 col-span-2",
                    "shadow-[0px_4px_8px_0px_rgba(0,0,0,0.06),0px_0px_4px_0px_rgba(0,0,0,0.04)]"
                )}>
                    <p className="text-[22px] leading-[90%] text-black font-medium">
                        ER: {er}%
                    </p>
                </div>
            </div>
        </GridCard>
    )
}