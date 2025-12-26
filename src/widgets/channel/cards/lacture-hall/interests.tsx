"use client";

import { cn } from "@/shared/utils";
import { GridCard } from "../../template/grid-card";
import { InterestsCardProps } from "../../types/interests.props";
import { motion, Variants } from "framer-motion";

export const Interests = ({
    items,
    className = "",
}: InterestsCardProps) => {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants: Variants = {
        // x: 20 означает, что элемент начинает движение справа
        hidden: { opacity: 0, x: 20 }, 
        visible: { 
            opacity: 1, 
            x: 0, 
            transition: { duration: 0.4, ease: "easeOut" } 
        },
    };

    return (
        <GridCard title="Интересы" className={className}>
            <motion.div 
                className="grid grid-cols-1 gap-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {items.map((item, idx) => (
                    <motion.div
                        key={idx}
                        variants={itemVariants}
                        className={cn(
                            "w-full bg-white p-0.5 pr-4 rounded-[30px] flex items-center",
                            "shadow-[4.66px_2.33px_9.32px_0px_rgba(0,0,0,0.06),0px_0px_4.66px_0px_rgba(0,0,0,0.04)]"
                        )}
                    >
                        <span className="shrink-0 w-10 h-10 bg-primary text-white flex items-center justify-center mr-4.5 rounded-full text-[20px] leading-none font-medium tabular-nums pt-0.5">
                            {idx + 1}
                        </span>

                        <p className="text-[18px] text-black leading-tight">
                            {item}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </GridCard>
    );
};