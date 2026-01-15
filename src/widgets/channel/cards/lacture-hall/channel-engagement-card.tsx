"use client";

import { GridCard } from "../../template/grid-card";
import { cn } from "@/shared/utils";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { ChannelEngagementCardProps } from "../../types/channel-engagement-card.props";

// --- Вспомогательный компонент для сегмента ---
// Выносим его, чтобы использовать хуки анимации (useMotionValue)
const DonutSegment = ({
    item,
    visibleDash,
    circumference,
    radius,
    center,
    strokeWidth,
    rotateAngle,
    shadowFilterClass,
    index
}: any) => {
    // 1. Создаем motion value от 0 до 1
    const progress = useMotionValue(0);

    // 2. Трансформируем 0-1 в строку strokeDasharray
    // От "0 [окружность]" до "[длина] [остаток]"
    const strokeDasharray = useTransform(
        progress, 
        [0, 1], 
        [`0 ${circumference}`, `${visibleDash} ${circumference - visibleDash}`]
    );

    // 3. Также анимируем прозрачность, чтобы скрыть "точку" в самом начале
    // (когда stroke-linecap="round" и длина 0, браузер рисует точку)
    const opacity = useTransform(progress, [0, 0.05], [0, 1]);

    useEffect(() => {
        // Запускаем анимацию императивно при монтировании
        // (или можно использовать whileInView на родителе, но здесь проще так)
        const controls = animate(progress, 1, {
            duration: 1.2,
            ease: "easeOut",
            delay: index * 0.15 + 0.5 // +0.5 задержка перед стартом как в оригинале
        });

        return () => controls.stop();
    }, [index, progress]);

    return (
        <motion.circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke={item.color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            // Важно: поворот применяем здесь
            transform={`rotate(${rotateAngle} ${center} ${center})`}
            className={cn(shadowFilterClass)}
            style={{ 
                strokeDasharray, 
                opacity 
            }}
        />
    );
};

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

    const size = 200;
    const strokeWidth = 18;
    const center = size / 2;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const gapSize = 5; 
    const gapCorrection = gapSize + strokeWidth;

    let currentAngle = -90;

    const shadowFilterClass = "drop-shadow-[0px_2px_4px_rgba(0,0,0,0.08)] drop-shadow-[0px_0px_6px_rgba(0,0,0,0.02)]";

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.5,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <GridCard title="Как читают канал" className={cn("h-full", className)}>
            <div className="flex flex-col items-center justify-between h-full">
                
                <div className="relative w-full aspect-square max-w-[220px] mx-auto mt-4 mb-6">
                    {/* Текст по центру */}
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

                    {/* SVG Container - используем motion.div для отслеживания вьюпорта */}
                    <motion.svg 
                        viewBox={`0 0 ${size} ${size}`} 
                        className="w-full h-full overflow-visible transform rotate-0"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.4 }}
                    >
                        {data.map((item, index) => {
                            const segmentArcLength = (item.value / 100) * circumference;
                            // Защита от отрицательных значений при вычитании гэпа
                            const visibleDash = Math.max(0.1, segmentArcLength - gapCorrection);

                            const rotateAngle = currentAngle;
                            currentAngle += (item.value / 100) * 360;

                            if (item.value <= 0) return null;

                            return (
                                <DonutSegment
                                    key={item.label}
                                    index={index}
                                    item={item}
                                    visibleDash={visibleDash}
                                    circumference={circumference}
                                    radius={radius}
                                    center={center}
                                    strokeWidth={strokeWidth}
                                    rotateAngle={rotateAngle}
                                    shadowFilterClass={shadowFilterClass}
                                />
                            );
                        })}
                    </motion.svg>
                </div>

                {/* ЛЕГЕНДА */}
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