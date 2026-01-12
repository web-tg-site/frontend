"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NotFoundBlock } from "./not-found-block";
import { NotFoundBubbles } from "./not-found-bubbles";
import { slideInRight, slideInLeftDelayed, slideInLeft, textContainer, digitAppearance } from "../config/animatios";

export const NotFoundPage = () => {
    const digits = ["4", "0", "4"];
    
    const [isDesktop, setIsDesktop] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const checkScreen = () => setIsDesktop(window.innerWidth >= 1024);
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    // Логика анимации для черного блока:
    // 1. Не смонтировано? slideInRight (безопасный дефолт для SSR).
    // 2. Десктоп? slideInLeftDelayed (чтобы выезжал красиво под красным).
    // 3. Мобилка/Планшет? slideInRight (сбоку).
    const blackBlockVariant = !mounted ? slideInRight : (isDesktop ? slideInLeftDelayed : slideInRight);

    return (
        <section className="
            mt-24 mb-3 px-5 gap-2.5 max-w-[1920px] mx-auto w-full 
            h-[calc(100vh-150px)] min-h-[600px]
            grid 
            
            /* MOBILE (<500px): 1 колонка. Ряды: Красный / Текст / Остаток */
            grid-cols-1 grid-rows-[200px_auto_1fr] 
            
            /* TABLET (500px - 1023px): 2 колонки. Ряды: Верх (240px) / Низ (остаток) */
            min-[500px]:grid-cols-2 min-[500px]:grid-rows-[240px_1fr] 
            
            /* DESKTOP (>=1024px): 3 колонки. 
               ИСПРАВЛЕНО: Ряды [280px_1fr] вместо 3-х равных рядов. 
               Это гарантирует, что верхний блок имеет фиксированную высоту и не сжимается. */
            lg:grid-cols-3 lg:grid-rows-[280px_1fr]
        ">
            
            {/* БЛОК 1: Красный 404 */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={slideInLeft}
                // Desktop: col-span-1 row-span-1 (верхняя левая ячейка)
                // z-20 чтобы быть выше черного при анимации, если что
                className="w-full h-full col-span-1 lg:col-span-1 lg:row-span-1 relative z-20"
            >
                <NotFoundBlock red className="h-full flex items-center justify-center min-[500px]:justify-start">
                    <motion.div 
                        className="flex items-center overflow-hidden"
                        variants={textContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        {digits.map((digit, i) => (
                            <motion.span
                                key={i}
                                variants={digitAppearance}
                                className="text-white uppercase text-[100px] sm:text-[110px] lg:text-[140px] leading-none drop-shadow-xl inline-block origin-bottom"
                                animate={{
                                    y: [0, -10, 0],
                                    opacity: [1, 0.9, 1],
                                    scale: [1, 1.02, 1],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 1 + (i * 0.5),
                                }}
                            >
                                {digit}
                            </motion.span>
                        ))}
                    </motion.div>
                </NotFoundBlock>
            </motion.div>

            {/* БЛОК 2: Текст описания */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={blackBlockVariant}
                // Desktop: col-span-1 row-start-2 row-span-1 (нижняя левая ячейка)
                className="w-full h-full col-span-1 lg:col-span-1 lg:row-start-2 lg:row-span-1 relative z-10"
            >
                <NotFoundBlock className="
                    h-full flex items-center 
                    justify-center text-center 
                    lg:justify-start lg:text-left lg:items-end
                    py-6 lg:py-0
                ">
                    <p className="text-white text-[14px] sm:text-[14px] lg:text-[20px] leading-[110%] max-w-[380px] opacity-90 lg:pb-2">
                        Запрашиваемая страница не существует или была удалена. Проверьте правильность введённого адреса или перейдите на главную страницу.
                    </p>
                </NotFoundBlock>
            </motion.div>

            {/* БЛОК 3: Кнопка "На главную" */}
            <NotFoundBlock 
                href="/" 
                className="
                    relative overflow-hidden group h-full block
                    col-span-1                 
                    min-[500px]:col-span-2     
                    /* Desktop: занимает 2 колонки и ОБА ряда справа */
                    lg:col-span-2 lg:row-span-2 lg:col-start-2 lg:row-start-1
                "
            >
                <NotFoundBubbles />

                <div className="relative z-10 w-full h-full pointer-events-none">
                    <div className="flex items-center">
                        <p className="text-[14px] min-[500px]:text-[26px] lg:text-[40px] text-white font-medium drop-shadow-md">
                            Вернуться на главную
                        </p>

                        <svg 
                            width="28" height="15" viewBox="0 0 28 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                            className="ml-3.5 drop-shadow-md transition-transform duration-300 ease-out group-hover:translate-x-3"
                        >
                            <path d="M27.7071 8.07106C28.0976 7.68054 28.0976 7.04737 27.7071 6.65685L21.3431 0.292885C20.9526 -0.0976396 20.3195 -0.0976396 19.9289 0.292885C19.5384 0.683409 19.5384 1.31657 19.9289 1.7071L25.5858 7.36395L19.9289 13.0208C19.5384 13.4113 19.5384 14.0445 19.9289 14.435C20.3195 14.8255 20.9526 14.8255 21.3431 14.435L27.7071 8.07106ZM0 7.36395V8.36395H27V7.36395V6.36395H0V7.36395Z" fill="white"/>
                        </svg>
                    </div>
                </div>
            </NotFoundBlock>
        </section>
    )
}