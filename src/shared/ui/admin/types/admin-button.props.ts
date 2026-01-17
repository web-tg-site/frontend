import { ReactNode } from "react";
import { HTMLMotionProps } from "framer-motion";

export interface AdminButtonProps extends HTMLMotionProps<"button"> {
    children: ReactNode;
    loading?: boolean;
    href?: never;
    variant?: 'primary' | 'secondary'; // Добавили вариант
}