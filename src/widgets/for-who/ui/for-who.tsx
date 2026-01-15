import { LandingBlock } from "@/shared/ui"
import { Headline } from "@/shared/ui/text"
import { ForWhoCard } from "./for-who-card"
import Marquee from "react-fast-marquee"
import Image from "next/image"

export const ForWho = () => {
    const images = Array(10).fill(0)

    return (
        <LandingBlock className="py-10 lg:py-15 mb-2.5">
            <Headline variant="h4" className="text-center mb-10 lg:mb-15 text-black">
                Для кого мы работаем?
            </Headline>

            {/* Общая высота контейнера на ПК - 550px */}
            <div className="relative flex flex-col items-center gap-6 min-[501px]:block min-[501px]:h-[550px] lg:h-[550px]">
                
                {/* Marquee в самом центре */}
                <div className="hidden min-[501px]:flex justify-center items-center w-full h-full absolute inset-0 z-10 pointer-events-none">
                    <div className="w-full">
                        <Marquee speed={40}>
                            {images.map((_, index) => (
                                <Image
                                    key={index}
                                    src="./company.jpg"
                                    alt="компания"
                                    width={228}
                                    height={186}
                                    className="max-w-[180px] max-h-[140px] lg:max-w-[200px] lg:max-h-[160px] w-full h-full rounded-2xl border border-black/10 mx-[5px] object-cover bg-white"
                                />
                            ))}
                        </Marquee>
                    </div>
                </div>

                {/* 
                    ЛЕВАЯ КАРТОЧКА 
                    Сдвинута к центру (left-380) и опущена вниз (top-50)
                */}
                <div className="relative w-full max-w-[393px] min-[501px]:max-w-[45%] lg:max-w-[350px] min-[501px]:absolute lg:top-[50px] min-[501px]:left-4 lg:left-[380px]">
                    <ForWhoCard 
                        title="Средний и крупный бизнес"
                        text="Масштабирование охватов, лидогенерация, узнаваемость бренда"
                    />
                </div>

                {/* 
                    ЦЕНТРАЛЬНАЯ НИЖНЯЯ КАРТОЧКА 
                    Приподнята выше (bottom-50)
                */}
                <div className="relative w-full max-w-[393px] min-[501px]:max-w-[80%] lg:max-w-[350px] min-[501px]:absolute lg:bottom-[50px] min-[501px]:left-1/2 min-[501px]:-translate-x-1/2">
                    <ForWhoCard 
                        title="Маркетинговые и рекламные агентства"
                        text="Надёжный партнёр для закупки Telegram-трафика под клиентов"
                        bottom
                    />
                </div>

                {/* 
                    ПРАВАЯ КАРТОЧКА
                    Сдвинута к центру (right-380) и опущена вниз (top-50)
                */}
                <div className="relative w-full max-w-[393px] min-[501px]:max-w-[45%] lg:max-w-[350px] min-[501px]:absolute lg:top-[50px] min-[501px]:right-4 lg:right-[380px]">
                    <ForWhoCard 
                        title="Гос-проекты и институциональные клиенты"
                        text="Масштабирование охватов, лидогенерация, узнаваемость бренда"
                    />
                </div>

            </div>
        </LandingBlock>
    )
}