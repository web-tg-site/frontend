import { forwardRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/shared/utils"
import { AdminInputProps } from "../../types/admin-input.props"

export const AdminInput = forwardRef<HTMLInputElement, AdminInputProps>(
    ({ className, error, ...props }, ref) => {
        return (
            <div className="w-full flex flex-col">
                <input
                    ref={ref}
                    className={cn(
                        // 1. Базовая форма
                        "w-full rounded-xl border outline-none transition-all duration-300",

                        // 2. Цвета (Фон и Границы)
                        // Используем цвет фона #282828 (bg-background) или чуть темнее,
                        // чтобы инпут выделялся внутри карточки (#212121).
                        "bg-[#282828] border-transparent",
                        
                        // Ховер и Фокус
                        "hover:border-white/10 hover:bg-[#2F2F2F]",
                        "focus:border-white/20 focus:bg-[#2F2F2F]",

                        // 3. Типографика
                        "text-white placeholder:text-[#656565] font-medium",
                        "text-sm lg:text-base",

                        // 4. Отступы (Адаптивные)
                        "px-4 py-3 lg:px-5 lg:py-3.5",

                        // 5. ФИКС АВТОЗАПОЛНЕНИЯ (AUTOFILL) для темной темы
                        "caret-white",
                        "[&:-webkit-autofill]:[-webkit-text-fill-color:#fff]",
                        // Важно: заливаем тенью цвета фона (#282828), чтобы не было белого пятна
                        "[&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_#282828]",
                        "[&:-webkit-autofill]:transition-[background-color] [&:-webkit-autofill]:duration-[5000s]",

                        // 6. Состояние ошибки
                        error && "border-red-500/40 text-red-100 placeholder:text-red-200/40 bg-red-900/10 focus:border-red-500/60",

                        className
                    )}
                    {...props}
                />

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