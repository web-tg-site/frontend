import { forwardRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/shared/utils"

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, error, ...props }, ref) => {
        return (
            <div className="w-full flex flex-col">
                <input
                    ref={ref}
                    className={cn(
                        // 1. Базовая форма и фон
                        "w-full rounded-full border bg-white/10 px-6 py-4 outline-none transition-all duration-300",
                        
                        // 2. Типографика
                        "text-white placeholder:text-white/60 text-base font-medium",
                        
                        // 3. Границы и интерактивность
                        "border-white/20 hover:border-white/40 hover:bg-white/15",
                        "focus:border-white focus:bg-white/20",
                        
                        // 4. ФИКС АВТОЗАПОЛНЕНИЯ (AUTOFILL)
                        // Делаем курсор белым
                        "caret-white",
                        // Форсируем белый цвет текста при автозаполнении
                        "[&:-webkit-autofill]:[-webkit-text-fill-color:#fff]",
                        // Делаем "тень" прозрачной (иногда помогает от фона)
                        "[&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_transparent]",
                        // Главный трюк: замедляем смену фона на 5000 секунд, чтобы он оставался прозрачным
                        "[&:-webkit-autofill]:transition-[background-color] [&:-webkit-autofill]:duration-[5000s]",
                        
                        // 5. Состояние ошибки
                        error && "border-red-400/50 text-red-100 placeholder:text-red-200/50 bg-red-500/10 focus:border-red-400",
                        
                        className
                    )}
                    {...props}
                />
                
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, y: -10 }}
                            animate={{ height: "auto", opacity: 1, y: 0 }}
                            exit={{ height: 0, opacity: 0, y: -10 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30, mass: 1 }}
                            className="overflow-hidden"
                        >
                            <p className="px-6 pt-1 text-xs text-red-300 font-medium ml-1">
                                {error}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        )
    }
)

Input.displayName = "Input"