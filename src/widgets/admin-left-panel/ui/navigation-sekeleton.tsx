import { cn } from "@/shared/utils";

export const NavigationSkeleton = ({ className }: { className?: string }) => {
    return (
        <div className={cn("w-full rounded-full p-1 flex items-center gap-2.5 bg-white/5 animate-pulse select-none", className)}>
            <div className="w-9.5 h-9.5 rounded-full bg-white/10 shrink-0" />
            <div className="h-3.5 w-32 bg-white/10 rounded-md" />
        </div>
    )
}