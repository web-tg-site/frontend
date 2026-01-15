"use client"

import { LandingBlock } from "@/shared/ui"
import { Headline } from "@/shared/ui/text"
import { cn } from "@/shared/utils"
import { AdvantageCard } from "./advantage-card"
import { ADVANTAGE_ITEMS } from "../config/advantage-items"
import { motion } from "framer-motion"
import { containerVariants, itemVariants } from "../config/animations"

export const Advantages = () => {
    // 1. Данные для ДЕСКТОПА (> 1024px)
    const row1 = ADVANTAGE_ITEMS.slice(0, 3)
    const row2 = ADVANTAGE_ITEMS.slice(3, 7)
    const row3 = ADVANTAGE_ITEMS.slice(7, 10)

    // 2. Данные для ПЛАНШЕТА (501px - 1024px) - пары
    const tabletPairs = []
    for (let i = 0; i < ADVANTAGE_ITEMS.length; i += 2) {
        tabletPairs.push(ADVANTAGE_ITEMS.slice(i, i + 2))
    }

    const EmptyCard = () => <AdvantageCard num={0} color="" text="" empty />

    return (
        <LandingBlock variant="dark" className="pt-[47px] pb-[55px] overflow-hidden mb-2.5">
            <Headline variant="h4" className="text-center mb-12.5">
                Ключевые преимущества
            </Headline>

            {/* ======================================================= */}
            {/* 1. МОБИЛЬНАЯ ВЕРСТКА (<= 500px)                         */}
            {/* ======================================================= */}
            <motion.div
                className={cn(
                    "grid gap-2.5 min-[501px]:hidden",
                    
                    // ИЗМЕНЕНИЕ ЗДЕСЬ:
                    // Было: grid-cols-3 (равные колонки 1fr 1fr 1fr)
                    // Стало: grid-cols-[0.7fr_1.6fr_0.7fr]
                    // Боковые сектора (0.7fr) стали уже, центральный (1.6fr) — шире.
                    // Контейнер остался широким (150%) и сдвинутым (-25%), чтобы центр был по центру экрана.
                    "grid-cols-[0.7fr_1.6fr_0.7fr] w-[150%] -ml-[25%]"
                )}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {ADVANTAGE_ITEMS.map((item) => (
                    <div key={item.num} className="contents">
                        {/* Левая заглушка (узкая) */}
                        <motion.div variants={itemVariants}>
                            <EmptyCard />
                        </motion.div>

                        {/* Центральная карточка (широкая) */}
                        <motion.div variants={itemVariants}>
                            <AdvantageCard {...item} />
                        </motion.div>

                        {/* Правая заглушка (узкая) */}
                        <motion.div variants={itemVariants}>
                            <EmptyCard />
                        </motion.div>
                    </div>
                ))}
            </motion.div>

            {/* ======================================================= */}
            {/* 2. ПЛАНШЕТНАЯ ВЕРСТКА (501px - 1024px)                  */}
            {/* ======================================================= */}
            <motion.div
                className={cn(
                    "hidden min-[501px]:grid min-[1025px]:hidden",
                    "gap-2.5",
                    "grid-cols-4 w-[140%] -ml-[20%]"
                )}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {tabletPairs.map((pair, index) => (
                    <div key={index} className="contents">
                        <motion.div variants={itemVariants}>
                            <EmptyCard />
                        </motion.div>

                        {pair[0] && (
                            <motion.div variants={itemVariants}>
                                <AdvantageCard {...pair[0]} />
                            </motion.div>
                        )}
                        {pair[1] && (
                            <motion.div variants={itemVariants}>
                                <AdvantageCard {...pair[1]} />
                            </motion.div>
                        )}

                        <motion.div variants={itemVariants}>
                            <EmptyCard />
                        </motion.div>
                    </div>
                ))}
            </motion.div>

            {/* ======================================================= */}
            {/* 3. ДЕСКТОПНАЯ ВЕРСТКА (> 1024px)                        */}
            {/* ======================================================= */}
            <motion.div 
                className={cn(
                    "hidden min-[1025px]:grid", 
                    "grid-cols-10 gap-2.5 min-w-[125%] -ml-[12.5%]"
                )}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {/* --- 1 РЯД --- */}
                <motion.div variants={itemVariants} className="col-span-2">
                    <EmptyCard />
                </motion.div>
                
                {row1.map((item) => (
                    <motion.div key={item.num} variants={itemVariants} className="col-span-2">
                        <AdvantageCard {...item} />
                    </motion.div>
                ))}

                <motion.div variants={itemVariants} className="col-span-2">
                    <EmptyCard />
                </motion.div>

                {/* --- 2 РЯД --- */}
                {row2.map((item, index) => (
                    <motion.div 
                        key={item.num} 
                        variants={itemVariants}
                        className={cn(
                            "col-span-2",
                            index === 0 && "col-start-2"
                        )}
                    >
                        <AdvantageCard {...item} />
                    </motion.div>
                ))}

                {/* --- 3 РЯД --- */}
                <motion.div variants={itemVariants} className="col-span-2">
                    <EmptyCard />
                </motion.div>
                
                {row3.map((item) => (
                    <motion.div key={item.num} variants={itemVariants} className="col-span-2">
                        <AdvantageCard {...item} />
                    </motion.div>
                ))}
                
                <motion.div variants={itemVariants} className="col-span-2">
                    <EmptyCard />
                </motion.div>
            </motion.div>
        </LandingBlock>
    )
}