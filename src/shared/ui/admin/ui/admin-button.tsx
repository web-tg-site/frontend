'use client'

import { cn } from "@/shared/utils"
import { AdminButtonProps } from "../types/admin-button.props"

const Spinner = () => (
    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
)

export const AdminButton = ({
    children,
    className,
    loading,
    disabled,
    variant = 'primary',
    type = 'button', // По дефолту button, чтобы не сабмитил форму случайно
    ...props
}: AdminButtonProps) => {
    return (
        <button
            type={type}
            disabled={disabled || loading}
            className={cn(
                // 1. БАЗА (Геометрия)
                "flex items-center justify-center",
                "px-4 py-2", // Дефолтные паддинги (маленькие, чтобы их легко перебивать)
                "rounded-xl border",
                "text-sm font-medium",
                
                // 2. ИНТЕРАКТИВ
                "transition-all duration-200",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                // active:scale-95 заменяет whileTap из framer-motion (эффект нажатия)
                "active:scale-95", 
                "cursor-pointer",

                // 3. ЦВЕТОВЫЕ СХЕМЫ
                variant === 'primary' 
                    ? "bg-white border-white/5 text-black hover:bg-white/90" 
                    : "bg-transparent border-white/10 text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/20",

                // 4. ВНЕШНИЕ СТИЛИ (Самый высокий приоритет)
                className
            )}
            {...props}
        >
            {loading ? <Spinner /> : children}
        </button>
    )
}