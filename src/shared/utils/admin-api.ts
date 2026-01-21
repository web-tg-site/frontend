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

        // ✅ ИСПРАВЛЕНИЕ:
        // Проверяем, не является ли этот запрос попыткой логина.
        // Если URL запроса содержит '/login', мы просто возвращаем ошибку,
        // чтобы React компонент мог вывести сообщение "Неверный пароль".
        if (error.config.url && error.config.url.includes('/login')) {
            throw error;
        }

        // Если пришел 401 (Unauthorized) и это НЕ логин
        if (error.response?.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
            
            if (typeof window !== 'undefined') {
                // Дополнительная защита: не перезагружать, если мы уже на странице авторизации
                if (window.location.pathname !== '/admin/auth') {
                    window.location.href = '/admin/auth';
                }
            }
        }
        
        throw error;
    }
)