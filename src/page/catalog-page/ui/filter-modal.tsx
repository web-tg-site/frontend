"use client"

import { useState, useEffect } from "react"
import { motion, Variants } from "framer-motion"
import { cn } from "@/shared/utils"
import { SUBSCRIBER_RANGES } from "../config/filter-options"

// Иконка стрелки назад
const ChevronLeft = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m15 18-6-6 6-6" />
    </svg>
)

const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(false)
    useEffect(() => {
        const m = window.matchMedia(query)
        setMatches(m.matches)
        const onChange = () => setMatches(m.matches)
        m.addEventListener("change", onChange)
        return () => m.removeEventListener("change", onChange)
    }, [query])
    return matches
}

interface FilterModalProps {
    initialCategories: string[]
    initialSubscriberRangeIndex: number
    availableCategories: string[] // <--- НОВЫЙ ПРОП: Список доступных категорий с бэка
    onClose: () => void
    onSave: (categories: string[], rangeIndex: number) => void
}

export const FilterModal = ({
    initialCategories,
    initialSubscriberRangeIndex,
    availableCategories, // <--- Получаем здесь
    onClose,
    onSave
}: FilterModalProps) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories)
    const [selectedRangeIndex, setSelectedRangeIndex] = useState<number>(initialSubscriberRangeIndex)
    const isDesktop = useMediaQuery("(min-width: 1025px)")

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        )
    }

    const handleSave = () => {
        onSave(selectedCategories, selectedRangeIndex)
        onClose()
    }

    const backdropVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.18 } },
        exit: { opacity: 0, transition: { duration: 0.18 } }
    }

    const headerVariants: Variants = {
        hidden: { y: "-100%", opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 180, damping: 24 } },
        exit: { y: "-100%", opacity: 0, transition: { duration: 0.25 } }
    }

    const sheetVariants: Variants = {
        hidden: { y: "100%", opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 180, damping: 24 } },
        exit: { y: "100%", opacity: 0, transition: { duration: 0.25 } }
    }

    const popupVariants: Variants = {
        hidden: { opacity: 0, scale: 0.96, y: 8 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.18 } },
        exit: { opacity: 0, scale: 0.96, y: 8, transition: { duration: 0.15 } }
    }

    const Fields = ({ desktop }: { desktop: boolean }) => (
        <div className={cn(
            desktop 
                ? "flex gap-12" 
                : "flex-1 overflow-y-auto custom-scrollbar p-5 min-h-0"
        )}>
            <div className={desktop ? "flex-1" : "mb-8"}>
                <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">Категория</h3>
                <div className={cn(desktop ? "grid grid-cols-2 gap-x-4 gap-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar" : "grid grid-cols-1 gap-x-4 gap-y-3")}>
                    
                    {/* Кнопка "Все" */}
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className={cn("w-5 h-5 shrink-0 rounded-full border border-gray-300 flex items-center justify-center transition-colors",
                            selectedCategories.length === 0 && "bg-primary border-primary"
                        )}>
                            {selectedCategories.length === 0 && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <input type="checkbox" className="hidden" checked={selectedCategories.length === 0} onChange={() => setSelectedCategories([])} />
                        <span className="text-gray-600 group-hover:text-black transition-colors">Все</span>
                    </label>

                    {/* Рендерим категории из пропса availableCategories */}
                    {availableCategories.map(cat => {
                        const isSelected = selectedCategories.includes(cat)
                        return (
                            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                <div className={cn("w-5 h-5 shrink-0 rounded-full border border-gray-300 flex items-center justify-center transition-colors",
                                    isSelected && "bg-primary border-primary"
                                )}>
                                    {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                                </div>
                                <input type="checkbox" className="hidden" checked={isSelected} onChange={() => toggleCategory(cat)} />
                                <span className={cn("transition-colors", isSelected ? "font-medium text-black" : "text-gray-600 group-hover:text-black")}>
                                    {cat}
                                </span>
                            </label>
                        )
                    })}
                </div>
            </div>

            <div className={desktop ? "w-[300px]" : "w-full"}>
                <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">Кол-во подписчиков</h3>
                <div className="flex flex-col gap-3">
                    {SUBSCRIBER_RANGES.map((range, idx) => {
                        const isSelected = selectedRangeIndex === idx
                        return (
                            <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                                <div className={cn("w-5 h-5 shrink-0 rounded-full border border-gray-300 flex items-center justify-center transition-colors",
                                    isSelected && "bg-primary border-primary"
                                )}>
                                    {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                                </div>
                                <input type="radio" className="hidden" checked={isSelected} onChange={() => setSelectedRangeIndex(idx)} />
                                <span className={cn("transition-colors", isSelected ? "font-medium text-black" : "text-gray-600 group-hover:text-black")}>
                                    {range.label}
                                </span>
                            </label>
                        )
                    })}
                </div>
            </div>
            {!desktop && <div className="h-4 shrink-0" />}
        </div>
    )

    return (
        <>
            <motion.div
                key="mobile-overlay"
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed top-0 left-0 w-full h-[100dvh] z-[100] flex flex-col bg-black/60 backdrop-blur-sm min-[1025px]:hidden supports-[height:100dvh]:h-[100dvh]"
            >
                <motion.div variants={headerVariants} className="bg-white rounded-b-[20px] px-4 py-4 mb-2 flex items-center justify-between shadow-lg shrink-0 relative z-20">
                    <button onClick={onClose} className="p-1 -ml-1 text-black/60 hover:text-black">
                        <ChevronLeft />
                    </button>
                    <h2 className="text-lg font-semibold">Фильтрация</h2>
                    <div className="w-6" />
                </motion.div>

                <motion.div variants={sheetVariants} className="bg-white flex-1 rounded-t-[20px] shadow-2xl flex flex-col overflow-hidden relative z-10">
                    <Fields desktop={false} />
                    <div className="p-4 border-t border-gray-100 bg-white mt-auto shrink-0 relative z-20 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                        <button onClick={handleSave} className="w-full py-3.5 rounded-full bg-primary text-white font-semibold text-lg active:scale-[0.98] transition-transform">
                            Сохранить
                        </button>
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                key="desktop-popup"
                variants={popupVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="hidden min-[1025px]:block absolute top-16 right-0 z-50 w-[800px] bg-white rounded-[24px] p-8 shadow-2xl origin-top-right"
            >
                <Fields desktop />
                <div className="mt-8 flex justify-end gap-3">
                    <button onClick={onClose} className="px-8 py-3 rounded-full border border-primary text-primary font-medium hover:bg-primary/5 transition-colors">
                        Отмена
                    </button>
                    <button onClick={handleSave} className="px-8 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                        Сохранить
                    </button>
                </div>
            </motion.div>
        </>
    )
}