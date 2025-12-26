import { cn } from "@/shared/utils"
import { FIRST_VARIANT, SECOND_VARIANT } from "../../config/eye-template.config"
import { GridCard } from "../../template/grid-card"
import { StatsTemplate } from "../../template/stats-template"

export const StatsCard = () => {
    return (
        <GridCard title="Статистика">
            <div className="grid grid-cols-2 gap-2.5">
                <StatsTemplate 
                    eyes={FIRST_VARIANT}
                    text="40к-50к"
                    title="Средний охват постов"
                />

                <StatsTemplate 
                    eyes={SECOND_VARIANT}
                    text="1 млн - 1,2 млн"
                    title="Средний охват в месяц"
                />

                <div className={cn(
                    "bg-white rounded-2xl p-4 flex justify-center w-full col-span-2",
                    "shadow-[0px_4px_8px_0px_rgba(0,0,0,0.06),0px_0px_4px_0px_rgba(0,0,0,0.04)]"
                )}>
                    <p className="text-[22px] leading-[90%] text-black font-medium">
                        ER: 8 - 12 % 
                    </p>
                </div>
            </div>
        </GridCard>
    )
}