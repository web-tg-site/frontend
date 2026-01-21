import { LandingBlock, Title } from "@/shared/ui"
import { FormatCard } from "../cards/content"
import { StatsCard } from "../cards/content/stats-card"

interface ContentProps {
    formats: string[];
    stats: {
        overallCoverage: string;
        monthlyCoverage: string;
        er: string;
    }
}

export const Content = ({
    formats,
    stats
}: ContentProps) => {
    return (
        <LandingBlock className="py-8 px-7.5">
            <Title className="mb-8 text-black">
                Контент
            </Title>

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-2.5">
                <FormatCard 
                    items={formats}
                />

                <StatsCard 
                    overallCoverage={stats.overallCoverage}
                    monthlyCoverage={stats.monthlyCoverage}
                    er={stats.er}
                />
            </div>
        </LandingBlock>
    )
}