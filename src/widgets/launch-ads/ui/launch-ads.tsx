'use client';

import { LandingBlock } from "@/shared/ui"
import { Headline } from "@/shared/ui/text"
import { CIRCLE_ITEMS } from "../config/circle-items"
import { Circle } from "./circle"
import { cn } from "@/shared/utils"
import { motion } from "framer-motion"
import { circleSlideVariants, containerVariants } from "../config/animation";

export const LaunchAds = () => {
    return (
        <LandingBlock variant="dark" className="pt-[53px] pb-16 mb-2.5">
            <Headline variant="h4" className="text-center mb-12.5">
                Как проходит запуск<br/> рекламных кампаний?
            </Headline>

            <motion.div 
                className="flex w-full items-center justify-center"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {CIRCLE_ITEMS.map((item, index) => (
                    <motion.div 
                        key={index}
                        variants={circleSlideVariants}
                        className={cn(
                            "w-[28%] aspect-square shrink-0 relative",
                            index !== 0 && "-ml-[4%]"
                        )}
                        style={{ zIndex: CIRCLE_ITEMS.length - index }}
                    >
                        <Circle 
                            {...item}
                            arrow={index !== CIRCLE_ITEMS.length - 1}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </LandingBlock>
    )
}