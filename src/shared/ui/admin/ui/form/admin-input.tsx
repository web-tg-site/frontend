import { forwardRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/shared/utils"
import { AdminInputProps } from "../../types/admin-input.props"

export const AdminInput = forwardRef<HTMLInputElement, AdminInputProps>(
    ({ className, error, icon, onIconClick, variant = 'standard', ...props }, ref) => { // 👈 variant по умолчанию 'standard'
        return (
            <div className="w-full flex flex-col">
                <div className="relative w-full">
                    <input
                        ref={ref}
                        className={cn(
                            // ==========================================
                            // 1. БАЗОВЫЕ СТИЛИ (Общие для всех)
                            // ==========================================
                            "w-full outline-none transition-all duration-300",
                            "text-white placeholder:text-[#656565] font-medium",
                            "text-sm lg:text-base",
                            "caret-white",
                            
                            // Отступы (учитываем иконку)
                            "pl-4 py-3 lg:pl-5 lg:py-3.5",
                            icon ? "pr-10 lg:pr-12" : "pr-4 lg:pr-5",

                            // ==========================================
                            // 2. ВАРИАНТЫ (VARIANTS)
                            // ==========================================
                            
                            // --- STANDARD (По умолчанию) ---
                            // Светло-серый фон (#282828), стандартный бордер
                            variant === 'standard' && [
                                "bg-[#282828] border border-transparent rounded-xl",
                                "hover:border-white/10 hover:bg-[#2F2F2F]",
                                "focus:border-white/20 focus:bg-[#2F2F2F]",
                                // Autofill фикс для цвета #282828
                                "[&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_#282828]"
                            ],

                            // --- ALTERNATIVE (Как на скрине) ---
                            // Более темный/плоский фон (#1E1E1E), более сильное скругление
                            variant === 'alternative' && [
                                "bg-[#1E1E1E] border border-transparent rounded-[16px]", // Чуть больше скругление
                                "hover:bg-[#252525]", // Легкое осветление при наведении
                                "focus:bg-[#252525] focus:border-white/10",
                                // Autofill фикс для цвета #1E1E1E
                                "[&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_#1E1E1E]"
                            ],

                            // ==========================================
                            // 3. ОБЩИЕ ФИКСЫ АВТОЗАПОЛНЕНИЯ
                            // ==========================================
                            "[&:-webkit-autofill]:[-webkit-text-fill-color:#fff]",
                            "[&:-webkit-autofill]:transition-[background-color] [&:-webkit-autofill]:duration-[5000s]",

                            // ==========================================
                            // 4. СОСТОЯНИЕ ОШИБКИ (Перекрывает всё)
                            // ==========================================
                            error && "border-red-500/40 text-red-100 placeholder:text-red-200/40 bg-red-900/10 focus:border-red-500/60",

                            className
                        )}
                        {...props}
                    />

                    {icon && (
                        <div
                            onClick={onIconClick}
                            className={cn(
                                "absolute right-3.5 top-1/2 -translate-y-1/2 text-[#656565] transition-colors",
                                onIconClick ? "cursor-pointer hover:text-white" : "pointer-events-none"
                            )}
                        >
                            {icon}
                        </div>
                    )}
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

AdminInput.displayName = "AdminInput"