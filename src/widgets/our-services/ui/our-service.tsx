'use client';

import { LandingBlock } from "@/shared/ui"
import { Headline, Text } from "@/shared/ui/text"
import { BOTTOM_SERVICE, TOP_SERVICE } from "../config/service"
import { OurServiceCard } from "./our-service-card"
import { motion, Variants } from "framer-motion"
import { containerVariants } from "../config/animation";

export const OurService = () => {
    return (
        <LandingBlock className="py-12.5 px-7.5 mb-2">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <Headline variant="h4" className="text-center text-black mb-[30px]">
                    Что входит в наши услуги?
                </Headline>

                <div className="flex justify-center mb-12.5">
                    <Text className="max-w-[639px] w-full text-black/60 text-center">
                        Мы берём на себя полный цикл размещения рекламы в Telegram — от подбора каналов до выхода постов и контроля размещений.
                    </Text>
                </div>
            </motion.div>

            {/* Верхний ряд */}
            <motion.div 
                className="grid grid-cols-3 gap-2.5 mb-2.5"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {TOP_SERVICE.map((service, idx) => (
                    <OurServiceCard key={idx} {...service} />
                ))}
            </motion.div>

            {/* Нижний ряд */}
            <motion.div 
                className="grid grid-cols-2 gap-2.5"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {BOTTOM_SERVICE.map((service, idx) => (
                    <OurServiceCard key={idx} {...service} type="right" />
                ))}
            </motion.div>
        </LandingBlock>
    )
}