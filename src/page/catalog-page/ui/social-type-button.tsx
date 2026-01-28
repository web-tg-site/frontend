import { cn } from "@/shared/utils"
import { SocialTypeButtonProps } from "../types/social-type-button.props"

export const SocialTypeButton = ({
    text,
    isSelected,
    type,
    onClick
}: SocialTypeButtonProps) => {
    return (
        <button
            onClick={() => !isSelected && onClick(type)}
            className={cn(
                "py-2 flex items-center justify-center md:w-[180px] w-[100px] md:text-[18px] text-[14px] border border-white",
                "cursor-pointer rounded-[20px]",
                "transition-all duration-300 ease-in-out",
                isSelected 
                    ? "bg-white text-[#1A1A1A] cursor-default"
                    : "bg-transparent text-white hover:bg-white hover:text-[#1A1A1A]"
            )}
        >
            {text}
        </button>
    )
}