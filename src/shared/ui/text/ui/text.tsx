import { cn } from '@/shared/utils';
import { TextProps } from '../types/text.props';

export const Text = ({
    variant = '1',
    children,
    className,
    ...props
}: TextProps) => {
    const styles = {
        '1': 'text-[26px] font-medium leading-[1.1]',
        '2': 'text-[20px] font-normal leading-none',
        '3': 'text-[18px] font-normal leading-none',
        '4': 'text-[14px] font-normal leading-none',
    };

    return (
        <p
            className={cn(
                styles[variant],
                'text-white',
                className
            )}
            {...props}
        >
            {children}
        </p>
    );
};