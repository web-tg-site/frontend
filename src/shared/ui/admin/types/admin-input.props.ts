import { InputHTMLAttributes, ReactNode } from "react";

export interface AdminInputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    icon?: ReactNode;
    onIconClick?: () => void;
    variant?: 'standard' | 'alternative';
}