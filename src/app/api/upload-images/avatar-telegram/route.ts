import { NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import { randomUUID } from "crypto";

export const runtime = 'nodejs';

export async function POST(req: Request) {
    try {
        // 1. Получаем данные формы
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { error: "Файл не найден" }, 
                { status: 400 }
            );
        }

        // 2. Валидация (опционально: проверка типа)
        if (!file.type.startsWith("image/")) {
            return NextResponse.json(
                { error: "Можно загружать только изображения" }, 
                { status: 400 }
            );
        }

        // 3. Подготовка буфера для записи
        const buffer = Buffer.from(await file.arrayBuffer());

        // 4. Генерация уникального имени файла
        // Получаем расширение (например, .jpg)
        const ext = path.extname(file.name);
        // Генерируем имя: "uuid-timestamp.jpg"
        const fileName = `${randomUUID()}-${Date.now()}${ext}`;

        // 5. Определение путей
        // Папка, куда сохраняем (внутри public)
        const uploadDir = path.join(process.cwd(), "public/uploads/channels");
        
        // Создаем папку, если её нет
        await mkdir(uploadDir, { recursive: true });

        // Полный путь к файлу на диске
        const filePath = path.join(uploadDir, fileName);

        // 6. Запись файла
        await writeFile(filePath, buffer);

        // 7. Возвращаем публичный URL
        // Ссылка будет доступна как http://site.com/uploads/channels/filename.jpg
        const fileUrl = `/uploads/channels/${fileName}`;

        return NextResponse.json({ url: fileUrl });

    } catch (error) {
        console.error("Ошибка загрузки файла:", error);
        return NextResponse.json(
            { error: "Ошибка сервера при загрузке файла" }, 
            { status: 500 }
        );
    }
}