export interface SwitchProps {
    placeholder: string;
    checked: boolean;
    onClick: (checked: boolean) => void;
    className?: string;
}
