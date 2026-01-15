import axios from "axios";

export const $apiAdmin = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_HOST}/api/admin`
});

// Функция для получения куки без библиотек
function getCookie(name: string) {
    if (typeof document === 'undefined') return null; // Защита от SSR
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
}

$apiAdmin.interceptors.request.use((config) => {
    const token = getCookie('accessToken');

    console.log(token);

    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});