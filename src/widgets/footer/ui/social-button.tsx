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
            className="py-2.5 px-4.5 border border-white transition duration-300 text-white hover:text-black hover:bg-white cursor-pointer rounded-[54px]"
        >
            {text}
        </Link>
    )
}