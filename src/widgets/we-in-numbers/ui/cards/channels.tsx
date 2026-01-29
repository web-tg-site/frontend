'use client'

import Marquee from "react-fast-marquee";
import { WeCard } from "../we-card";
import { CHANNELS } from "../../config/channels";
import { ChannelBadge } from "../channel-badge";
import { Numbers, Text } from "@/shared/ui/text";
import { useChannelNumber } from "../../api/use-channel-number";
import { cn } from "@/shared/utils";
import { CARD_CLASSES } from "../config/card-classes";
import { NUMBER_CLASSES } from "../config/number-classes";

export const Channels = () => {
    const { data } = useChannelNumber();

    const channels = data ?? CHANNELS;

    return (
        <div className="col-span-1 min-[1025px]:col-span-5">
            <div className="grid grid-cols-1 gap-2">
                <WeCard>
                    <div className="py-1 w-full overflow-hidden">
                        <Marquee speed={40} pauseOnHover={true}>
                            {channels.map((item) => (
                                <ChannelBadge key={item.id} item={item} />
                            ))}
                        </Marquee>
                    </div>
                </WeCard>

                <WeCard className={cn(CARD_CLASSES)}>
                    <Numbers className={NUMBER_CLASSES}>
                        500+
                    </Numbers>

                    <Text variant="3" className="text-black/60">
                        Telegram-каналов в каталоге
                    </Text>
                </WeCard>

                <WeCard className={cn(CARD_CLASSES, "justify-end")}>
                    <Numbers className={NUMBER_CLASSES}>
                        50+
                    </Numbers>

                    <Text variant="3" className="text-black/60">
                        VK сообществ
                    </Text>
                </WeCard>

                <WeCard className={cn(CARD_CLASSES)}>
                    <Numbers className={NUMBER_CLASSES}>
                        20+
                    </Numbers>

                    <Text variant="3" className="text-black/60">
                        MAX каналов
                    </Text>
                </WeCard>
            </div>
        </div>
    )
}