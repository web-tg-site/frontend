import { cn } from '@/shared/utils';
import { NumbersProps } from '../types/numbers.props';

export const Numbers = ({
    variant = '1',
    children,
    className,
    ...props
}: NumbersProps) => {
    const styles = {
        '1': 'lg:text-[100px] text-[70px]',
        '2': 'lg:text-[33px] text-[20px]',
    };

    return (
        <p
            className={cn(
                'font-medium leading-none',
                'text-white',
                styles[variant],
                className
            )}
            {...props}
        >
            {children}
        </p>
    );
};