import { cn } from "@/shared/utils";
import { LandingBlockProps } from "../types";

export const LandingBlock = ({
    children,
    variant = 'light',
    px = 0,
    py = 0
}: LandingBlockProps) => {
    return (
        <section className={cn(variant === 'dark' ? 'bg-secondary border border-white/10 ' : 'bg-white', 'rounded-2xl', px ? `px-${px}` : '', py ? `py-${py}` : '')}>
            {children}
        </section>
    )
}