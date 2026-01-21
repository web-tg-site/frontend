import { LandingBlock, Title } from "@/shared/ui"
import { ChannelEngagementCard, ConsumptionCard, FrequencyCard, GeographyCard, HowReadCard, Interests, ReactionCard } from "../cards/lacture-hall"

interface LectureHallProps {
    activePercentage: number,
    statsData: {
        likes: number,
        comments: number,
        reposts: number,
    },
    interestsItems: string[],
    geographyItems: {
        name: string,
        percent: number
    }[],
    consumption: string,
    howRead: string,
    reaction: string,
    frequency: string
}

export const LectureHall = ({
    activePercentage,
    statsData,
    interestsItems,
    geographyItems,
    consumption,
    howRead,
    reaction,
    frequency
}: LectureHallProps) => {
    return (
        <LandingBlock className="py-8 px-7.5">
            <Title className="mb-8 text-black">
                Аудитория
            </Title>

            <div className="flex flex-col gap-2.5 min-[500px]:grid min-[500px]:grid-cols-2 min-[500px]:items-start lg:grid-cols-6 lg:auto-rows-min">
                
                <div className="flex flex-col gap-2.5 w-full lg:contents">
                    <ChannelEngagementCard 
                        activePercentage={activePercentage} 
                        stats={statsData}
                        className="w-full lg:col-span-2 lg:row-span-2 lg:h-full"
                    />

                    <Interests 
                        items={interestsItems}
                        className="w-full lg:col-span-2 lg:h-full"
                    />
                </div>

                <div className="flex flex-col gap-2.5 w-full lg:contents">
                    
                    <div className="flex flex-col gap-2.5 lg:col-span-2 lg:h-full max-[500px]:max-h-auto">
                        <ConsumptionCard 
                            text={consumption}
                            className="w-full lg:flex-1"
                        />
                        <HowReadCard 
                            text={howRead}
                            className="w-full lg:flex-1"
                        />
                    </div>

                    <GeographyCard 
                        items={geographyItems}
                        className="w-full lg:col-span-4 lg:h-full"
                    />

                    <ReactionCard 
                        text={reaction}
                        className="w-full lg:col-span-3 lg:h-full max-[500px]:max-h-auto"
                    />

                    <FrequencyCard 
                        text={frequency}
                        className="w-full lg:col-span-3 lg:h-full"
                    />
                </div>
            </div>
        </LandingBlock>
    )
}