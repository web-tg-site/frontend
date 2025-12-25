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
        h2: 'text-[30px] font-medium' ,
        h3: 'text-[26px] font-medium',
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