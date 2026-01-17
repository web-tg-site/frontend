import { $apiAdmin } from '@/shared/utils';

export interface Payload {
    categoryId: number;
    image: string;
    lectureHall: {
        activePercentage: number;
        statsData: {
            likes: number;
            comments: number;
            reposts: number;
        };
        interestsItems: string[];
        geographyItems: {
            name: string;
            percent: number;
        }[];
        consumption: string;
        howRead: string;
        reaction: string;
        frequency: string;
    };
    name: string;
    description: string;
    subscribers: string;
    coast: string;
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

export const createChannel = async (payload: Payload) => {
    return await $apiAdmin.post('channel/create', payload);
}