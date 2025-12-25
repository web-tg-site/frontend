import { ReactNode } from "react";

export type TextVariant = '1' | '2' | '3' | '4';

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    variant?: TextVariant;
    children: ReactNode;
    className?: string;
}