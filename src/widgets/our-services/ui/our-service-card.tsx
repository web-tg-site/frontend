'use client';

import { Title } from "@/shared/ui/text";
import { OurServiceCardProps } from "../types/our-service-card.props";
import Image from "next/image";
import { cn } from "@/shared/utils";
import { motion } from "framer-motion";
import { cardVariants } from "../config/animation";

export const OurServiceCard = ({
    icon: Icon,
    title,
    image,
    type = 'center'
}: OurServiceCardProps) => {
    const isRight = type === 'right';

    return (
        <motion.div 
            variants={cardVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="px-5.5 pt-5.5 bg-[#F9F9F9] rounded-[20px] shadow-[-4px_-4px_8px_0px_rgba(0,0,0,0.06),0px_0px_4px_0px_rgba(0,0,0,0.04)] h-full flex flex-col"
        >
            <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring" }}
                className={cn(
                    "bg-white rounded-full flex justify-center items-center shadow-[6.38px_6.38px_12.76px_0px_rgba(0,0,0,0.08),0px_0px_3.19px_0px_rgba(0,0,0,0.04)] mb-8",
                    "lg:w-[67px] lg:h-[67px] w-7 h-7",
                    "p-1.5 lg:p-0"
                )}
            >
                <Icon className="w-full h-full lg:w-auto lg:h-auto" />
            </motion.div>

            <Title variant="h2" className="lg:mb-12.5 mb-6 text-black lg:max-w-[367px] lg:text-[30px] text-[18px] leading-none">
                {title}
            </Title>

            <div className={cn(
                "w-full flex mt-auto",
                "lg:h-[243px] h-auto", 
                isRight ? "justify-end" : "justify-center"
            )}>
                <Image 
                    src={`/our-services/${image}`}
                    alt={title}
                    width={400}
                    height={400}
                    className={cn(
                        "object-contain",
                        // ИЗМЕНЕНИЕ ЗДЕСЬ:
                        // lg:h-full — на десктопе растягиваем на высоту контейнера
                        // h-auto — на мобильном высота автоматическая (proportional)
                        "lg:h-full h-auto",
                        isRight ? "w-full max-w-[476px]" : "w-full"
                    )}
                    unoptimized
                />
            </div>
        </motion.div>
    )
}