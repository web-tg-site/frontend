export interface ChannelResponse {
    description: string;
    id: number;
    name: string;
    image: string;
    subscribers: string;
    coast: string;
    content: {
        formats: string[];
        stats: {
            overallCoverage: string;
            monthlyCoverage: string;
            er: string;
        }
    };
    lectureHall: {
        activePercentage: number;
        statsData: {
            likes: number;
            comments: number;
            reposts: number;
        };
        interestsItems: string[];
        gepgraphyItems: {
            name: string;
            percent: number;
        }[]
        howRead: string;
        reaction: string;
        frequency: string;
    };
    priceAdd: {
        advertisement: string;
        integration: string;
        repost: string;
    };
    categoryId: number;
    category: {
        id: number;
        name: string;
        color: string;
        icon: string;
    }
}