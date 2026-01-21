"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Loader2, X, Search as SearchIcon } from "lucide-react"
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
    isLoading,
    isSearchable = false 
}: AdminSelectProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const containerRef = useRef<HTMLDivElement>(null)
    const searchInputRef = useRef<HTMLInputElement>(null)

    // Находим выбранный лейбл (сравниваем как строки, чтобы избежать проблем '1' != 1)
    const selectedOption = options.find((opt) => String(opt.value) === String(value))
    const selectedLabel = selectedOption?.label

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

    // Фокус на поиск и сброс строки при открытии/закрытии
    useEffect(() => {
        if (isOpen && isSearchable) {
            setTimeout(() => searchInputRef.current?.focus(), 50);
        }
        if (!isOpen) setSearchQuery(""); 
    }, [isOpen, isSearchable])

    const handleSelect = (val: string | number) => {
        onChange(val)
        setIsOpen(false)
    }

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(null);
    }

    // Логика фильтрации
    const filteredOptions = useMemo(() => {
        if (!searchQuery) return options;
        const lowerQuery = searchQuery.toLowerCase();

        return options.filter(option => {
            // 1. Поиск по скрытым ключевым словам (если есть)
            if (option.keywords && option.keywords.includes(lowerQuery)) return true;
            
            // 2. Поиск по значению (value)
            if (String(option.value).toLowerCase().includes(lowerQuery)) return true;

            // 3. Поиск по Label (ТОЛЬКО ЕСЛИ ЭТО СТРОКА)
            if (typeof option.label === 'string') {
                return option.label.toLowerCase().includes(lowerQuery);
            }

            return false;
        });
    }, [options, searchQuery]);

    const isAlternative = variant === "alternative"
    const bgColor = isAlternative ? "bg-[#1E1E1E]" : "bg-[#282828]"
    const radius = isAlternative ? "rounded-[16px]" : "rounded-xl"
    const triggerRadius = isOpen ? (isAlternative ? "rounded-t-[16px] rounded-b-none" : "rounded-t-xl rounded-b-none") : radius
    const isDisabled = disabled || isLoading;

    return (
        <div ref={containerRef} className={cn("w-full flex flex-col relative", className)}>
            {/* --- ТРИГГЕР (Кнопка открытия) --- */}
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
                <span className={cn(!selectedLabel ? "text-[#656565]" : "text-white", "truncate pr-2")}>
                    {isLoading ? "Загрузка..." : (selectedLabel || placeholder)}
                </span>

                <div className="flex items-center gap-2 shrink-0">
                    {/* Показываем крестик очистки, если есть значение */}
                    {value !== null && value !== "" && !isLoading && !disabled && (
                        <div onClick={handleClear} className="p-0.5 rounded-full hover:bg-white/10 text-[#656565] hover:text-white transition-colors cursor-pointer">
                            <X size={16} />
                        </div>
                    )}
                    {isLoading ? (
                        <Loader2 size={16} className="text-white animate-spin" />
                    ) : (
                        <ChevronDown size={16} className={cn("text-[#656565] transition-transform duration-300", isOpen && "rotate-180 text-white")} />
                    )}
                </div>
            </div>

            {/* --- ВЫПАДАЮЩИЙ СПИСОК --- */}
            <AnimatePresence>
                {isOpen && !isDisabled && (
                    <motion.div
                        key="dropdown-list" // ✅ Уникальный ключ для анимации
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className={cn(
                            "absolute left-0 top-full w-full z-50 overflow-hidden",
                            bgColor,
                            isAlternative ? "rounded-b-2xl rounded-t-none" : "rounded-b-xl rounded-t-none",
                            "border-t border-white/5 shadow-card"
                        )}
                    >
                        {/* Поле поиска (если включено) */}
                        {isSearchable && (
                            <div className="px-3 py-2 border-b border-white/5 sticky top-0 bg-inherit z-10">
                                <div className="relative">
                                    <SearchIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        placeholder="Поиск..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-full bg-white/5 rounded-lg py-1.5 pl-9 pr-3 text-sm text-white placeholder-gray-500 outline-none focus:bg-white/10 transition-colors"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="max-h-90 overflow-y-auto custom-scrollbar flex flex-col">
                            {filteredOptions.map((option, index) => (
                                <div
                                    // ✅ ИСПРАВЛЕНИЕ: Используем комбинацию value и index для уникальности
                                    key={`${option.value}_${index}`}
                                    onClick={() => handleSelect(option.value)}
                                    className={cn(
                                        "px-4 py-3 cursor-pointer text-sm lg:text-base transition-colors duration-200 border-b border-white/5 last:border-0",
                                        "text-[#656565]",
                                        "hover:bg-white hover:text-black",
                                        // Приведение к строке для корректного сравнения
                                        String(value) === String(option.value) && "bg-white text-black font-medium"
                                    )}
                                >
                                    {option.label}
                                </div>
                            ))}
                            
                            {filteredOptions.length === 0 && (
                                <div className="px-4 py-6 text-[#656565] text-sm text-center">
                                    Ничего не найдено
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* --- СООБЩЕНИЕ ОБ ОШИБКЕ --- */}
            <AnimatePresence>
                {error && (
                    <motion.div 
                        key="error-message" // ✅ Уникальный ключ для анимации
                        initial={{ height: 0, opacity: 0 }} 
                        animate={{ height: "auto", opacity: 1 }} 
                        exit={{ height: 0, opacity: 0 }} 
                        className="overflow-hidden"
                    >
                        <p className="pt-1.5 text-xs text-red-400 font-medium ml-1 px-4">{error}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}