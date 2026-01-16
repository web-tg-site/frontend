import axios from "axios";

export const $apiAdmin = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_HOST}/api/admin`,
    headers: {
        'Content-Type': 'application/json',
    },
    // ВАЖНО: Это заставляет браузер отправлять httpOnly куки на бэкенд
    withCredentials: true 
});

// Интерцептор для обработки ошибок
$apiAdmin.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config;

        // Если пришел 401 (Unauthorized) и это не повторная попытка
        if (error.response?.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
            
            // Токен протух или неверен.
            // Редиректим на страницу входа
            if (typeof window !== 'undefined') {
                window.location.href = '/admin/auth';
            }
        }
        
        throw error;
    }
);