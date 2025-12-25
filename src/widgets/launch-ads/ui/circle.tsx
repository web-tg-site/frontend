import { Text, Title } from "@/shared/ui/text";
import { CircleProps } from "../types/circle.props";
import { Arrow } from "../icons/arrow";

export const Circle = ({
    title,
    description,
    arrow
}: CircleProps) => {
    return (
        <div className="relative w-full h-full rounded-full aspect-square bg-[#D9D9D9]/2 border border-white/30 flex justify-center items-start pt-[30%]">
            <div className="max-w-[207px]">
                <Title variant="h2" className="mb-4 leading-none min-h-[2.5em] flex items-end justify-center">
                    {title}
                </Title>

                <Text variant="2" className="text-white/60">
                    {description}
                </Text>
            </div>

            {arrow && (
                <Arrow 
                    className="absolute top-1/2 -translate-y-1/2 right-6 z-10"
                />
            )}
        </div>
    )
}