import { ReactNode } from 'react';

export type HeadlineVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

export interface HeadlineProps extends React.HTMLAttributes<HTMLHeadingElement> {
    variant?: HeadlineVariant;
    children: ReactNode;
    className?: string;
}