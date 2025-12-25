import { IChannel } from "@/entities/channel";

export const CHANNEL_MOCK: IChannel[] = [
    {
        id: 1,
        // Заменил на изображение с розовой эстетикой/цветами
        image: "https://images.unsplash.com/photo-1512413914633-b5043f4041ea?q=80&w=200&auto=format&fit=crop",
        name: "Критик в шёлковом халате",
        category: {
            id: 1,
            name: "Красота",
            color: "#FF4545" // Красный
        },
        subscribers: "2млн",
        price: 211000
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=200&auto=format&fit=crop",
        name: "Tech Insider",
        category: {
            id: 2,
            name: "Технологии",
            color: "#3B82F6" // Синий
        },
        subscribers: "850к",
        price: 154000
    },
    {
        id: 3,
        // Заменил на изображение с Биткоином
        image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=200&auto=format&fit=crop",
        name: "Крипто Барон",
        category: {
            id: 3,
            name: "Бизнес",
            color: "#10B981" // Зеленый
        },
        subscribers: "1.2млн",
        price: 450000
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=200&auto=format&fit=crop",
        name: "Кадр дня",
        category: {
            id: 4,
            name: "Искусство",
            color: "#8B5CF6" // Фиолетовый
        },
        subscribers: "42к",
        price: 15000
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=200&auto=format&fit=crop",
        name: "Вкусная жизнь",
        category: {
            id: 5,
            name: "Еда",
            color: "#F59E0B" // Оранжевый
        },
        subscribers: "320к",
        price: 45000
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=200&auto=format&fit=crop",
        name: "Travel Mania",
        category: {
            id: 6,
            name: "Путешествия",
            color: "#06B6D4" // Циан
        },
        subscribers: "125к",
        price: 67500
    },
    {
        id: 7,
        image: "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?q=80&w=200&auto=format&fit=crop",
        name: "Психология успеха",
        category: {
            id: 7,
            name: "Психология",
            color: "#EC4899" // Розовый
        },
        subscribers: "560к",
        price: 98000
    },
    {
        id: 8,
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=200&auto=format&fit=crop",
        name: "Киберспорт Live",
        category: {
            id: 8,
            name: "Игры",
            color: "#6366F1" // Индиго
        },
        subscribers: "89к",
        price: 25000
    }
];

export const CHANNEL_MOCKS: IChannel[] = [
    ...CHANNEL_MOCK,
    ...CHANNEL_MOCK,
    ...CHANNEL_MOCK,
    ...CHANNEL_MOCK,
    ...CHANNEL_MOCK,
    ...CHANNEL_MOCK,
    ...CHANNEL_MOCK,
    ...CHANNEL_MOCK,
    ...CHANNEL_MOCK,
    ...CHANNEL_MOCK,
    ...CHANNEL_MOCK,
    ...CHANNEL_MOCK,
    ...CHANNEL_MOCK,
    ...CHANNEL_MOCK,
    ...CHANNEL_MOCK,
    ...CHANNEL_MOCK,
    ...CHANNEL_MOCK,
    ...CHANNEL_MOCK,
]