import { cn } from "@/shared/utils"

export const WeCard = ({
    children,
    className = ""
}: {
    children: React.ReactNode,
    className?: string
}) => {
    return (
        <div className={cn("bg-[#F9F9F9] rounded-xl h-full", className)}>
            {children}
        </div>
    )
}