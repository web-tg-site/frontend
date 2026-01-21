import { cn } from "@/shared/utils"
import { DynamicIcon } from "../../dynamic-icon"

export const Category = ({
    title,
    color,
    icon,
    className=""
}: {
    title: string,
    color: string,
    icon: string,
    className?: string
}) => {
    return (
        <div
            style={{
                backgroundColor: color
            }}
            className={cn("rounded-[57px] px-[15px] py-1.5 flex items-center gap-1 w-fit", className)}
        >
            <DynamicIcon
                name={icon}
                size={24}
                color="white"
            />

            <p className="font-medium text-white whitespace-nowrap">
                {title}
            </p>
        </div>
    )
}