import Link from "next/link"
import { DOCUMENTS, SOCIALS_TEXT } from "../config"
import { Logo, ML } from "../icons"
import { SocialButton } from "./social-button"
import { DocumentLink } from "./document-link"

export const RightFooter = () => {
    return (
        <div className="col-span-8 bg-secondary rounded-2xl pt-6 pl-7.5 pr-8.5 pb-8">
            <div className="flex justify-center mb-[23px]">
                <Logo />
            </div>

            <div className="flex justify-between items-start">
                <div className="grid grid-cols-1 gap-3.5">
                    <div className="flex items-center gap-2.5">
                        {SOCIALS_TEXT.map((social, idx) => (
                            <SocialButton 
                                {...social}
                                key={idx}
                            />
                        ))}
                    </div>

                    <Link href='https:/t.me/Max_louj' className="flex items-center gap-3 cursor-pointer">
                        <ML />
                        <p className="text-white/60 text-[14px]">
                            Website by ML Agency
                        </p>
                    </Link>
                </div>
                
                <nav className="grid grid-cols-1 gap-3">
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