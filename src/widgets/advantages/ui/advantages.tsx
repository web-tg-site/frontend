"use client"

import { LandingBlock } from "@/shared/ui"
import { Headline } from "@/shared/ui/text"
import { cn } from "@/shared/utils"
import { AdvantageCard } from "./advantage-card"
import { ADVANTAGE_ITEMS } from "../config/advantage-items"
import { motion } from "framer-motion"
import { containerVariants, itemVariants } from "../config/animations"


export const Advantages = () => {
    const row1 = ADVANTAGE_ITEMS.slice(0, 3)
    const row2 = ADVANTAGE_ITEMS.slice(3, 7)
    const row3 = ADVANTAGE_ITEMS.slice(7, 10)

    const EmptyCard = () => <AdvantageCard num={0} color="" text="" empty />

    return (
        <LandingBlock variant="dark" className="pt-[47px] pb-[55px] overflow-hidden mb-2.5">
            <Headline variant="h4" className="text-center mb-12.5">
                Ключевые преимущества
            </Headline>

            <motion.div 
                className={cn(
                    "grid grid-cols-1 gap-2.5",
                    "lg:grid-cols-10 lg:min-w-[125%] lg:-ml-[12.5%]"
                )}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {/* --- 1 РЯД --- */}
                <motion.div variants={itemVariants} className="hidden lg:block lg:col-span-2">
                    <EmptyCard />
                </motion.div>
                
                {row1.map((item) => (
                    <motion.div key={item.num} variants={itemVariants} className="lg:col-span-2">
                        <AdvantageCard {...item} />
                    </motion.div>
                ))}

                <motion.div variants={itemVariants} className="hidden lg:block lg:col-span-2">
                    <EmptyCard />
                </motion.div>


                {/* --- 2 РЯД --- */}
                {row2.map((item, index) => (
                    <motion.div 
                        key={item.num} 
                        variants={itemVariants}
                        className={cn(
                            "lg:col-span-2",
                            index === 0 && "lg:col-start-2"
                        )}
                    >
                        <AdvantageCard {...item} />
                    </motion.div>
                ))}


                {/* --- 3 РЯД --- */}
                <motion.div variants={itemVariants} className="hidden lg:block lg:col-span-2">
                    <EmptyCard />
                </motion.div>
                
                {row3.map((item) => (
                    <motion.div key={item.num} variants={itemVariants} className="lg:col-span-2">
                        <AdvantageCard {...item} />
                    </motion.div>
                ))}
                
                <motion.div variants={itemVariants} className="hidden lg:block lg:col-span-2">
                    <EmptyCard />
                </motion.div>
            </motion.div>
        </LandingBlock>
    )
}