import { LandingBlock } from "@/shared/ui"
import { Headline } from "@/shared/ui/text"
import { ForWhoCard } from "./for-who-card"
import Marquee from "react-fast-marquee"
import Image from "next/image"

export const ForWho = () => {
    return (
        <LandingBlock className="py-15 mb-2.5">
            <Headline variant="h4" className="text-center mb-15 text-black">
                Для кого мы работаем?
            </Headline>

            <div className="h-[786px] relative flex justify-center">
                <div className="absolute top-0 left-[131px]">
                    <ForWhoCard 
                        title="Средний и крупный бизнес"
                        text="Масштабирование охватов, лидогенерация, узнаваемость бренда"
                    />
                </div>

                <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                    <ForWhoCard 
                        title="Маркетинговые и рекламные агентства"
                        text="Надёжный партнёр для закупки Telegram-трафика под клиентов"
                        bottom
                    />
                </div>

                <div className="absolute top-0 right-[131px]">
                    <ForWhoCard 
                        title="Гос-проекты и институциональные клиенты"
                        text="Масштабирование охватов, лидогенерация, узнаваемость бренда"
                    />
                </div>

                <Marquee speed={40}>
                    {Array(10).fill(0).map((_, index) => (
                        <Image
                            src='./company.jpg'
                            alt="компания"
                            width={228}
                            height={186}
                            className="max-w-[228px] max-h-[186px] w-full hf-ull rounded-2xl border border-black/10 mx-[5px]"
                        />
                    ))}
                </Marquee>
            </div>
        </LandingBlock>
    )
}