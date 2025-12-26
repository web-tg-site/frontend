import { cn } from "@/shared/utils"
import { FC, SVGProps } from "react"

export const PriceTemplate = ({
    icon: Icon,
    price,
    title
}: {
    icon: FC<SVGProps<SVGSVGElement>>, 
    price: string,
    title: string
}) => {
    return (
        <div
            className={cn(
                "rounded-[20px] bg-[#f9f9f9] p-8 flex items-center gap-6.5",
                "shadow-[0px_3.3px_6.6px_0px_rgba(0,0,0,0.06),0px_0px_3.3px_0px_rgba(0,0,0,0.04)]"
            )}
        >
            <div 
                className={cn(
                    "w-23.5 h-23.5 rounded-[20px] flex justify-center items-center bg-white",
                    "shadow-[0px_3.3px_6.6px_0px_rgba(0,0,0,0.06),0px_0px_3.3px_0px_rgba(0,0,0,0.04)]"
                )}
            >
                {/* Задаем точный размер 63x63 и цвет */}
                <Icon className="w-[63px] h-[63px] text-black" /> 
            </div>

            <div>
                <p className="text-[30px] text-black mb-2.5 leading-[90%]">
                    {title}
                </p>

                <p className="text-[30px] font-semibold leading-[90%]">
                    {price}
                </p>
            </div>
        </div>
    )
}