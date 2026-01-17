import { cookies } from 'next/headers';

export const getChannelName = async (id: string): Promise<string> => {
    try {
        // 1. Получаем куки текущего пользователя (Next.js 15 требует await)
        const cookieStore = await cookies();
        const allCookies = cookieStore.toString(); // Превращает куки в строку "key=value; key2=value2"

        // 2. Формируем URL
        const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/admin/channel/${id}`;

        // 3. Делаем запрос
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Эмулируем withCredentials: true, передавая куки вручную
                'Cookie': allCookies 
            },
            // next: { revalidate: 0 } // Если нужно отключить кэширование
        });

        if (!response.ok) {
            console.error(`Ошибка при получении имени канала: ${response.status}`);
            return 'Канал'; // Возвращаем дефолтное значение при ошибке
        }

        const data = await response.json();
        return data.name || 'Канал';

    } catch (error) {
        console.error('Fetch error:', error);
        return 'Канал';
    }
}