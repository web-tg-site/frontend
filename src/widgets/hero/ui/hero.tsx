"use client";

import { useState, useEffect } from "react";
import { LinkButton } from "@/shared/ui";
import { Background } from "./background";
import { TelegramPhone } from "./telegram-phone";
import { BubblesLayer } from "./bubbles-layer";
import { CHANNELS_DATA } from "../config";
import { Headline } from "@/shared/ui/text";

export const Hero = () => {
    // Изначально 100vh, чтобы на сервере и при первой отрисовке не было пусто
    const [heroHeight, setHeroHeight] = useState<string | number>("100vh");

    useEffect(() => {
        // Вычисляем высоту ОДИН РАЗ при монтировании.
        // Мы не вешаем слушатель resize, поэтому высота зафиксируется 
        // и не будет скакать при скролле на мобилках.
        setHeroHeight(window.innerHeight);
    }, []);

    return (
        <section
            className="w-full relative overflow-hidden flex flex-col"
            // Применяем зафиксированную высоту
            style={{ height: heroHeight }}
        >
            <Background />

            <div className="absolute inset-0 z-40 pointer-events-none">
                <BubblesLayer />
            </div>

            <div className="pt-32 flex flex-col justify-center items-center z-30 relative pointer-events-none">
                <div className="pointer-events-auto flex flex-col items-center">
                    <Headline variant="h3" className="text-center mb-10 xl:text-[80px] lg:text-[56px]">
                        Подбор телеграм-каналов под<br />вашу нишу
                    </Headline>
                    <LinkButton href="/#orderSelection">
                        Заказать подборку
                    </LinkButton>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full flex justify-center pointer-events-none max-[500px]:hidden">
                <TelegramPhone
                    items={CHANNELS_DATA}
                    className="z-30 hover:z-50 transition-all duration-300"
                />
            </div>
        </section>
    );
};