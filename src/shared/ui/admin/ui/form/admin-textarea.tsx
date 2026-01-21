import { forwardRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/shared/utils"
import { AdminTextareaProps } from "../../types/admin-textarea.props"

export const AdminTextarea = forwardRef<HTMLTextAreaElement, AdminTextareaProps>(
    ({ className, error, variant = 'standard', ...props }, ref) => {
        return (
            <div className="w-full flex flex-col">
                <div className="relative w-full">
                    <textarea
                        ref={ref}
                        className={cn(
                            // ==========================================
                            // 1. БАЗОВЫЕ СТИЛИ
                            // ==========================================
                            "w-full outline-none transition-all duration-300",
                            "text-white placeholder:text-[#656565] font-medium",
                            "text-sm lg:text-base",
                            "caret-white",
                            
                            // Стилизация скроллбара
                            "custom-scrollbar resize-none", // Убираем дефолтную растягивалку, добавляем кастомный скролл

                            // Отступы
                            "pl-4 py-3 lg:pl-5 lg:py-3.5 pr-4 lg:pr-5",
                            "min-h-[120px]", // Минимальная высота по умолчанию

                            // ==========================================
                            // 2. ВАРИАНТЫ (VARIANTS) - те же, что у Input
                            // ==========================================
                            
                            // --- STANDARD ---
                            variant === 'standard' && [
                                "bg-[#282828] border border-transparent rounded-xl",
                                "hover:border-white/10 hover:bg-[#2F2F2F]",
                                "focus:border-white/20 focus:bg-[#2F2F2F]",
                            ],

                            // --- ALTERNATIVE ---
                            variant === 'alternative' && [
                                "bg-[#1E1E1E] border border-transparent rounded-[16px]",
                                "hover:bg-[#252525]",
                                "focus:bg-[#252525] focus:border-white/10",
                            ],

                            // ==========================================
                            // 3. СОСТОЯНИЕ ОШИБКИ
                            // ==========================================
                            error && "border-red-500/40 text-red-100 placeholder:text-red-200/40 bg-red-900/10 focus:border-red-500/60",

                            className
                        )}
                        {...props}
                    />
                </div>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, y: -5 }}
                            animate={{ height: "auto", opacity: 1, y: 0 }}
                            exit={{ height: 0, opacity: 0, y: -5 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30, mass: 1 }}
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
)

AdminTextarea.displayName = "AdminTextarea"