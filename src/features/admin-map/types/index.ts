// DTO для отправки на бэк (POST/PUT Body)
export interface MapCreateDto {
    channelId: number;
    left: number;
    top: number;
}

// Вспомогательный тип для мутации обновления (Front-only)
export interface UpdateMapPinPayload extends MapCreateDto {
    id: number; // ID нужен, чтобы сформировать URL
}