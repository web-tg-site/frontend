export interface CreateChannelForm {
    name: string;
    categoryId: number | string;
    socialType: string;
    image: File | string | null;
    description: string;
    subscribers: string;
    coast: string;
    lectureHall: {
        activePercentage: string;
        statsData: {
            likes: string;
            comments: string;
            reposts: string;
        };
        interestsItems: { value: string }[]; 
        geographyItems: { name: string; percent: string }[];
        consumption: string;
        howRead: string;
        reaction: string;
        frequency: string;
    };
    content: {
        formats: string[];
        stats: {
            overallCoverage: string;
            monthlyCoverage: string;
            er: string;
        };
    };
    priceAdd: {
        advertisement: string;
        integration: string;
        repost: string;
    };
}