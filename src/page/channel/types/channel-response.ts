export interface ChannelResponse {
    id: number;
    name: string;
    image: string;
    description: string;
    subscribers: string;
    coast: string;
    lectureHall: {
        stats: {
            likes: number;
            comments: number;
            reposts: number;
        };
        interests: string[];
        geography: {
            name: string,
            percent: number
        }[];
    };
    content: {
        fomat: string[];
        stats: {
            posts: string;
            month: string
        }
    };
    priceAdd: {
        add: string,
        integration: string,
        repost: string
    };
    category: {
        name: string;
        color: string;
        icon: string;
    }
}