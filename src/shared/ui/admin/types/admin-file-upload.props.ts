export interface AdminFileUploadProps {
    className?: string;
    /** Текст-плейсхолдер (например: "Загрузить аватарку") */
    placeholder?: string;
    /** Типы файлов (по умолчанию "image/*") */
    accept?: string;
    /** Вариант дизайна (как в AdminInput) */
    variant?: 'standard' | 'alternative';
    /** Текст ошибки */
    error?: string;
    /** Текущий выбранный файл (для управляемого компонента) */
    value?: File | string | null;
    /** Колбек при изменении файла */
    onChange?: (file: File | null) => void;
    name?: string;
    disabled?: boolean;
}