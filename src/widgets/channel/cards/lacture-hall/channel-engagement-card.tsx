"use client";

import { GridCard } from "../../template/grid-card";
import { cn } from "@/shared/utils";
import { motion } from "framer-motion";
import { ChannelEngagementCardProps } from "../../types/channel-engagement-card.props";

export const ChannelEngagementCard = ({
    activePercentage,
    stats,
    className,
}: ChannelEngagementCardProps) => {
    const data = [
        { label: "Лайкают", value: stats.likes, color: "#CD3DDF" },
        { label: "Комментируют", value: stats.comments, color: "#FF3B3F" },
        { label: "Делают репосты", value: stats.reposts, color: "#5A4DEA" },
    ];

    // --- НАСТРОЙКИ ДИАГРАММЫ ---
    const size = 200;
    const strokeWidth = 18;
    const center = size / 2;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const gapSize = 5; 
    const gapCorrection = gapSize + strokeWidth;

    let currentAngle = -90;

    // Тень
    const shadowFilterClass = "drop-shadow-[0px_2px_4px_rgba(0,0,0,0.08)] drop-shadow-[0px_0px_6px_rgba(0,0,0,0.02)]";

    // --- ВАРИАНТЫ АНИМАЦИИ (Variants) ---
    
    // Для контейнера легенды (чтобы элементы появлялись по очереди)
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Задержка между появлением пунктов
                delayChildren: 0.5,   // Ждем, пока нарисуется круг
            },
        },
    };

    // Для пунктов легенды
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <GridCard title="Как читают канал" className={cn("h-full", className)}>
            <div className="flex flex-col items-center justify-between h-full">
                
                {/* КОНТЕЙНЕР ДИАГРАММЫ */}
                <div className="relative w-full aspect-square max-w-[220px] mx-auto mt-4 mb-6">
                    
                    {/* Текст по центру (Fade in + Scale) */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
                    >
                        <span className="text-[22px] text-black leading-none font-medium">
                            {activePercentage}%
                        </span>
                        <span className="text-[22px] text-black leading-none">активных</span>
                    </motion.div>

                    {/* SVG */}
                    <svg 
                        viewBox={`0 0 ${size} ${size}`} 
                        className="w-full h-full overflow-visible transform rotate-0"
                    >
                        {data.map((item, index) => {
                            const segmentArcLength = (item.value / 100) * circumference;
                            const visibleDash = Math.max(0, segmentArcLength - gapCorrection);

                            const rotateAngle = currentAngle;
                            currentAngle += (item.value / 100) * 360;

                            if (item.value <= 0) return null;

                            return (
                                <motion.circle
                                    key={item.label}
                                    cx={center}
                                    cy={center}
                                    r={radius}
                                    fill="transparent"
                                    stroke={item.color}
                                    strokeWidth={strokeWidth}
                                    strokeLinecap="round"
                                    transform={`rotate(${rotateAngle} ${center} ${center})`}
                                    className={cn(shadowFilterClass)}
                                    
                                    // Анимация рисования линии
                                    // 1. Начальное состояние: длина линии 0, остальное пустота
                                    initial={{ strokeDasharray: `0 ${circumference}` }}
                                    // 2. Конечное состояние: расчетная длина, остальное пустота
                                    whileInView={{ strokeDasharray: `${visibleDash} ${circumference - visibleDash}` }}
                                    // 3. Настройки вьюпорта
                                    viewport={{ once: true, amount: 0.4 }} // Срабатывает, когда 40% объекта видно
                                    // 4. Параметры перехода
                                    transition={{ 
                                        duration: 1.2, 
                                        ease: "easeOut", 
                                        delay: index * 0.15 // Небольшая задержка для каждого следующего сегмента
                                    }}
                                />
                            );
                        })}
                    </svg>
                </div>

                {/* ЛЕГЕНДА СНИЗУ */}
                <motion.div 
                    className="w-full space-y-4"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {data.map((item) => (
                        <motion.div 
                            key={item.label} 
                            className="flex items-center gap-3"
                            variants={itemVariants}
                        >
                            <span
                                className="w-5 h-5 rounded-full shadow-sm shrink-0"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="text-lg font-medium text-black truncate">
                                {item.label}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </GridCard>
    );
};