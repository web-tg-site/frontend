import { cn } from '@/shared/utils';
import { HeadlineProps } from '../types/headline.props';

export const Headline = ({
    variant = 'h1',
    children,
    className,
    ...props
}: HeadlineProps) => {
    const Tag = variant;

    const styles = {
        h1: 'text-[170px] leading-[0.9]',
        h2: 'text-[110px] leading-[1.15]', 
        h3: 'text-[80px] leading-[0.9]',
        h4: 'text-[70px] leading-none',
        h5: 'text-[60px] leading-none',
    };

    return (
        <Tag
            className={cn(
                'font-semibold',
                'text-white',
                styles[variant],
                className
            )}
            {...props}
        >
            {children}
        </Tag>
    );
};