import { cn } from '@/shared/utils';
import { NumbersProps } from '../types/numbers.props';

export const Numbers = ({
    variant = '1',
    children,
    className,
    ...props
}: NumbersProps) => {
    const styles = {
        '1': 'text-[100px]',
        '2': 'text-[33px]',
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