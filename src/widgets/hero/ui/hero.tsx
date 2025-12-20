import { LinkButton } from "@/shared/ui"
import { Background } from "./background"
import { TelegramPhone } from "./telegram-phone"
import { BubblesLayer } from "./bubbles-layer"
import { CHANNELS_DATA } from "../config"

export const Hero = () => {
    return (
        <div className="w-full h-screen relative overflow-hidden flex flex-col">
            <Background />

            {/* Контент: Текст + Кнопка */}
            <div className="pt-32 flex flex-col justify-center items-center z-40 relative pointer-events-none">
                <div className="pointer-events-auto flex flex-col items-center">
                    <p className="text-white text-[80px] text-center leading-[90%] font-bold mb-10">
                        Подбор телеграм-каналов<br/> под вашу нишу
                    </p>

                    <LinkButton href='/#orderSelection'>
                        Заказать подборку
                    </LinkButton>
                </div>
            </div>
            
            {/* Телефон (Под баблами) */}
            <div className="absolute bottom-0 left-0 w-full flex justify-center z-50 pointer-events-none">
                <TelegramPhone items={CHANNELS_DATA} />
            </div>

            {/* Слой физики (Поверх телефона) */}
            <BubblesLayer />
        </div>
    )
}