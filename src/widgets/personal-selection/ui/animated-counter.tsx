"use client";

import { motion } from "framer-motion";
import { formatPrice } from "@/shared/utils";

interface AnimatedCounterProps {
    value: number;
    className?: string;
}

export const AnimatedCounter = ({ value, className }: AnimatedCounterProps) => {
    // 1. Форматируем число (например "1 200 000")
    // 2. Добавляем " руб" в конец
    const fullText = `${formatPrice(value)} руб`;
    
    // 3. Разбиваем всю строку (цифры + пробелы + "руб") на символы
    const chars = fullText.split("");

    return (
        <div className={`flex items-baseline overflow-hidden ${className}`}>
            {chars.map((char, index) => (
                <motion.span
                    key={index}
                    // Начальное состояние: внизу и прозрачный
                    initial={{ y: "100%", opacity: 0 }}
                    // Конечное: на месте
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.5,
                        // Эффект "тяжелого барабана"
                        ease: [0.33, 1, 0.68, 1], 
                        // Задержка зависит от индекса, создавая волну слева направо
                        delay: index * 0.03, 
                    }}
                    className="inline-block"
                    // Важно: pre сохраняет пробелы между тысячами и перед "руб"
                    style={{ whiteSpace: "pre" }}
                >
                    {char}
                </motion.span>
            ))}
        </div>
    );
};