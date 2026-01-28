'use client'

import Marquee from "react-fast-marquee";
import { WeCard } from "../we-card";
import { CHANNELS } from "../../config/channels";
import { ChannelBadge } from "../channel-badge";
import { Numbers, Text } from "@/shared/ui/text";
import { useChannelNumber } from "../../api/use-channel-number";

export const Channels = () => {
    const { data } = useChannelNumber();

    const channels = data ?? CHANNELS;

    return (
        <div className="col-span-1 min-[1025px]:col-span-5">
            <WeCard>
                <div className="pt-10 pb-[62px] w-full overflow-hidden">
                    <Marquee speed={40} pauseOnHover={true}>
                        {channels.map((item) => (
                            <ChannelBadge key={item.id} item={item} />
                        ))}
                    </Marquee>
                </div>
                <div className="pb-7.5 px-5 relative z-20">
                    <Numbers className="text-black">500+</Numbers>
                    <Text variant="3" className="text-black/60">Telegram-каналов в каталоге</Text>
                </div>
            </WeCard>
        </div>
    )
}