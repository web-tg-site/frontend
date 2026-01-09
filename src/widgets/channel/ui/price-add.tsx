"use client"

import { LandingBlock, Title } from "@/shared/ui"
import { PriceTemplate } from "../template/price-template"
import { LinearIcon, LineDuotoneIcon, MessageIcon } from "../icons/price-icons"
// Импортируем Variants для типизации объектов анимации
import { motion, Variants } from "framer-motion"

// Типизация контейнера (управляет задержкой детей)
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2 // Задержка 0.2с между появлением элементов
        }
    }
}

// Типизация отдельного элемента (как он появляется)
const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.5, ease: "easeOut" } 
    }
}

export const PriceAdd = () => {
    return (
        <LandingBlock className="py-8 px-7.5">
            <Title className="mb-8 text-black">
                Стоимость рекламы
            </Title>

            <motion.div 
                className="grid lg:grid-cols-3 gap-2.5"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* 1-й элемент */}
                <motion.div variants={itemVariants}>
                    <PriceTemplate 
                        price="20к - 30к"
                        title="Рекламный пост"
                        icon={LinearIcon}
                    />
                </motion.div>

                {/* 2-й элемент */}
                <motion.div variants={itemVariants}>
                    <PriceTemplate 
                        price="20к - 30к"
                        title="Интеграция"
                        icon={LineDuotoneIcon}
                    />
                </motion.div>

                {/* 3-й элемент */}
                <motion.div variants={itemVariants}>
                    <PriceTemplate 
                        price="20к - 30к"
                        title="Репост"
                        icon={MessageIcon}
                    /> 
                </motion.div>
            </motion.div>
        </LandingBlock>
    )
}