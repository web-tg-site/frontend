import { forwardRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/shared/utils"
import { CheckMark } from "../icons/check-mark"

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string
    children: React.ReactNode
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, error, children, ...props }, ref) => {
        return (
            <div className={cn("flex flex-col", className)}>
                {/* 1. Изменили items-start на items-center для вертикального центрирования */}
                <label className="group flex items-center gap-3 cursor-pointer select-none relative">
                    <input
                        type="checkbox"
                        ref={ref}
                        className="peer sr-only"
                        {...props}
                    />

                    <div className={cn(
                        "relative flex h-6 w-6 shrink-0 items-center justify-center rounded-[8px] border transition-all duration-300",
                        "border-white/20 bg-white/5",
                        "group-hover:border-white/40 group-hover:bg-white/10",
                        "peer-checked:bg-white/20 peer-checked:border-white",
                        "peer-focus-visible:ring-2 peer-focus-visible:ring-white/50 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-transparent",
                        
                        // Логика отображения иконки внутри (через родителя)
                        "peer-checked:[&_svg]:scale-100 peer-checked:[&_svg]:opacity-100",
                        
                        error && "border-red-400/50 bg-red-500/10 peer-checked:bg-red-500/20 peer-checked:border-red-400"
                    )}>
                        <CheckMark className={cn(
                            "text-white transition-all duration-300",
                            "opacity-0 scale-50",
                            error && "text-red-200"
                        )} />
                    </div>

                    {/* 2. Убрали pt-0.5, теперь текст центрируется автоматически flex-ом */}
                    <span className={cn(
                        "text-sm font-medium leading-tight text-white/80 transition-colors",
                        "group-hover:text-white",
                        error && "text-red-200"
                    )}>
                        {children}
                    </span>
                </label>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, y: -5 }}
                            animate={{ height: "auto", opacity: 1, y: 0 }}
                            exit={{ height: 0, opacity: 0, y: -5 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30, mass: 1 }}
                            className="overflow-hidden ml-[34px]"
                        >
                            <p className="pt-1 text-xs text-red-300 font-medium">
                                {error}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        )
    }
)

Checkbox.displayName = "Checkbox"