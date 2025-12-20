"use client"

import Link from "next/link"
import { motion, type HTMLMotionProps, type Transition } from "framer-motion"
import { cn } from "@/shared/utils"
import { ArrowIcon, SpinnerIcon } from "../icons"
import { LinkButtonProps } from "../types"

const MotionLink = motion.create(Link)

export const LinkButton = (props: LinkButtonProps) => {
    const { children, className, loading, ...rest } = props
    const isLink = "href" in rest && rest.href

    // ИСПРАВЛЕНИЕ: Явно указываем тип Transition
    const softSpring: Transition = {
        type: "spring",
        stiffness: 120,
        damping: 20,
        mass: 1
    }

    const containerClasses = cn(
        "group relative inline-flex items-center justify-center h-[40px] rounded-[30px] overflow-hidden select-none isolate",
        "cursor-pointer",
        "disabled:opacity-70 disabled:cursor-not-allowed disabled:pointer-events-none",
        className
    )

    const content = (
        <>
            {/* 1. ПРИЗРАЧНЫЙ ЭЛЕМЕНТ (Задает ширину кнопки) */}
            <div className="invisible flex items-center pl-4 pr-[50px] whitespace-nowrap font-medium text-[16px]">
                {children}
            </div>

            {/* 2. АНИМИРОВАННЫЙ ФОН */}
            <motion.div 
                className="absolute inset-0 z-0"
                initial={{ backgroundColor: "#FFFFFF" }}
                variants={{
                    initial: { backgroundColor: "#FFFFFF" },
                    hover: { backgroundColor: "#0088FF" }
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            />

            {/* 3. ТЕКСТЫ */}
            <div className="absolute inset-0 z-10 flex items-center pointer-events-none">
                {/* Текст СЛЕВА (Черный) */}
                <motion.div 
                    className="absolute left-4 flex items-center"
                    variants={{
                        initial: { opacity: 1, x: 0 },
                        hover: { opacity: 0, x: -10 }
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <span className="text-black font-medium text-[16px] whitespace-nowrap">
                        {children}
                    </span>
                </motion.div>

                {/* Текст СПРАВА (Белый) */}
                <motion.div 
                    className="absolute right-4 flex items-center justify-end"
                    variants={{
                        initial: { opacity: 0, x: 10 },
                        hover: { opacity: 1, x: 0 }
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <span className="text-white font-medium text-[16px] whitespace-nowrap">
                        {children}
                    </span>
                </motion.div>
            </div>

            {/* 4. КАТЯЩИЙСЯ КРУГ */}
            <motion.div
                className="absolute top-0.5 z-20 flex items-center justify-center rounded-full h-9 w-9"
                variants={{
                    initial: { 
                        left: "calc(100% - 38px)", 
                        backgroundColor: "#0088FF",
                        rotate: 0 
                    },
                    hover: { 
                        left: "2px", 
                        backgroundColor: "#FFFFFF",
                        rotate: -180 
                    }
                }}
                transition={softSpring}
            >
                {loading ? (
                    <motion.div
                        variants={{
                            initial: { color: "#FFFFFF" },
                            hover: { color: "#0088FF" }
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        <SpinnerIcon className="w-4 h-4 animate-spin" />
                    </motion.div>
                ) : (
                    <motion.div
                        variants={{
                            initial: { color: "#FFFFFF" },
                            hover: { color: "#0088FF" }
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        <ArrowIcon className="w-4 h-4" />
                    </motion.div>
                )}
            </motion.div>
        </>
    )

    if (isLink) {
        return (
            <MotionLink
                className={containerClasses}
                initial="initial"
                whileHover="hover"
                {...(rest as any)}
            >
                {content}
            </MotionLink>
        )
    }

    return (
        <motion.button
            className={containerClasses}
            initial="initial"
            whileHover="hover"
            disabled={loading || (rest as any).disabled}
            {...(rest as HTMLMotionProps<"button">)}
        >
            {content}
        </motion.button>
    )
}