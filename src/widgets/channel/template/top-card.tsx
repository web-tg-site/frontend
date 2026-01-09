import { cn } from "@/shared/utils";

export const TopCard = ({
    title,
    desc,
    className
}: {
    title: string,
    desc: string,
    className?: string
}) => {
    return (
        <div className={cn(
            "border border-white/10 bg-[#F9F9F9]/20 h-[121px] rounded-[28px] flex flex-col justify-center items-center text-center",
            "flex-1 min-w-0 px-1 sm:px-2 lg:flex-none lg:w-[150px] lg:px-3.5",
            className
        )}>
            <p className="text-white text-[16px] sm:text-[22px] lg:text-[28px] leading-none truncate w-full font-medium">
                {title}
            </p>

            <p className="text-white/60 text-[11px] sm:text-[14px] lg:text-[20px] leading-tight mt-1 truncate w-full">
                {desc}
            </p>
        </div>
    )
}