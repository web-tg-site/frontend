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
            "flex flex-col",

            // === 1. МОБИЛКА ===
            "h-auto p-6 rounded-[32px]",

            // === 2. ПЛАНШЕТ ===
            "min-[501px]:p-8 min-[501px]:rounded-[40px]",

            // === 3. ДЕСКТОП ===
            // Уменьшили padding по вертикали (было 40 -> 32), чтобы влезло в малую высоту
            "lg:py-[32px] lg:px-[40px]", 
            "lg:rounded-[50px]", // Чуть меньше скругление для компактности
            
            // !!! ЕЩЕ МЕНЬШЕ ВЫСОТА (было 300px -> стало 270px)
            "lg:min-h-[270px]" 
        )}>
            <div className={cn(
                "flex flex-col w-full flex-grow",
                bottom ? 'justify-end' : 'justify-start'
            )}>
                <Title className={cn(
                    "text-center mb-2 text-black hyphens-auto",
                    "text-[18px] lg:text-[22px] leading-[120%]"
                )}>
                    {title}
                </Title>

                <Text variant="2" className={cn(
                    "text-center text-black/60 hyphens-auto",
                    "text-[14px] lg:text-[15px]"
                )}>
                    {text}
                </Text>
            </div>
        </div>
    )
}