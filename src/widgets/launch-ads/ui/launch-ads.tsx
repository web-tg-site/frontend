'use client';

import { useEffect, useState } from "react";
import { LandingBlock } from "@/shared/ui"
import { Headline } from "@/shared/ui/text"
import { CIRCLE_ITEMS } from "../config/circle-items"
import { Circle } from "./circle"
import { cn } from "@/shared/utils"
// 1. Импортируем тип Variants
import { motion, Variants } from "framer-motion"
import { containerVariants } from "../config/animation";

export const LaunchAds = () => {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const media = window.matchMedia('(min-width: 1024px)');
        const updateMatches = () => setIsDesktop(media.matches);
        
        updateMatches();
        media.addEventListener('change', updateMatches);
        return () => media.removeEventListener('change', updateMatches);
    }, []);

    // 2. Добавляем тип : Variants к объекту
    const responsiveVariants: Variants = {
        hidden: { 
            opacity: 0, 
            x: isDesktop ? -50 : 0, 
            y: isDesktop ? 0 : -50 
        },
        visible: { 
            opacity: 1, 
            x: 0, 
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24
            }
        }
    };

    return (
        <LandingBlock variant="dark" className="pt-[53px] pb-16 mb-2.5">
            <Headline variant="h4" className="text-center mb-12.5">
                Как проходит запуск<br/> рекламных кампаний?
            </Headline>

            <motion.div 
                className="flex flex-col lg:flex-row w-full items-center justify-center"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {CIRCLE_ITEMS.map((item, index) => (
                    <motion.div 
                        key={index}
                        variants={responsiveVariants}
                        className={cn(
                            "aspect-square shrink-0 relative",
                            "w-full lg:w-[28%]",
                            index !== 0 && "-mt-[15%] lg:mt-0 lg:-ml-[4%]"
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