import { ReactNode } from "react";

export interface AdminToggleOption {
    value: string;
    label: ReactNode; // Чтобы можно было передать текст "Ж" или иконку
}

export interface AdminToggleGroupProps {
    value: string;
    onChange: (value: string) => void;
    options: AdminToggleOption[];
    error?: string;
    className?: string;
}