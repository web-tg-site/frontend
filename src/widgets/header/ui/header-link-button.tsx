"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeaderLinkButtonProps } from "../types";

export const HeaderLinkButton = ({
    href,
    label
}: HeaderLinkButtonProps) => {
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    return (
        <Link
            href={href}
            className={`w-[180px] flex justify-center items-center py-2.5 transition-all cursor-pointer text-white rounded-lg ${
                isHomePage
                    ? "bg-background hover:bg-secondary"
                    : "bg-secondary hover:bg-background"
            }`}
        >
            {label}
        </Link>
    )
}