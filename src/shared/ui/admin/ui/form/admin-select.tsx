"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Loader2, X } from "lucide-react" // Добавили иконку X
import { cn } from "@/shared/utils"
import { AdminSelectProps } from "../../types/admin-select.props"

export const AdminSelect = ({
    value,
    onChange,
    options,
    placeholder = "Выбрать...",
    variant = "standard",
    error,
    className,
    disabled,
    isLoading
}: AdminSelectProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const selectedLabel = options.find((opt) => opt.value === value)?.label

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleSelect = (val: string | number) => {
        onChange(val)
        setIsOpen(false)
    }

    // Функция очистки
    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation(); // Чтобы не открывался/закрывался дропдаун
        onChange(null);      // Сбрасываем значение
    }

    const isAlternative = variant === "alternative"
    const bgColor = isAlternative ? "bg-[#1E1E1E]" : "bg-[#282828]"
    const radius = isAlternative ? "rounded-[16px]" : "rounded-xl"
    const triggerRadius = isOpen ? (isAlternative ? "rounded-t-[16px] rounded-b-none" : "rounded-t-xl rounded-b-none") : radius
    const isDisabled = disabled || isLoading;

    return (
        <div 
            ref={containerRef} 
            className={cn("w-full flex flex-col relative", className)}
        >
            <div
                onClick={() => !isDisabled && setIsOpen(!isOpen)}
                className={cn(
                    "w-full flex items-center justify-between outline-none transition-all duration-200 select-none",
                    "text-sm lg:text-base font-medium",
                    "px-4 py-3 lg:px-5 lg:py-3.5",
                    "border border-transparent",
                    bgColor,
                    !isOpen && !isDisabled && (isAlternative ? "hover:bg-[#252525]" : "hover:bg-[#2F2F2F]"),
                    triggerRadius,
                    error && "border-red-500/40 bg-red-900/10",
                    isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                )}
            >
                <span className={cn(
                    !selectedLabel ? "text-[#656565]" : "text-white"
                )}>
                    {isLoading ? "Загрузка..." : (selectedLabel || placeholder)}
                </span>

                <div className="flex items-center gap-2">
                    {/* Кнопка очистки: показываем только если выбрано значение, не загрузка и не disabled */}
                    {selectedLabel && !isLoading && !disabled && (
                        <div 
                            onClick={handleClear}
                            className="p-0.5 rounded-full hover:bg-white/10 text-[#656565] hover:text-white transition-colors cursor-pointer"
                        >
                            <X size={16} />
                        </div>
                    )}

                    {isLoading ? (
                        <Loader2 size={16} className="text-white animate-spin" />
                    ) : (
                        <ChevronDown 
                            size={16} 
                            className={cn(
                                "text-[#656565] transition-transform duration-300",
                                isOpen && "rotate-180 text-white"
                            )} 
                        />
                    )}
                </div>
            </div>

            <AnimatePresence>
                {isOpen && !isDisabled && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1 }}
                        className={cn(
                            "absolute left-0 top-full w-full z-50 overflow-hidden",
                            bgColor,
                            isAlternative ? "rounded-b-2xl rounded-t-none" : "rounded-b-xl rounded-t-none",
                            "border-t border-white/5"
                        )}
                    >
                        <div className="max-h-90 overflow-y-auto custom-scrollbar flex flex-col">
                            {options.map((option) => (
                                <div
                                    key={option.value}
                                    onClick={() => handleSelect(option.value)}
                                    className={cn(
                                        "px-4 py-3 cursor-pointer text-sm lg:text-base transition-colors duration-200",
                                        "text-[#656565]",
                                        "hover:bg-white hover:text-black",
                                        value === option.value && "bg-white text-black font-medium"
                                    )}
                                >
                                    {option.label}
                                </div>
                            ))}
                            {options.length === 0 && (
                                <div className="px-4 py-3 text-[#656565] text-sm text-center">
                                    Нет данных
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
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