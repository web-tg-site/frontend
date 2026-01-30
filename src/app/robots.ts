import type { MetadataRoute } from "next";

const DOMAIN = "https://swaymedia.ru";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin/", "/api/", "/personal-selection/"],
        },
        sitemap: `${DOMAIN}/sitemap.xml`,
    };
}
