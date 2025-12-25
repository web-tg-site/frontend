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

    const softSpring: Transition = {
        type: "spring",
        stiffness: 120,
        damping: 20,
        mass: 1
    }

    const containerClasses = cn(
        // ИЗМЕНЕНИЕ: rounded-full вместо rounded-[30px].
        // Это критично: если кнопка станет выше, углы контейнера всегда будут соответствовать кругу внутри.
        "group relative inline-flex items-center justify-center min-h-[40px] rounded-full overflow-hidden select-none isolate",
        "cursor-pointer",
        "disabled:opacity-70 disabled:cursor-not-allowed disabled:pointer-events-none",
        // Добавляем p-1, чтобы создать безопасную зону, если нужно, но ваша логика с абсолютами тоже работает
        className
    )

    // Размер отступа для круга
    const padding = "4px"

    const content = (
        <>
            {/* 1. ПРИЗРАЧНЫЙ ЭЛЕМЕНТ (Задает ширину кнопки) */}
            {/* pr-14 резервирует место под круг. Если кнопка ОЧЕНЬ высокая, возможно, потребуется увеличить pr */}
            <div className="invisible flex items-center pl-6 pr-14 whitespace-nowrap font-medium text-[16px]">
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
                <motion.div 
                    className="absolute left-6 flex items-center"
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

                <motion.div 
                    className="absolute right-6 flex items-center justify-end"
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
                // h-[86%] — круг всегда 86% от высоты кнопки
                // aspect-square — ширина равна высоте
                className="absolute top-1/2 z-20 flex -translate-y-1/2 items-center justify-center rounded-full aspect-square h-[86%]"
                variants={{
                    initial: { 
                        // Логика: ставим левый край круга на 100% ширины родителя,
                        // затем сдвигаем назад на ширину самого круга (-100%) и минус отступ.
                        // Это гарантирует привязку к правому краю независимо от размера.
                        left: "100%", 
                        x: `calc(-100% - ${padding})`, 
                        backgroundColor: "#0088FF",
                        rotate: 0 
                    },
                    hover: { 
                        // Логика: ставим левый край на 0, сдвигаем вправо на отступ.
                        left: "0%", 
                        x: padding, 
                        backgroundColor: "#FFFFFF",
                        rotate: -180 
                    }
                }}
                transition={softSpring}
            >
                {/* Обертка для иконки, чтобы центрировать SVG */}
                <motion.div
                    className="flex items-center justify-center w-full h-full"
                    variants={{
                        initial: { color: "#FFFFFF" },
                        hover: { color: "#0088FF" }
                    }}
                    transition={{ duration: 0.2 }}
                >
                     {loading ? (
                        <SpinnerIcon className="w-[45%] h-[45%] animate-spin" />
                    ) : (
                        // w-[45%] берется от размера КРУГА, который зависит от высоты кнопки.
                        // Иконка будет масштабироваться автоматически.
                        <ArrowIcon className="w-[45%] h-[45%]" />
                    )}
                </motion.div>
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