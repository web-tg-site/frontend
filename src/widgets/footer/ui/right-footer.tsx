import Link from "next/link"
import { DOCUMENTS, SOCIALS_TEXT } from "../config"
import { Logo, ML } from "../icons"
import { SocialButton } from "./social-button"
import { DocumentLink } from "./document-link"

export const RightFooter = () => {
    return (
        <div className="lg:col-span-8 bg-secondary rounded-2xl pt-6 pl-7.5 pr-8.5 pb-8">
            <div className="flex justify-center mb-[23px]">
                <Logo />
            </div>

            <div className="flex justify-between items-end">
                <div className="grid grid-cols-1 gap-3.5">
                    <div className="flex lg:flex-row flex-col lg:items-center items-start lg:gap-2.5 gap-1">
                        {SOCIALS_TEXT.map((social, idx) => (
                            <SocialButton 
                                {...social}
                                key={idx}
                            />
                        ))}
                    </div>

                    <Link href='https://t.me/Max_louj' target="_blank" className="flex items-center gap-3 cursor-pointer">
                        <ML />
                        <p className="text-white/60 lg:text-[14px] text-[8px]">
                            Website by MLAgency
                        </p>
                    </Link>
                </div>
                
                <nav className="grid grid-cols-1 items-end justify-end text-right gap-3 max-[500px]:max-w-[166px]">
                    {DOCUMENTS.map((doc, idx) => (
                        <DocumentLink 
                            {...doc}
                            key={idx}
                        />
                    ))}
                </nav>
            </div>
        </div>
    )
}