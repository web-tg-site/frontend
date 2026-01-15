import { cn } from "@/shared/utils"
import { AdminCardProps } from "../types/admin-card.props"

export const AdminCard = ({
    children,
    className=""
}: AdminCardProps) => {
    return (
        <div className={cn("bg-card shadow-card rounded-[20px]", className)}>
            {children}
        </div>
    )
}