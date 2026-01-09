import { cn } from '@/shared/utils';
import { TitleProps } from '../types/title.props';

export const Title = ({
    variant = 'h1',
    children,
    className,
    ...props
}: TitleProps) => {
    const Tag = variant;

    const styles = {
        h1: 'text-[32px] font-semibold',
        h2: 'lg:text-[30px] text-[24px] font-medium' ,
        h3: 'lg:text-[26px] text-[14px] font-medium',
    };

    return (
        <Tag
            className={cn(
                'leading-0',
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