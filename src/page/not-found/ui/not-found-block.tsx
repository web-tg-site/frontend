import { cn } from "@/shared/utils"
import Link from "next/link"
import React from "react"

export const NotFoundBlock = ({
    red = false,
    className = "",
    children,
    href
}: {
    red?: boolean,
    className?: string,
    children: React.ReactNode,
    href?: string
}) => {

    if(href) {
        return (
            <Link href={href} className={cn("rounded-2xl p-5", red ? "bg-[#FF383C]" : "bg-black", className)}>
                {children}
            </Link>
        )
    }

    return (
        <div className={cn("rounded-2xl p-5", red ? "bg-[#FF383C]" : "bg-black", className)}>
            {children}
        </div>
    )
}