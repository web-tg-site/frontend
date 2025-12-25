import { LandingBlock } from "@/shared/ui";
import { Headline } from "@/shared/ui/text";
import { Channels, Cities, Coverage, Niches } from "./cards";

export const WeInNumber = () => {
    return (
        <LandingBlock className="pt-10 px-8 pb-15 mb-3">
            <Headline variant="h4" className="text-black text-center mb-11.5">
                Мы в цифрах
            </Headline>

            <div className="grid grid-cols-12 gap-2.5 w-full">
                <Channels />
                <Niches />
                <Cities />
                <Coverage />
            </div>
        </LandingBlock>
    )
}