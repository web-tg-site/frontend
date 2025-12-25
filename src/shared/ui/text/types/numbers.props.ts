import { ReactNode } from "react";

export type NumbersVariant = '1' | '2';

export interface NumbersProps extends React.HTMLAttributes<HTMLParagraphElement> {
    variant?: NumbersVariant;
    children: ReactNode;
    className?: string;
}