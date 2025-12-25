import { Title } from "@/shared/ui/text"
import { LINKS } from "../config"
import { FooterLink } from "./footer-link"
import { SOCIALS } from "../config"
import { SocialLink } from "./social-link"

export const LeftFooter = () => {
    return (
        <div className="py-[25px] pl-6.5 pr-10 bg-secondary rounded-2xl col-span-4">
            <div className="mb-[123px]">
                <Title variant="h3" className="mb-5">
                    Навигация
                </Title>

                <p className="text-white/60 text-[12px] leading-[110%] max-w-[204px]">
                    *Instagram принадлежит компании Meta, признанной экстремистской организацией и запрещённой в РФ
                </p>
            </div>

            <div className="flex justify-between items-end">
                <nav className="grid grid-cols-1 gap-3">
                    {LINKS.map((link, idx) => (
                        <FooterLink 
                            {...link}
                            key={idx}
                        />
                    ))}
                </nav>

                <nav className="flex items-center gap-2.5">
                    {SOCIALS.map((social) => (
                        <SocialLink 
                            {...social}
                            key={social.name}
                        />
                    ))}
                </nav>
            </div>
        </div>
    )
}