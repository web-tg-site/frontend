"use client";

import { cn } from "@/shared/utils";
import { GridCard } from "../../template/grid-card";
import { GeographyItem } from "../../types/geography-item";
import { GroupIcon } from "../../icons/group";
import { motion, Variants } from "framer-motion";

export const GeographyCard = ({
    items,
    className = "",
}: {
    items: GeographyItem[];
    className?: string;
}) => {
    // Анимация контейнера: управляет очередностью появления детей
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15, // Задержка между карточками
            },
        },
    };

    // Анимация карточки: появление снизу вверх
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.5, ease: "easeOut" } 
        },
    };

    return (
        <GridCard title="География" className={className}>
            <motion.div 
                className="grid grid-cols-4 gap-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {items.map((item, idx) => (
                    <motion.div 
                        className={cn(
                            "bg-white rounded-[10px] flex items-center gap-3 py-3.5 pl-5 pr-3",
                            "shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.08),0px_0px_6px_0px_rgba(0,0,0,0.02)]"
                        )}
                        key={idx}
                        variants={itemVariants}
                    >
                        <div className="rounded-full bg-[#FF8D28] h-10 w-10 min-w-10 flex items-center justify-center shrink-0">
                            <GroupIcon />
                        </div>

                        <p className="text-2xl font-medium leading-[90%]">
                            {item.name} ({item.percent}%) 
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </GridCard>
    );
};