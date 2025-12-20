import { ReactNode } from "react";

export interface LandingBlockProps {
    children: ReactNode;
    variant?: "light" | "dark";
    px?: number;
    py?: number;
}