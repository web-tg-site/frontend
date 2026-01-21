import { cn } from "@/shared/utils"
import { AdminCard } from "../admin-card"

export const AdminFormCard = ({
    title,
    className="",
    children
}: {
    title?: string,
    className?: string,
    children: React.ReactNode
}) => {
    return (
        <AdminCard className={cn("p-4", className)}>
            {title && (
                <p className="mb-5 text-white text-[20px] leading-[90%]">
                    {title}
                </p>
            )}

            {children}
        </AdminCard>
    )
}