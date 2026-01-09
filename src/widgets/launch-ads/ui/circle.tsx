import { Text, Title } from "@/shared/ui/text";
import { CircleProps } from "../types/circle.props";
import { Arrow } from "../icons/arrow";
import { cn } from "@/shared/utils";

export const Circle = ({
    title,
    description,
    arrow
}: CircleProps) => {
    return (
        <div className="relative w-full h-full rounded-full aspect-square bg-[#D9D9D9]/2 border border-white/30 flex justify-center items-start pt-[30%]">
            <div className="max-w-[207px] text-center">
                <Title variant="h2" className="mb-4 leading-none min-h-[2.5em] flex items-end justify-center">
                    {title}
                </Title>

                <Text variant="2" className="text-white/60">
                    {description}
                </Text>
            </div>

            {arrow && (
                <Arrow 
                    className={cn(
                        "absolute z-10",
                        "bottom-2 left-1/2 -translate-x-1/2 rotate-90",
                        "lg:bottom-auto lg:left-auto lg:translate-x-0 lg:rotate-0 lg:top-1/2 lg:-translate-y-1/2 lg:right-6"
                    )}
                />
            )}
        </div>
    )
}