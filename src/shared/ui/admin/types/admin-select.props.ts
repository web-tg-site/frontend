export interface AdminSelectOption {
    value: string | number; // 👈 Строка или Число
    label: string;
}

export interface AdminSelectProps {
    value?: string | number | null; // 👈 Принимаем число
    onChange: (value: string | number | null) => void; // 👈 Возвращаем число
    
    options: AdminSelectOption[];
    placeholder?: string;
    variant?: 'standard' | 'alternative';
    error?: string;
    className?: string;
    disabled?: boolean;
    isLoading?: boolean;
}