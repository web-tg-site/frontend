import { TelegramChannel } from "../types";

export const CHANNELS_DATA: TelegramChannel[] = [
    {
        id: 1,
        title: "Пульс Москвы",
        message: "Доброе утро, дорогие читатели...",
        time: "ПН",
        avatarUrl: "./photo_2025-12-19_13-24-09.jpg",
        href: "/catalog/msk",
        isPinned: true
    },
    {
        id: 2,
        title: "Московский метр",
        message: "GIF",
        time: "ПН",
        avatarUrl: "./photo_2025-11-24_10-09-11.jpg",
        href: "/catalog/metr",
        isPinned: true,
        isVerified: true
    },
    {
        id: 3,
        title: "Новости IT",
        message: "OpenAI показала новую модель Sora...",
        time: "10:45",
        avatarUrl: "https://placehold.co/120/blue/white?text=IT",
        href: "/catalog/it"
    },
    {
        id: 4,
        title: "Бобряшов, код и пиксели",
        message: "В этом году я активно экспериментировал с музыкальными площадками. И в какой-то момент наконец-то пересилил себя и окончательно переехал на Spotify.",
        time: "Вчера",
        avatarUrl: "./photo_2025-12-21_03-46-50.jpg",
        href: "/catalog/design"
    },
    {
        id: 5,
        title: "ML Agency",
        message: "Russian Design Forum     Не закидываю обычно работы какие-то по графу, но тут много чего накопилось для одного из наших клиентов, уже как",
        time: "Вчера",
        avatarUrl: "./photo_2025-12-21_03-46-51.jpg",
        href: "/catalog/crypto"
    },
    {
        id: 6,
        title: "шизоид с гранатой",
        message: "друзья, важный факт, я кушаю капустку тушеную",
        time: "ПТ",
        avatarUrl: "./photo_2025-11-21_09-43-31.jpg",
        href: "/catalog/startup"
    }
];