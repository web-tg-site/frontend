import Image from "next/image";
import Link from "next/link";
import { LinkButton } from "@/shared/ui";
import { CollectionButton } from "./collection-button";

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

            <div className="flex items-center gap-[6.5px]">
                <CollectionButton />
                
                <LinkButton href='/catalog' className="hidden min-[500px]:block">
                    Перейти в каталог
                </LinkButton>

                <LinkButton href='/catalog' className="block min-[500px]:hidden">
                    В каталог
                </LinkButton>
            </div>
        </header>
    )
}