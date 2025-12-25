import Link from "next/link"
import { FooterLinkProps } from "../types/footer-link.props"

export const FooterLink = ({
    text,
    href
}: FooterLinkProps) => {
    return (
        <Link 
            href={href}
            className="text-white/60 transition hover:text-white cursor-pointer text-[22px] leading-none"
        > 
            {text}
        </Link>
    )
}