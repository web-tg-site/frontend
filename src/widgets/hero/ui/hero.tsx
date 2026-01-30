"use client";

import { useState, useEffect } from "react";
import { LinkButton } from "@/shared/ui";
import { Background } from "./background";
import { TelegramPhone } from "./telegram-phone";
import { BubblesLayer } from "./bubbles-layer";
import { Headline } from "@/shared/ui/text";
import { useHero } from "../api/use-hero";
import { SOCIALS_IMAGES } from "../config/social-images";
import Image from "next/image";
// 1. Импортируем motion
import { motion } from "framer-motion";

// 2. Создаем анимированную версию Next Image
const MotionImage = motion(Image);

export const Hero = () => {
    const { data: hero } = useHero();
    const heroChannels = hero?.channels ? hero.channels : [];
    const categories = hero?.categories ? hero.categories : [];

    const [heroHeight, setHeroHeight] = useState<string | number>("100vh");

    useEffect(() => {
        setHeroHeight(window.innerHeight);
    }, []);

    return (
        <section
            className="w-full relative overflow-hidden flex flex-col"
            style={{ height: heroHeight }}
        >
            <Background />

            <div className="absolute inset-0 z-40 pointer-events-none">
                <BubblesLayer 
                    data={categories}
                />
            </div>

            <div className="pt-32 flex flex-col justify-center items-center z-30 relative pointer-events-none">
                <div className="pointer-events-auto flex flex-col items-center">
                    <Headline variant="h3" className="text-center mb-4 xl:text-[80px] lg:text-[56px]">
                        Подбор площадок в соцсетях<br/> для рекламы вашего бренда
                    </Headline>
                    
                    <div className="flex items-center gap-10 mb-7.5">
                        {SOCIALS_IMAGES.map((s, idx) => {
                            const isMiddle = idx === 1;
                            
                            return (
                                <MotionImage 
                                    width={60}
                                    height={60}
                                    src={`/socials/${s}.png`}
                                    alt={s}
                                    key={idx}
                                    initial={{ y: isMiddle ? 5 : -5 }}
                                    animate={{ y: isMiddle ? -5 : 5 }}
                                    transition={{
                                        duration: 3, 
                                        repeat: Infinity, 
                                        repeatType: "reverse",
                                        ease: "easeInOut" 
                                    }}
                                />
                            );
                        })}
                    </div>
                    
                    <LinkButton href="/#orderSelection">
                        Заказать подборку
                    </LinkButton>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full flex justify-center pointer-events-none max-[500px]:hidden">
                <TelegramPhone
                    items={heroChannels}
                    className="z-30 hover:z-50 transition-all duration-300"
                />
            </div>
        </section>
    );
};