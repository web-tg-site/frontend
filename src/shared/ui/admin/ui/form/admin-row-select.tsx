"use client";

import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/shared/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface AdminRowSelectOption {
    value: string | number;
    label: ReactNode; 
}

interface AdminRowSelectProps {
    value: string | number;
    options: AdminRowSelectOption[];
    onChange: (value: string | number) => void;
    className?: string;
}

export const AdminRowSelect = ({
    value,
    options,
    onChange,
    className
}: AdminRowSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);

    // 1. Вычисляем позицию
    const updatePosition = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setCoords({
                top: rect.bottom, // Для fixed position не нужно прибавлять scrollY
                left: rect.left,
                width: rect.width
            });
        }
    };

    // 2. Обработчик клика
    const toggleOpen = () => {
        const nextState = !isOpen;
        if (nextState) {
            updatePosition();
        }
        setIsOpen(nextState);
    };

    // 3. Закрытие при скролле и ресайзе (чтобы меню не "улетало" от кнопки)
    useEffect(() => {
        if (!isOpen) return;

        const handleScrollOrResize = () => {
            setIsOpen(false);
        };

        window.addEventListener("scroll", handleScrollOrResize, { capture: true });
        window.addEventListener("resize", handleScrollOrResize);
        
        // Закрытие при клике вне
        const handleClickOutside = (e: MouseEvent) => {
            // Проверяем, был ли клик по кнопке (меню в портале, поэтому contains не сработает стандартно)
            if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        window.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("scroll", handleScrollOrResize, { capture: true });
            window.removeEventListener("resize", handleScrollOrResize);
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const currentLabel = options.find((opt) => String(opt.value) === String(value))?.label || value;
    const availableOptions = options.filter((opt) => String(opt.value) !== String(value));

    const handleSelect = (newValue: string | number) => {
        onChange(newValue);
        setIsOpen(false);
    };

    return (
        <>
            <div className={cn("w-full min-w-[140px]", className)}>
                <button
                    ref={buttonRef}
                    onClick={toggleOpen}
                    className={cn(
                        "flex items-center justify-between w-full px-4 py-2.5 rounded-xl transition-all duration-200",
                        "bg-[#1A1A1A] hover:bg-[#252525] group border border-transparent",
                        isOpen ? "rounded-b-none bg-[#252525] border-white/5" : ""
                    )}
                >
                    <span className="text-gray-300 group-hover:text-white transition-colors text-[14px] font-medium truncate text-left">
                        {currentLabel}
                    </span>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronDown size={16} className="text-gray-500 group-hover:text-white transition-colors shrink-0 ml-2" />
                    </motion.div>
                </button>
            </div>

            {/* Портал в document.body */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            key="dropdown"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            style={{
                                position: "fixed", // Используем FIXED для надежности
                                top: coords.top,
                                left: coords.left,
                                width: coords.width,
                                zIndex: 99999, // Максимальный слой
                            }}
                            // Предотвращаем закрытие при клике внутри меню
                            onMouseDown={(e) => e.stopPropagation()} 
                            className="bg-[#252525] rounded-b-xl border border-white/5 border-t-0 shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden"
                        >
                            <div className="py-1">
                                {availableOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => handleSelect(option.value)}
                                        className="w-full text-left px-4 py-2.5 text-[14px] text-gray-400 hover:text-white hover:bg-white/5 transition-colors truncate"
                                    >
                                        {option.label}
                                    </button>
                                ))}
                                
                                {availableOptions.length === 0 && (
                                    <div className="px-4 py-2 text-[12px] text-gray-500 text-center">
                                        Нет вариантов
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
};