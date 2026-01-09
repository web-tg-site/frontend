import { Text, Title } from "@/shared/ui/text";
import { cn } from "@/shared/utils";

export const ForWhoCard = ({
    title,
    text,
    bottom = false
}: {
    title: React.ReactNode,
    text: React.ReactNode,
    bottom?: boolean
}) => {
    return (
        <div className={cn(
            // === БАЗА ===
            "w-full bg-[#F9F9F9] shadow-[-2px_-2px_4px_0px_rgba(0,0,0,0.08),0px_0px_6px_0px_rgba(0,0,0,0.02)]",
            
            // === 1. МОБИЛКА (до 500px) ===
            // Компактные отступы, чтобы влезало в экран
            "h-auto p-6 rounded-[32px]",

            // === 2. ПЛАНШЕТ (501px - 1024px) ===
            // Чуть больше воздуха, чем на мобилке, но НЕ гигантские как на ПК.
            // Это важно, чтобы карточка не была слишком высокой и не закрыла Marquee целиком.
            "min-[501px]:p-8 min-[501px]:rounded-[40px]",

            // === 3. ДЕСКТОП (> 1024px) ===
            // Возвращаем оригинальные "жирные" отступы и скругления из макета
            "lg:py-[54px] lg:px-[57px]",
            "lg:rounded-[63px]",
            
            // Задаем минимальную высоту на десктопе, чтобы все карточки были визуально большими и одинаковыми,
            // даже если текста мало.
            "lg:min-h-[320px]" 
        )}>
            <div className={cn(
                "flex flex-col h-full",
                // Логика "прижатия" текста к низу (bottom) актуальна только на десктопе,
                // где у карточки есть фиксированная большая высота.
                bottom ? 'lg:justify-end' : 'lg:justify-start'
            )}>
                <Title className={cn(
                    "text-center mb-3 text-black hyphens-auto break-words",
                    // Адаптация шрифта: на мобилке/планшете поменьше, на ПК крупнее
                    "text-[18px] lg:text-[24px] leading-[120%]"
                )}>
                    {title}
                </Title>

                <Text variant="2" className={cn(
                    "text-center text-black/60 hyphens-auto break-words",
                    // Текст описания тоже адаптируем
                    "text-[14px] lg:text-[16px]"
                )}>
                    {text}
                </Text>
            </div>
        </div>
    )
}