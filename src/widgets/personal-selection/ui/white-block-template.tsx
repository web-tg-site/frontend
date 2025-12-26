import { cn } from "@/shared/utils"

export const WhiteBlockTemplate = ({
    children,
    className
}: {
    children: React.ReactNode,
    className?: string
}) => {
    return (
        <div
            className={cn(
                "bg-[#f9f9f9] rounded-[20px] py-7 px-6",
                "shadow-[0px_-4px_8px_0px_rgba(0,0,0,0.06),0px_0px_4px_0px_rgba(0,0,0,0.04)]",
                className
            )}
        >
            {children}
        </div>
    )
}