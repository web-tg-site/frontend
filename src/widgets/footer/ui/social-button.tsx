import Link from "next/link";
import { SocialButtonProps } from "../types/social-button.props";

export const SocialButton = ({
    text,
    href
}: SocialButtonProps) => {
    return (
        <Link
            href={href}
            target="_blank"
            className="lg:py-2.5 py-1.5 lg:px-4.5 px-3 border border-white transition duration-300 text-white hover:text-black hover:bg-white cursor-pointer rounded-[54px] lg:text-[16px] text-[12px]"
        >
            {text}
        </Link>
    )
}