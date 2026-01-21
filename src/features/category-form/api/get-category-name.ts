import { cookies } from 'next/headers';

export const getCategoryName = async (id: number | string): Promise<string> => {
    try {
        // 1. Получаем куки текущего пользователя
        const cookieStore = await cookies();
        const allCookies = cookieStore.toString();

        // 2. Формируем URL (используем тот же путь, что и в $apiAdmin: /api/admin/category/:id)
        const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/admin/category/${id}`;

        // 3. Делаем запрос
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Прокидываем куки, чтобы бэкенд понял, кто делает запрос
                'Cookie': allCookies 
            },
            // next: { revalidate: 60 } // Можно включить кэширование при необходимости
        });

        if (!response.ok) {
            console.error(`Ошибка при получении имени категории (${id}): ${response.status}`);
            return 'Категория';
        }

        const data = await response.json();
        
        return data.name || 'Категория';

    } catch (error) {
        console.error('Fetch error (getCategoryName):', error);
        return 'Категория';
    }
}