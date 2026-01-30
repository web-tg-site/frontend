import type { MetadataRoute } from "next";

const DOMAIN = "https://swaymedia.ru";

interface ChannelResponse {
    slug: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const base: MetadataRoute.Sitemap = [
        { url: DOMAIN, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
        { url: `${DOMAIN}/catalog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
        { url: `${DOMAIN}/my-collections`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    ];

    try {
        const apiHost = process.env.NEXT_PUBLIC_API_HOST;
        if (apiHost) {
            const res = await fetch(`${apiHost}/channel`, { next: { revalidate: 3600 } });
            if (res.ok) {
                const channels: ChannelResponse[] = await res.json();
                const channelUrls: MetadataRoute.Sitemap = channels.map((ch) => ({
                    url: `${DOMAIN}/channel/${ch.slug}`,
                    lastModified: new Date(),
                    changeFrequency: "weekly" as const,
                    priority: 0.8,
                }));
                return [...base, ...channelUrls];
            }
        }
    } catch {
        // API недоступен при сборке — возвращаем только статические URL
    }

    return base;
}
