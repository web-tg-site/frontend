import { ReactNode } from "react";

export interface AdminSelectOption {
    value: string | number;
    label: ReactNode ;
    keywords?: string; // 👈 Поле для поиска (например, "дом главная home")
}

export interface AdminSelectProps {
    value: string | number | null;
    onChange: (value: string | number | null) => void;
    options: AdminSelectOption[];
    placeholder?: string;
    variant?: "standard" | "alternative";
    error?: string;
    className?: string;
    disabled?: boolean;
    isLoading?: boolean;
    isSearchable?: boolean; // 👈 Флаг, включать ли поиск
}