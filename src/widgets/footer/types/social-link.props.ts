export interface SocialLinkProps {
    href: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    hoverClass?: string;
    className?: string;
}