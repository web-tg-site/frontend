import Link from 'next/link';
import { cn } from '@/shared/utils';
import { SocialLinkProps } from '../types/social-link.props';

export const SocialLink = ({ 
    href, 
    icon: Icon, 
    hoverClass, 
    className 
}: SocialLinkProps) => {
    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn("inline-block", className)}
        >
            <Icon 
                className={cn(
                    "transition-colors duration-300 ease-in-out",
                    hoverClass
                )} 
            />
        </Link>
    );
};