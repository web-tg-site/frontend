'use client'

import { ChannelCard } from "@/entities/channel"
import { CHANNEL_MOCK } from "@/page/catalog-page/config/channel-mock" // Убедитесь, что путь верный
import { Headline, LandingBlock, Title } from "@/shared/ui"
import { cn } from "@/shared/utils"
import { AnimatedCounter, BrandBadge, FallingTags } from "@/widgets/personal-selection"
import { WhiteBlockTemplate } from "@/widgets/personal-selection/ui/white-block-template"
import { motion, Variants } from "framer-motion"
import Image from "next/image"

export const PersonalSelection = () => {
    // Считаем сумму
    const totalPrice = CHANNEL_MOCK.reduce((acc, channel) => acc + channel.price, 0);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: 20 }, 
        visible: { 
            opacity: 1, 
            x: 0, 
            transition: { duration: 0.4, ease: "easeOut" } 
        },
    };

    const items: string[] = [
        'Авторские тексты',
        'Аналитика и разборы',
        'Короткие наблюдения'
    ]

    return (
        <section className="pb-[71px]">
            {/* БЛОК 1: Заголовок и падающие теги */}
            <div className="relative lg:pt-[155px] pt-[81px] lg:pb-[133px] pb-[61px] overflow-hidden">
                <FallingTags />

                <div className="relative z-10 px-7.5">
                    <Headline variant="h2" className="max-w-[1000px] font-normal leading-tight lg:mb-13 mb-3.5 text-[30px] min-[500px]:text-[60px] lg:text-[100px]">
                        Персональная подборка каналов для
                        <BrandBadge 
                            text="SlayMedia" 
                            color="#cf3bf6" 
                        />
                    </Headline>

                    <p className="max-w-[1000px] text-white/70 leading-[120%] lg:text-[24px] min-[500px]:text-[20px] text-[14px] "> 
                        Эта подборка сформирована специально под ваш проект, целевую аудиторию и бюджет. Все рекомендации и цены адаптированы под конкретную рекламную задачу
                    </p>
                </div>
            </div>

            {/* БЛОК 2: Анализ ниши (Белые карточки) */}
            <LandingBlock className="px-7.5 py-10.5 mb-15">
                <Headline variant="h5" className="text-black mb-15">
                    Анализ вашей ниши
                </Headline>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-2.5 gap-y-6 gap-x-2.5">
                    <WhiteBlockTemplate className="lg:col-span-1 md:col-span-2 col-span-1">
                        <Title variant="h1" className="mb-6 text-black">
                            Цель рекламной кампании 
                        </Title>

                        <p className="text-[20px] leading-[110%] text-black/60">
                            Повысить узнаваемость и сформировать доверие к продукту за счёт экспертной подачи и честной коммуникации. Кампания направлена на демонстрацию эффективности и ценностей бренда, а также на стимулирование интереса к пробе продукта 
                        </p>
                    </WhiteBlockTemplate>

                    <WhiteBlockTemplate className="pt-[79px] relative">
                        <div 
                            className={cn(
                                "h-[103px] w-[103px] overflow-hidden absolute left-6 -top-[50px] rounded-full bg-white",
                                "shadow-[0px_-2.62px_5.25px_0px_rgba(0,0,0,0.06),0px_0px_2.62px_0px_rgba(0,0,0,0.04)]"
                            )}
                        >
                            <Image 
                                src='/woman.png'
                                alt='женищна хз'
                                width={103}
                                height={103}
                                className="w-auto h-auto object-cover"
                            />
                        </div>
                        <Title className="mb-6 text-black">
                            Осознанные бьюти-потребители
                        </Title>

                        <p className="text-[20px] leading-[110%] text-black/60">
                            Интересуются составами, активами, доказательной косметологией. Читают обзоры, сравнивают бренды, не покупают импульсивно
                        </p>
                    </WhiteBlockTemplate>


                    <WhiteBlockTemplate>
                        <Title variant="h1" className="mb-6 text-black">
                            Рекомендуемые форматы
                        </Title>

                        <motion.div 
                            className="grid grid-cols-1 gap-3"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            {items.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={itemVariants}
                                    className={cn(
                                        "w-full bg-white p-0.5 pr-4 rounded-[30px] flex items-center",
                                        "shadow-[4.66px_2.33px_9.32px_0px_rgba(0,0,0,0.06),0px_0px_4.66px_0px_rgba(0,0,0,0.04)]"
                                    )}
                                >
                                    <span className="shrink-0 w-10 h-10 bg-[#34C759] text-white flex items-center justify-center mr-4.5 rounded-full text-[20px] leading-none font-medium tabular-nums pt-0.5">
                                        {idx + 1}
                                    </span>
            
                                    <p className="text-[20px] text-black leading-tight">
                                        {item}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </WhiteBlockTemplate>
                </div>
            </LandingBlock>

            {/* БЛОК 3: Подборка каналов и цена */}
            <div className="px-[30px]">
                <Title className="lg:text-[50px] text-[24px] mb-8">
                    Наша подборка для вас 
                </Title>

                <div className="grid lg:grid-cols-3 min-[500px]:grid-cols-2 grid-cols-1 gap-4 mb-8">
                    {CHANNEL_MOCK.map((channel, idx) => (
                        <ChannelCard 
                            key={idx}
                            {...channel}
                            haveAddButton={false}
                        />
                    ))}
                </div>

                <div className="flex justify-between items-center">
                    <Title className="text-white/60 lg:text-[36px] min-[500px]:text-[20px] text-[16px] font-medium">
                        Итоговая стоимость
                    </Title>

                    <AnimatedCounter 
                        value={totalPrice} 
                        className="text-white lg:text-[36px] min-[500px]:text-[28px] text-[20px] font-medium"
                    />
                </div>
            </div>
        </section>
    )
}