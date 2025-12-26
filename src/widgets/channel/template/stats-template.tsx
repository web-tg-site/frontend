"use client"

import { cn } from "@/shared/utils"
import { ActiveEye, DisactiveEye } from "../icons/eyes"
import { motion } from "framer-motion"

export const StatsTemplate = ({
    eyes,
    text,
    title
}: {
    eyes: boolean[],
    text: string,
    title: string
}) => {
    return (
        <div
            className={cn(
                "bg-white rounded-2xl p-4 relative overflow-hidden", // добавил overflow-hidden на всякий случай
                "shadow-[0px_4px_8px_0px_rgba(0,0,0,0.06),0px_0px_4px_0px_rgba(0,0,0,0.04)]"
            )}
        >
            <h4 className="text-[22px] font-medium mb-4">
                {title}
            </h4>

            <div className="grid grid-cols-5 gap-x-3 gap-y-2.5">
                {eyes.map((active, idx) => (
                    <div
                        key={idx}
                        className={cn(
                            "rounded-full w-10.5 h-10.5 flex justify-center items-center transition-all duration-200",
                            active 
                                ? "bg-[#F9F9F9] border border-[#f3f3f3] text-black shadow-[5.25px_5.25px_10.5px_0px_rgba(0,0,0,0.08),0px_0px_2.63px_0px_rgba(0,0,0,0.04)]"
                                : "bg-transparent border border-transparent text-[#D9D9D9]"
                        )}
                    >
                        {active ? <ActiveEye /> : <DisactiveEye />}
                    </div>
                ))}
            </div>

            {/* Анимированная плашка */}
            <motion.div 
                className="absolute bottom-4 right-3.5 bg-[#00C8B3] rounded-[20px] py-4 px-6 origin-bottom-right" // origin-bottom-right важно для роста из угла
                initial={{ scale: 0, rotate: 10 }} // Начинаем с нуля и небольшого поворота
                whileInView={{ scale: 1, rotate: 0 }} // Возвращаемся в норму
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                    type: "spring", // Эффект пружины
                    stiffness: 260, // Жесткость пружины (резкость)
                    damping: 20,    // Затухание (чтобы не болталось вечно)
                    delay: 0.2      // Чуть ждем после появления карточки
                }}
            >
                {/* Анимированный текст (Blur Snap эффект) */}
                <motion.div
                    initial={{ filter: "blur(10px)", scale: 1.5, opacity: 0 }}
                    whileInView={{ filter: "blur(0px)", scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4, ease: "circOut" }}
                >
                    <p className="text-[26px] leading-[90%] text-white font-medium mb-0.5">
                        {text}
                    </p>

                    <p className="leading-[90%] text-white/60">
                        просмотров
                    </p>
                </motion.div>
            </motion.div>
        </div>
    )
}