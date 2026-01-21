import { cn } from "@/shared/utils";
import { AdminButtonProps } from "../types/admin-button.props";
import { LeftArrow } from "../icons/left-arrow";

export const AdminBackButton = ({
    className,
    type = 'button',
    ...props
}: AdminButtonProps) => {
    return (
        <button
            className={cn("flex items-center gap-3.5 cursor-pointer", className)}
            {...props}
        >
            <LeftArrow />

            <p className="text-white">
                Вернуться назад
            </p>
        </button>
    )
}