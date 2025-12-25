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
        <div className="h-100 max-w-[393px] w-full bg-[#F9F9F9] shadow-[-2px_-2px_4px_0px_rgba(0,0,0,0.08),0px_0px_6px_0px_rgba(0,0,0,0.02)] py-[54px] px-[57px] rounded-[63px]">
            <div className={cn(
                "flex flex-col",
                bottom ? 'justify-end h-full' : 'justify-start'
            )}>
                <Title className="text-center mb-3 text-black max-w-[355px] wrap-break-word hyphens-auto">
                    {title}
                </Title>

                <Text variant="2" className="text-center text-black/60 wrap-break-word hyphens-auto">
                    {text}
                </Text>
            </div>
        </div>
    )
}