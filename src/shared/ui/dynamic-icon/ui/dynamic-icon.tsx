import React from "react";
import { LucideProps, HelpCircle } from "lucide-react";
import * as icons from "lucide-react";

interface DynamicIconProps extends LucideProps {
    name: string;
}

export const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
    // Приводим первую букву к верхнему регистру, чтобы 'camera' стала 'Camera'
    const formattedName = name 
        ? name.charAt(0).toUpperCase() + name.slice(1) 
        : "";

    // Получаем компонент из объекта всех иконок
    // Используем (icons as any), так как TS не знает заранее ключи
    const IconComponent = (icons as any)[formattedName] || HelpCircle;

    return <IconComponent {...props} />;
};