import { NextResponse } from "next/server";
import path from "path";
import { unlink } from "fs/promises";
import { existsSync } from "fs";

export const runtime = 'nodejs';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { url } = body;

        if (!url || typeof url !== 'string') {
            return NextResponse.json({ message: "URL не предоставлен" }, { status: 400 });
        }

        // Извлекаем имя файла из URL (например, из "/upload-images/.../file.jpg" берем "file.jpg")
        const fileName = path.basename(url);

        // Формируем полный путь к файлу
        const filePath = path.join(process.cwd(), "public/uploads/channels", fileName);

        // Проверяем, существует ли файл перед удалением
        if (existsSync(filePath)) {
            await unlink(filePath);
            console.log(`Файл удален: ${filePath}`);
        } else {
            console.warn(`Файл не найден для удаления: ${filePath}`);
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Ошибка при удалении файла:", error);
        return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
    }
}