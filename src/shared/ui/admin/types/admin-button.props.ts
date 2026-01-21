import { ButtonHTMLAttributes, ReactNode } from "react";

export interface AdminButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    loading?: boolean;
    href?: never; // Запрещаем передавать href, так как это кнопка
    variant?: 'primary' | 'secondary';
}