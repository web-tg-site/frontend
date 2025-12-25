import { Filter } from "lucide-react"
import { cn } from "@/shared/utils"
import { ComponentProps } from "react"

interface FilterButtonProps extends ComponentProps<"button"> {
    isActive?: boolean
}

export const FilterButton = ({ className, isActive, ...props }: FilterButtonProps) => {
    return (
        <button
            type="button"
            className={cn(
                // 1. Базовые стили
                "cursor-pointer group inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full border border-white transition-all duration-300 outline-none select-none",
                "text-base font-medium",

                // 2. Логика цветов:
                // Если кнопка активна (isActive) -> Белый фон, черный текст.
                // Если не активна -> Прозрачный фон, белый текст.
                // НО: При наведении (hover) на неактивную кнопку, она красится так же, как активная.
                isActive 
                    ? "bg-white text-black" 
                    : "bg-transparent text-white hover:bg-white hover:text-black",
                
                className
            )}
            {...props}
        >
            <Filter className="w-5 h-5" strokeWidth={2} />
            
            <span>Фильтрация</span>
        </button>
    )
}