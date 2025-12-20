import Image from "next/image";
import Link from "next/link";
import { LINKS } from "../config";
import { LinkButton } from "@/shared/ui";
import { HeaderLinkButton } from "./header-link-button";

export const Header = () => {
    return (
        <header className="fixed top-0 w-full flex justify-between items-center pt-4 pr-2.5 pl-4.5 z-99">
            <Link href='/' className="cursor-pointer">
                <Image 
                    src='/logo.svg'
                    alt='Логотип'
                    width={115}
                    height={37}
                    className="w-full h-full"  
                />
            </Link>

            <nav className="grid grid-cols-3 gap-4.5">
                {LINKS.map((link, idx) => (
                    <HeaderLinkButton {...link} key={idx} />
                ))}
            </nav>

            <LinkButton href='/catalog'>
                Перейти в каталог
            </LinkButton>
        </header>
    )
}