import { Text, Title } from "@/shared/ui/text"
import { LINKS } from "../config"
import { FooterLink } from "./footer-link"
import { SOCIALS } from "../config"
import { SocialLink } from "./social-link"

export const LeftFooter = () => {
    return (
        <div className="flex flex-col h-full py-[25px] pl-6.5 pr-10 bg-secondary rounded-2xl lg:col-span-4">
            <div className="lg:mb-0 mb-5">
                <Title variant="h3" className="text-[24px]! mb-3">
                    Навигация
                </Title>

                <Text variant="4" className="leading-6">
                    ИП Черных Наталья Витальевна <br/>
                    ОГРНИП:  325665800042387
                </Text>

                <Text variant="4" className="leading-6 mb-3">
                    Уведомление в Роскомнадзор об обработке персональных данных: <br/>
                    Регистр. номер 66-25-057009
                </Text>
            </div>

            <div className="flex justify-between items-end lg: mt-auto">
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