import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/shared/**/*.{js,ts,jsx,tsx,mdx}", // Важно для твоих компонентов в shared
        "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/widgets/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
            },
            animation: {
                float: "float 6s ease-in-out infinite",
            },
        },
    },
    plugins: [],
};

export default config;