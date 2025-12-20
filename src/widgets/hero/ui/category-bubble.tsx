"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { cn } from "@/shared/utils";
import { LucideIcon } from "lucide-react";

interface CategoryBubbleProps {
    title: string;
    icon: LucideIcon;
    href: string;
    colorClass: string;
    initialX: number;
    initialY: number;
    rotate: number;
}

export const CategoryBubble: React.FC<CategoryBubbleProps> = ({
    title,
    icon: Icon,
    href,
    colorClass,
    initialX,
    initialY,
    rotate,
}) => {
    const router = useRouter();
    const isDragging = useRef(false);

    // Состояние для рандомной анимации (плавание)
    // Генерируем смещения только на клиенте, чтобы избежать ошибок гидратации
    const [floatParams, setFloatParams] = useState({ x: 0, y: 0, duration: 0 });

    useEffect(() => {
        setFloatParams({
            x: Math.random() * 20 - 10, // Легкое смещение ±10px
            y: Math.random() * 20 - 10,
            duration: 3 + Math.random() * 4, // Длительность от 3 до 7 секунд
        });
    }, []);

    const handleTap = () => {
        if (!isDragging.current) {
            router.push(href);
        }
    };

    return (
        <motion.div
            // --- ФИЗИКА И ДРАГ ---
            drag
            // dragMomentum={true} добавляет инерцию (бабл летит после броска)
            dragMomentum={true} 
            // dragElastic позволяет "тянуть" бабл (чувство веса)
            dragElastic={0.1}
            // Нет dragConstraints — бабл может улетать за пределы экрана
            
            // --- НАЧАЛЬНОЕ ПОЛОЖЕНИЕ ---
            initial={{ x: initialX, y: initialY, rotate: rotate, opacity: 0 }}
            animate={{ 
                x: [initialX, initialX + floatParams.x, initialX],
                y: [initialY, initialY + floatParams.y, initialY],
                rotate: rotate,
                opacity: 1
            }}
            // Бесконечная плавная анимация (невесомость)
            transition={{
                duration: floatParams.duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
            }}

            // --- ВЗАИМОДЕЙСТВИЕ ---
            whileHover={{ scale: 1.1, cursor: "grab", zIndex: 100 }}
            whileDrag={{ scale: 1.2, cursor: "grabbing", zIndex: 110 }}

            // Логика разделения клика и драга
            onDragStart={() => { isDragging.current = true; }}
            onDragEnd={() => {
                // Небольшая задержка, чтобы сбросить флаг драга
                setTimeout(() => { isDragging.current = false; }, 100);
            }}
            onTap={handleTap}

            className={cn(
                "absolute flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-medium shadow-lg select-none whitespace-nowrap pointer-events-auto will-change-transform",
                colorClass
            )}
        >
            <Icon size={20} strokeWidth={2.5} />
            <span className="text-[15px]">{title}</span>
        </motion.div>
    );
};