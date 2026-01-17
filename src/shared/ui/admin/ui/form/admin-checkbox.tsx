import { cn } from "@/shared/utils"

interface AdminCheckboxProps {
    checked: boolean
    onChange: (checked: boolean) => void
    label?: string
    className?: string
    disabled?: boolean
}

export const AdminCheckbox = ({
    checked,
    onChange,
    label,
    className,
    disabled
}: AdminCheckboxProps) => {
    return (
        <label className={cn(
            "flex items-center gap-3 cursor-pointer group select-none w-fit",
            disabled && "opacity-50 cursor-not-allowed",
            className
        )}>
            {/* Скрытый нативный чекбокс */}
            <input
                type="checkbox"
                className="hidden"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                disabled={disabled}
            />

            {/* Визуальный чекбокс */}
            <div className={cn(
                "relative flex items-center justify-center w-[22px] h-[22px]",
                "border-2 rounded-md transition-colors duration-200 bg-transparent",
                // Цвета рамки
                checked 
                    ? "border-white" 
                    : "border-[#656565] group-hover:border-white/60"
            )}>
                {/* Внутренний квадрат (индикатор) */}
                <div className={cn(
                    "w-2.5 h-2.5 bg-white rounded-sm",
                    "transition-all duration-200 ease-out",
                    checked 
                        ? "scale-100 opacity-100" 
                        : "scale-0 opacity-0"
                )} />
            </div>

            {/* Текст лейбла */}
            {label && (
                <span className={cn(
                    "text-sm lg:text-base font-medium transition-colors",
                    checked ? "text-white" : "text-[#E0E0E0] group-hover:text-white"
                )}>
                    {label}
                </span>
            )}
        </label>
    )
}