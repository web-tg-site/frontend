'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useGetChannelForGeography } from '../api/use-get-channel-for-geography';

export interface ChannelData {
    id: number;
    name: string;
    region: string;
    subscribers: string;
    label: string;
    price: string;
    iconUrl: string;
    slug: string;
    coords: {
        top: number;
        left: number;
    };
}

export const Map = () => {
    const { data: channels, isLoading } = useGetChannelForGeography();

    if(isLoading) {
        return null;
    }

    if(!channels) {
        return null;
    }

    return (
        <div className="w-full relative">
            <Image
                src="/map.png"
                alt="Карта регионов"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto block select-none pointer-events-none"
                priority
            />

            {channels.map((channel) => (
                <MapPin key={channel.id} data={channel} />
            ))}
        </div>
    );
};

const MapPin = ({ data }: { data: ChannelData }) => {
    return (
        <div
            className="absolute z-10 hover:z-50"
            style={{
                top: `${data.coords.top}%`,
                left: `${data.coords.left}%`,
            }}
        >
            {/* 
                2. Заменили div на Link и добавили href
            */}
            <Link
                href={`/channel/${data.slug}`}
                className="absolute bottom-0 right-0 w-32 h-32 sm:w-48 sm:h-48 origin-bottom-right transform rotate-45 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] scale-[0.27] hover:scale-100 cursor-pointer group drop-shadow-md hover:drop-shadow-2xl will-change-transform"
            >
                
                {/* Рамка */}
                <div className="w-full h-full bg-[#3B82F6] rounded-full rounded-br-none p-[3px] sm:p-1.5 shadow-lg">
                    
                    {/* Контент (-45 deg) */}
                    <div className="relative w-full h-full bg-white rounded-full overflow-hidden -rotate-45 shadow-inner isolate">
                        
                        <img 
                            src={data.iconUrl} 
                            alt={data.name} 
                            className="w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            
                            <div className="
                                bg-black/40 
                                rounded-full px-4 py-2 text-center border border-white/20 shadow-xl shadow-black/10
                                
                                opacity-0 group-hover:opacity-100 
                                scale-50 group-hover:scale-100
                                backdrop-blur-none group-hover:backdrop-blur-md
                                
                                transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                                origin-center
                                will-change-[transform,opacity,backdrop-filter]
                            ">
                                <div className="text-white font-medium text-lg sm:text-2xl leading-none">
                                    {data.subscribers}
                                </div>
                                <div className="text-gray-200 text-[10px] sm:text-xs leading-none mt-1 font-light">
                                    {data.label}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Link>
        </div>
    );
};