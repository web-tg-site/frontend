"use client"

import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/shared/utils"
import { AdminToggleGroupProps } from "../../types/admin-toggle-group.props"

export const AdminToggleGroup = ({
    value,
    onChange,
    options,
    error,
    className
}: AdminToggleGroupProps) => {
    return (
        <div className={cn("flex flex-col", className)}>
            <div className="flex items-center gap-2.5">
                {options.map((option) => {
                    const isSelected = value === option.value;
                    
                    return (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange(option.value)}
                            className={cn(
                                // Базовые стили
                                "min-w-[50px] h-[50px] px-3 rounded-xl flex items-center justify-center",
                                "text-lg font-medium transition-all duration-200 outline-none",
                                
                                // Состояния
                                isSelected 
                                    ? "bg-white text-[#1A1B1E] shadow-lg scale-105 cursor-default" // Активный: курсор дефолтный (уже выбрано)
                                    : "bg-[#282828] text-[#656565] hover:bg-[#2F2F2F] hover:text-[#888] cursor-pointer" // Неактивный: cursor-pointer
                            )}
                        >
                            <motion.span
                                whileTap={{ scale: 0.95 }}
                            >
                                {option.label}
                            </motion.span>
                        </button>
                    )
                })}
            </div>

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, y: -5 }}
                        animate={{ height: "auto", opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -5 }}
                        className="overflow-hidden"
                    >
                        <p className="pt-1.5 text-xs text-red-400 font-medium ml-1 px-4">
                            {error}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}