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
                "rounded-[20px] bg-[#f9f9f9] flex items-center shadow-[0px_3.3px_6.6px_0px_rgba(0,0,0,0.06),0px_0px_3.3px_0px_rgba(0,0,0,0.04)]",
                // Мобилка: меньше отступы и гэп
                "p-5 gap-4",
                // Планшет+: чуть больше
                "sm:p-6 sm:gap-5",
                // Десктоп: оригинальные размеры
                "lg:p-8 lg:gap-6.5"
            )}
        >
            <div 
                className={cn(
                    "rounded-[20px] flex justify-center items-center bg-white shrink-0 shadow-[0px_3.3px_6.6px_0px_rgba(0,0,0,0.06),0px_0px_3.3px_0px_rgba(0,0,0,0.04)]",
                    // Мобилка: 64x64px
                    "w-16 h-16",
                    // Планшет: 80x80px
                    "sm:w-20 sm:h-20",
                    // Десктоп: ~94x94px (оригинал w-23.5)
                    "lg:w-23.5 lg:h-23.5"
                )}
            >
                <Icon className={cn(
                    "text-black transition-all",
                    // Адаптивный размер иконки
                    "w-8 h-8",
                    "sm:w-10 sm:h-10", 
                    "lg:w-[63px] lg:h-[63px]"
                )} /> 
            </div>

            <div className="flex flex-col justify-center min-w-0">
                <p className={cn(
                    "text-black mb-1 leading-[110%] break-words",
                    // Шрифт: 18px -> 24px -> 30px
                    "text-lg",
                    "sm:text-2xl",
                    "lg:text-[30px] lg:mb-2.5 lg:leading-[90%]"
                )}>
                    {title}
                </p>

                <p className={cn(
                    "font-semibold leading-[110%]",
                    // Шрифт цены чуть крупнее заголовка на мобилке для акцента
                    "text-xl",
                    "sm:text-2xl",
                    "lg:text-[30px] lg:leading-[90%]"
                )}>
                    {price}
                </p>
            </div>
        </div>
    )
}