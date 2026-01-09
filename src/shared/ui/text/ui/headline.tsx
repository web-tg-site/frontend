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
        h1: 'lg:text-[170px] text-[46px] leading-[0.9]',
        h2: 'text-[110px] leading-[1.15]', 
        h3: 'lg:text-[80px] text-[32px] leading-[0.9]',
        h4: 'lg:text-[70px] text-[24px] leading-none',
        h5: 'lg:text-[60px] min-[500px]:text-[30px] text-[24px] leading-none',
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