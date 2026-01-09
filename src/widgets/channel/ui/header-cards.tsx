import { TopCard } from "../template/top-card";
import Image from 'next/image';

export const ChannelHeaderCards = ({
    subs,
    coast,
    image
}: {
    subs: string,
    coast: string,
    image: string
}) => {
    return (
        <div className="flex flex-row items-center gap-2.5 w-full">
            <TopCard 
                title={subs}
                desc="Подписчиков"
            />

            <TopCard 
                title={coast}
                desc="Стоимость"
            />
            
            <div className="h-[121px] relative rounded-[28px] overflow-hidden flex-1 min-w-0 lg:flex-none lg:w-[150px]">
                <Image 
                    src={image}
                    alt="Фото"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 33vw, 150px"
                />
            </div>
        </div>
    )
}