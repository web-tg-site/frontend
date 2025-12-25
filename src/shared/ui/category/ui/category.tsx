import { cn } from "@/shared/utils"
import { LucideIcon } from "lucide-react"

export const Category = ({
    title,
    color,
    icon: Icon,
    className=""
}: {
    title: string,
    color: string,
    icon: LucideIcon,
    className?: string
}) => {
    return (
        <div
            style={{
                backgroundColor: color
            }}
            className={cn("rounded-[57px] px-[15px] py-1.5 flex items-center gap-1 w-fit", className)}
        >
            <Icon 
                size={24}
                color="white"
            />

            <p className="font-medium text-white whitespace-nowrap">
                {title}
            </p>
        </div>
    )
}