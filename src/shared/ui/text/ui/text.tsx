import { cn } from '@/shared/utils';
import { TextProps } from '../types/text.props';

export const Text = ({
    variant = '1',
    children,
    className,
    ...props
}: TextProps) => {
    const styles = {
        '1': 'lg:text-[26px] text-[14px] font-medium leading-[1.1]',
        '2': 'lg:text-[20px] text-[16px] font-normal leading-none',
        '3': 'lg:text-[18px] text-[16px] font-normal leading-none',
        '4': 'lg:text-[14px] text-[12px] font-normal leading-none',
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