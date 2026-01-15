'use client'

import { motion } from "framer-motion"
import { cn } from "@/shared/utils"
import { AdminButtonProps } from "../types/admin-button.props"

const Spinner = () => (
    <svg 
        className="animate-spin h-5 w-5 text-black" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
    >
        <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
        />
        <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
    </svg>
)

export const AdminButton = ({
    children,
    className,
    loading,
    disabled,
    ...props
}: AdminButtonProps) => {
    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            disabled={disabled || loading}
            className={cn(
                "flex items-center justify-center w-full",
                "bg-white border border-white/5",
                "text-black text-sm font-medium text-center",
                "p-3 rounded-xl",
                "transition-all duration-300",
                "hover:bg-white/90",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "cursor-pointer",
                className
            )}
            {...props}
        >
            {loading ? <Spinner /> : children}
        </motion.button>
    )
}