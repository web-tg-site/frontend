import { ReactNode } from "react";

export type TitleVariant = 'h1' | 'h2' | 'h3';

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    variant?: TitleVariant;
    children: ReactNode;
    className?: string;
}