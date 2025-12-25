'use client';

import { Title } from "@/shared/ui/text";
import { OurServiceCardProps } from "../types/our-service-card.props";
import Image from "next/image";
import { cn } from "@/shared/utils";
import { motion, Variants } from "framer-motion";
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
                className="bg-white rounded-full flex justify-center items-center w-[67px] h-[67px] shadow-[6.38px_6.38px_12.76px_0px_rgba(0,0,0,0.08),0px_0px_3.19px_0px_rgba(0,0,0,0.04)] mb-8"
            >
                <Icon />
            </motion.div>

            <Title variant="h2" className="mb-12.5 text-black max-w-[367px]">
                {title}
            </Title>

            <div className={cn(
                "w-full h-[243px] flex mt-auto",
                isRight ? "justify-end" : "justify-center"
            )}>
                <Image 
                    src={`/our-services/${image}`}
                    alt={title}
                    width={400}
                    height={400}
                    className={cn(
                        "h-full object-contain",
                        isRight ? "w-auto max-w-[476px]" : "w-full"
                    )}
                    unoptimized
                />
            </div>
        </motion.div>
    )
}