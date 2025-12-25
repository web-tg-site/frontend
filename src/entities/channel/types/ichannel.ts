export interface IChannel { 
    id: number;
    image: string;
    name: string;
    category: {
        id: number;
        name: string;
        color: string;
    };
    subscribers: string;
    price: number;
} 