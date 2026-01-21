import { TextareaHTMLAttributes } from "react";

export interface AdminTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: string;
    variant?: 'standard' | 'alternative';
    // Можно добавить maxRows или minRows, если нужно
}