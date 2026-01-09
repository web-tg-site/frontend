import { cn } from "@/shared/utils"
import { BURGER_LINE_CLASS } from "../config"

export const BurgerMenu = () => {
    return (
        <div className="block lg:hidden">
            <div className="flex flex-col h-11.5 w-11.5 justify-center items-center bg-white/30 rounded-full">
                <span className={BURGER_LINE_CLASS}></span>
                <span className={cn(BURGER_LINE_CLASS, "my-1")}></span>
                <span className={BURGER_LINE_CLASS}></span>
            </div>
        </div>
    )
}