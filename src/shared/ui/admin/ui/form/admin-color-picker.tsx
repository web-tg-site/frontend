"use client"

import { useState, useRef, useEffect } from "react"
import { HexColorPicker } from "react-colorful"
import { motion, AnimatePresence } from "framer-motion"
import { Pipette, X } from "lucide-react"
import { cn } from "@/shared/utils"

interface AdminColorPickerProps {
    value: string;
    onChange: (value: string) => void;
    error?: string;
    className?: string;
    placeholder?: string;
}

// Пресеты цветов, чтобы пользователю было удобно выбирать
const PRESET_COLORS = [
    "#EF4444", // Red
    "#F97316", // Orange
    "#F59E0B", // Amber
    "#EAB308", // Yellow
    "#84CC16", // Lime
    "#22C55E", // Green
    "#10B981", // Emerald
    "#14B8A6", // Teal
    "#06B6D4", // Cyan
    "#0EA5E9", // Sky
    "#3B82F6", // Blue
    "#6366F1", // Indigo
    "#8B5CF6", // Violet
    "#A855F7", // Purple
    "#D946EF", // Fuchsia
    "#EC4899", // Pink
];

export const AdminColorPicker = ({
    value,
    onChange,
    error,
    className,
    placeholder = "Выберите цвет"
}: AdminColorPickerProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    // Закрытие при клике вне компонента
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }

    return (
        <div ref={containerRef} className={cn("w-full relative", className)}>
            {/* --- ТРИГГЕР (Поле ввода) --- */}
            <div className="relative">
                {/* Превью цвета слева */}
                <div 
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md border border-white/10 shadow-card cursor-pointer transition-transform hover:scale-105"
                    style={{ backgroundColor: value || 'transparent' }}
                    onClick={() => setIsOpen(!isOpen)}
                />

                <input
                    type="text"
                    value={value}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    onClick={() => setIsOpen(true)}
                    className={cn(
                        "w-full bg-[#282828] text-white outline-none transition-all duration-200",
                        "text-sm lg:text-base font-medium",
                        "pl-12 pr-10 py-3 lg:py-3.5", // Отступ слева под квадратик цвета
                        "rounded-xl border border-transparent",
                        "hover:bg-[#2F2F2F] focus:bg-[#2F2F2F] focus:border-white/10",
                        error && "border-red-500/40 bg-red-900/10",
                        isOpen && "rounded-b-none border-white/5"
                    )}
                />

                {/* Иконка пипетки справа */}
                <div 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#656565] cursor-pointer hover:text-white transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={18} /> : <Pipette size={18} />}
                </div>
            </div>

            {/* --- ВЫПАДАЮЩАЯ ПАНЕЛЬ --- */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full w-full z-50 bg-[#282828] rounded-b-xl border-t border-white/5 overflow-hidden p-4 shadow-card"
                    >
                        <div className="flex flex-col gap-4">
                            {/* 1. Сам Color Picker */}
                            <div className="flex justify-center [&_.react-colorful]:w-full [&_.react-colorful]:h-[150px]">
                                <HexColorPicker color={value} onChange={onChange} />
                            </div>

                            {/* 2. Пресеты цветов */}
                            <div>
                                <p className="text-xs text-gray-500 mb-2 font-medium">Быстрый выбор</p>
                                <div className="grid grid-cols-8 gap-2">
                                    {PRESET_COLORS.map((color) => (
                                        <div
                                            key={color}
                                            onClick={() => onChange(color)}
                                            className={cn(
                                                "w-full aspect-square rounded-md cursor-pointer border border-transparent hover:scale-110 transition-transform",
                                                value === color && "border-white ring-2 ring-white/20"
                                            )}
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- ОШИБКА --- */}
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