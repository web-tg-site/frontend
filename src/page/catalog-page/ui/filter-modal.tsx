"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/shared/utils"
import { CATEGORIES, SUBSCRIBER_RANGES } from "../config/filter-options"

interface FilterModalProps {
    initialCategories: string[]
    initialSubscriberRangeIndex: number
    onClose: () => void
    onSave: (categories: string[], rangeIndex: number) => void
}

export const FilterModal = ({ 
    initialCategories, 
    initialSubscriberRangeIndex, 
    onClose, 
    onSave 
}: FilterModalProps) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories);
    const [selectedRangeIndex, setSelectedRangeIndex] = useState<number>(initialSubscriberRangeIndex);

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev => 
            prev.includes(category) 
                ? prev.filter(c => c !== category) 
                : [...prev, category]
        );
    };

    const handleSave = () => {
        onSave(selectedCategories, selectedRangeIndex);
        onClose();
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-12 right-0 z-50 w-[800px] bg-white rounded-[24px] p-8 shadow-2xl origin-top-right text-black"
        >
            <div className="flex gap-12 mb-10">
                {/* ЛЕВАЯ КОЛОНКА: КАТЕГОРИИ */}
                <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">
                        Категория
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {/* Опция "Все" */}
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className={cn(
                                // ДОБАВИЛ shrink-0
                                "w-5 h-5 shrink-0 rounded-full border border-gray-300 flex items-center justify-center transition-colors",
                                selectedCategories.length === 0 && "bg-[#0088FF] border-[#0088FF]"
                            )}>
                                {selectedCategories.length === 0 && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                            <input 
                                type="checkbox" 
                                className="hidden" 
                                checked={selectedCategories.length === 0}
                                onChange={() => setSelectedCategories([])}
                            />
                            <span className="text-gray-600 group-hover:text-black transition-colors">Все</span>
                        </label>

                        {/* Список категорий */}
                        {CATEGORIES.map(cat => {
                            const isSelected = selectedCategories.includes(cat);
                            return (
                                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                     <div className={cn(
                                        // ДОБАВИЛ shrink-0
                                        "w-5 h-5 shrink-0 rounded-full border border-gray-300 flex items-center justify-center transition-colors",
                                        isSelected && "bg-[#0088FF] border-[#0088FF]"
                                    )}>
                                        {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                                    </div>
                                    <input 
                                        type="checkbox" 
                                        className="hidden"
                                        checked={isSelected}
                                        onChange={() => toggleCategory(cat)}
                                    />
                                    <span className={cn(
                                        "transition-colors",
                                        isSelected ? "font-medium text-black" : "text-gray-600 group-hover:text-black"
                                    )}>
                                        {cat}
                                    </span>
                                </label>
                            )
                        })}
                    </div>
                </div>

                {/* ПРАВАЯ КОЛОНКА: ПОДПИСЧИКИ */}
                <div className="w-[300px]">
                    <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">
                        Кол-во подписчиков
                    </h3>
                    
                    <div className="flex flex-col gap-3">
                        {SUBSCRIBER_RANGES.map((range, idx) => {
                            const isSelected = selectedRangeIndex === idx;
                            return (
                                <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                                    <div className={cn(
                                        // ДОБАВИЛ shrink-0
                                        "w-5 h-5 shrink-0 rounded-full border border-gray-300 flex items-center justify-center transition-colors",
                                        isSelected && "bg-[#0088FF] border-[#0088FF]"
                                    )}>
                                        {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                                    </div>
                                    <input 
                                        type="radio" 
                                        className="hidden"
                                        checked={isSelected}
                                        onChange={() => setSelectedRangeIndex(idx)}
                                    />
                                    <span className={cn(
                                        "transition-colors",
                                        isSelected ? "font-medium text-black" : "text-gray-600 group-hover:text-black"
                                    )}>
                                        {range.label}
                                    </span>
                                </label>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* ФУТЕР */}
            <div className="flex justify-end gap-3">
                <button 
                    onClick={onClose}
                    className="px-8 py-3 rounded-full border border-[#0088FF] text-[#0088FF] font-medium hover:bg-[#0088FF]/5 transition-colors"
                >
                    Отмена
                </button>
                <button 
                    onClick={handleSave}
                    className="px-8 py-3 rounded-full bg-[#0088FF] text-white font-medium hover:bg-[#0088FF]/90 transition-colors shadow-lg shadow-blue-500/20"
                >
                    Сохранить
                </button>
            </div>
        </motion.div>
    )
}