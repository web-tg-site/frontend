export const parsePrice = (priceStr: string) => {
    const cleanStr = priceStr.replace(/\D/g, '');
    return Number(cleanStr);
}