import { cn } from "@/shared/utils";
import { AdminButtonProps } from "../types/admin-button.props";

export const AdminInlineButton = ({
    children,
    className,
    type = 'button',
    ...props
}: AdminButtonProps) => {
    return (
        <button 
            className={cn("text-white/60 underline underline-offset-3 cursor-pointer transition duration-300 ease-in-out hover:text-white text-[12px]", className)}
            {...props}
        >
            {children}
        </button>
    )
}