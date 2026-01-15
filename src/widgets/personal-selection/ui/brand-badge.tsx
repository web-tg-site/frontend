"use client";

import { motion } from "framer-motion";

interface BrandBadgeProps {
    text: string;
    color: string;
    className?: string;
}

export const BrandBadge = ({ text, color, className = "" }: BrandBadgeProps) => {
    return (
        <motion.span
            // ИСПРАВЛЕНИЕ:
            // 1. Убрали pt-[7px] и pb-4
            // 2. Добавили py-2.5 (одинаковый отступ сверху и снизу ~10px)
            // 3. Можно также добавить leading-none сюда, чтобы line-height не добавлял лишних отступов
            className={`relative inline-flex items-center justify-center px-8.5 py-2.5 rounded-full align-middle mx-[0.2em] select-none cursor-default leading-none ${className}`}
            style={{
                backgroundColor: color,
                whiteSpace: "nowrap",
                verticalAlign: "0.15em", // Это выравнивает саму плашку относительно строки текста
            }}
            
            // 1. Анимация появления
            initial={{ opacity: 0, scale: 0, rotate: -15, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                mass: 0.8
            }}

            // 2. Анимация ховера
            whileHover={{ 
                scale: 1.05,
                rotate: 2,
                transition: { 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 10 
                } 
            }}
            
            // 3. Анимация нажатия
            whileTap={{ scale: 0.95 }}
        >
            {/* 
                ИСПРАВЛЕНИЕ:
                Добавил pt-[1px] или pt-[2px], если шрифт визуально "сидит" низко.
                Но обычно с py-2.5 и leading-none текст встает ровно в центр.
            */}
            <span className="text-white relative z-10 font-medium">
                {text}
            </span>
        </motion.span>
    );
};