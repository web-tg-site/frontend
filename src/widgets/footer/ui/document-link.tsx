import Link from "next/link"
import { DocumentLinkProps } from "../types/document-link.props"

export const DocumentLink = ({
    text,
    href
}: DocumentLinkProps) => {
    return (
        <Link
            href={href}
            className="text-white/60 leading-[110%] cursor-pointer transition hover:text-white"
        >
            {text}
        </Link>
    )
}