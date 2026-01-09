import { Title } from "@/shared/ui"
import { cn } from "@/shared/utils"

export const GridCard = ({
    title,
    children,
    className=""
}: {
    title: string,
    children: React.ReactNode,
    className?: string
}) => {
    return (
        <div
            className={cn(
                "p-7 bg-[#F9F9F9] rounded-[20px]",
                "shadow-[-2px_-2px_2px_0px_rgba(0,0,0,0.08),0px_0px_3px_0px_rgba(0,0,0,0.02)]",
                className
            )}
        >
            <Title variant="h2" className="lg:mb-4.5 mb-2.5 text-black">
                {title}
            </Title>

            <div>
                {children}
            </div>
        </div>
    )
}