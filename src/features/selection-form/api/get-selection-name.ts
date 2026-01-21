import { cookies } from 'next/headers';
import { PersonalSelectionResponse } from '@/shared/types/perosnal-selection-response';

export const getSelectionName = async (id: string): Promise<string> => {
    try {
        // 1. Получаем куки (ОБЯЗАТЕЛЬНО await для Next.js 15)
        const cookieStore = await cookies();
        const allCookies = cookieStore.toString();

        // 2. Формируем URL 
        // ВАЖНО: убедитесь, что путь на бэкенде именно такой. 
        // В вашем axios примере был '/personal-selection/:id'
        const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/admin/personal-selection/${id}`;

        // 3. Делаем запрос
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': allCookies // Передаем куки для прохождения авторизации (401 ошибка исчезнет)
            },
            next: { revalidate: 0 } // Отключаем кэш, чтобы всегда получать актуальное имя
        });

        if (!response.ok) {
            // Если здесь 401, значит куки не передались или сессия невалидна
            console.error(`Ошибка при получении имени подборки: ${response.status}`);
            return 'Подборка';
        }

        const data: PersonalSelectionResponse = await response.json();
        
        // Согласно вашему DTO: Название компании лежит в data.for.name
        return data.for?.name || 'Подборка';

    } catch (error) {
        console.error('Fetch error (getSelectionName):', error);
        return 'Подборка';
    }
}