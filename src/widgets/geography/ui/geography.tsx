import { LandingBlock } from "@/shared/ui"
import { Headline, Text } from "@/shared/ui/text"
import { Map } from "./map"

export const Geography = () => {
    return (
        <LandingBlock className="px-7.5 pt-10 pb-80 mb-2.5">
            <div className="mb-8">
                <Headline variant="h4" className="text-black">
                    География охватов<br/> SWAY по всей России
                </Headline>

                <Text variant="2" className="text-right text-black">
                    Мы работаем с площадками в крупнейших<br/> городах РФ. Наведите на карту,<br/> чтобы увидеть каналы в каждом регионе
                </Text>
            </div>

            <Map />
        </LandingBlock>
    )
}