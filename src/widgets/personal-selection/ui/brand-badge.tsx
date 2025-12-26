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
            // Твои обновленные стили позиционирования
            className={`relative inline-flex items-center justify-center px-8.5 pt-[7px] pb-4 rounded-full align-middle mx-[0.2em] select-none cursor-default ${className}`}
            style={{
                backgroundColor: color,
                whiteSpace: "nowrap",
                verticalAlign: "0.15em",
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

            // 2. Анимация ховера (желейный эффект)
            whileHover={{ 
                scale: 1.05, // Чуть меньше 1.1, так как плашка стала широкой
                rotate: 2,   // Легкий наклон
                transition: { 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 10 
                } 
            }}
            
            // 3. Анимация нажатия
            whileTap={{ scale: 0.95 }}
        >
            {/* Твой обновленный font-medium */}
            <span className="text-white relative z-10 leading-none pb-[0.1em] font-medium">
                {text}
            </span>
        </motion.span>
    );
};