/**
 * Слайс массива для постраничного вывода на клиенте.
 */
export function getPaginatedItems<T>(items: T[], page: number, pageSize: number): T[] {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
}

/**
 * Количество страниц по общему числу элементов и размеру страницы.
 */
export function getTotalPages(totalItems: number, pageSize: number): number {
    if (pageSize <= 0) return 0;
    return Math.max(1, Math.ceil(totalItems / pageSize));
}
