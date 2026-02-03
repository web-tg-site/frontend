import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import path from "path";
import fs from "fs";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const consent = body?.consent === true;

        // 1. Определяем IP
        let ip = req.headers.get("x-forwarded-for") ?? "unknown";
        if (ip.includes(",")) {
            ip = ip.split(",")[0].trim();
        }

        // 2. Данные с русскими ключами (заголовки в Excel)
        const newData = {
            "IP-адрес": ip,
            "Решение": consent ? "Принял" : "Отклонил",
            "Дата и время": new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" }),
        };

        // 3. Пути: папка data в корне проекта (frontend)
        const dataDir = path.join(process.cwd(), "data");
        const filePath = path.join(dataDir, "cookie_stats.xlsx");

        // 4. Создаём папку data, если её нет
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        let workbook: XLSX.WorkBook;
        let worksheet: XLSX.WorkSheet;

        if (fs.existsSync(filePath)) {
            const fileBuffer = fs.readFileSync(filePath);
            workbook = XLSX.read(fileBuffer, { type: "buffer" });
            const sheetName = workbook.SheetNames[0];
            worksheet = workbook.Sheets[sheetName];

            const existingData = XLSX.utils.sheet_to_json(worksheet);
            existingData.push(newData);
            worksheet = XLSX.utils.json_to_sheet(existingData);
            workbook.Sheets[sheetName] = worksheet;
        } else {
            workbook = XLSX.utils.book_new();
            worksheet = XLSX.utils.json_to_sheet([newData]);
            XLSX.utils.book_append_sheet(workbook, worksheet, "Статистика Cookie");
        }

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
        fs.writeFileSync(filePath, excelBuffer);

        return NextResponse.json({ success: true });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}