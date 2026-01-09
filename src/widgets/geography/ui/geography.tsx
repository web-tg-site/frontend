import { LandingBlock } from "@/shared/ui"
import { Headline, Text } from "@/shared/ui/text"
import { Map } from "./map"

export const Geography = () => {
    return (
        <LandingBlock className="px-7.5 pt-10 lg:pb-[77px] pb-[38px] mb-2.5">
            <div className="mb-8">
                <Headline variant="h4" className="text-black text-[40px] lg:text-[70px] leading-none">
                    География охватов<br/> SWAY по всей России
                </Headline>

                <Text variant="2" className="lg:text-right text-left text-black">
                    Мы работаем с площадками в крупнейших<br/> городах РФ. Наведите на карту,<br/> чтобы увидеть каналы в каждом регионе
                </Text>
            </div>

            <Map />
        </LandingBlock>
    )
}