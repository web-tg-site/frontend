import { StatsData } from "./stats-data";

export interface ChannelEngagementCardProps {
    activePercentage: number;
    stats: StatsData;
    className?: string;
}