export const parseSubscribers = (str: string): number => {
    if (!str) return 0;
    const s = str.toLowerCase().replace(/,/g, '.');
    if (s.includes("млн")) return parseFloat(s) * 1_000_000;
    if (s.includes("к") || s.includes("k")) return parseFloat(s) * 1_000;
    return parseFloat(s) || 0;
};