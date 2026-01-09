import React from 'react';
import Image from 'next/image';

interface ChannelData {
    id: number;
    name: string;
    region: string;
    subscribers: string;
    label: string;
    price: string;
    iconUrl: string;
    coords: {
        top: number;
        left: number;
    };
}

const CHANNELS: ChannelData[] = [
    {
        id: 1,
        name: "Новости Москвы",
        region: "Москва",
        subscribers: "150к",
        label: "Подписчиков",
        price: "15 000 ₽",
        iconUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300",
        coords: { top: 38, left: 18 },
    },
    {
        id: 2,
        name: "Питер Live",
        region: "Санкт-Петербург",
        subscribers: "95к",
        label: "Подписчиков",
        price: "10 000 ₽",
        iconUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&h=300",
        coords: { top: 32, left: 12 },
    },
    {
        id: 3,
        name: "Екатеринбург ЧП",
        region: "Екатеринбург",
        subscribers: "45к",
        label: "Подписчиков",
        price: "5 500 ₽",
        iconUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=300&h=300",
        coords: { top: 55, left: 35 },
    },
];

export const Map = () => {
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

            {CHANNELS.map((channel) => (
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
                Пин
                duration-500 + ease-out (cubic-bezier) для "пружинного" эффекта
            */}
            <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-48 sm:h-48 origin-bottom-right transform rotate-45 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] scale-[0.27] hover:scale-100 cursor-pointer group drop-shadow-md hover:drop-shadow-2xl will-change-transform">
                
                {/* Рамка */}
                <div className="w-full h-full bg-[#3B82F6] rounded-full rounded-br-none p-[3px] sm:p-1.5 shadow-lg">
                    
                    {/* Контент (-45 deg) */}
                    <div className="relative w-full h-full bg-white rounded-full overflow-hidden -rotate-45 shadow-inner isolate">
                        
                        <img 
                            src={data.iconUrl} 
                            alt={data.name} 
                            className="w-full h-full object-cover"
                        />

                        {/* 
                            Обертка для центрирования плашки.
                            Убрали opacity и delay отсюда, чтобы не было "ступеньки".
                        */}
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            
                            {/* 
                                ПЛАШКА С ИСПРАВЛЕННОЙ АНИМАЦИЕЙ
                                
                                1. scale-50 -> group-hover:scale-100:
                                   Плашка "вырастает" вместе с пином, а не просто появляется.
                                
                                2. backdrop-blur-none -> group-hover:backdrop-blur-md:
                                   Мы анимируем само размытие! Оно плавно меняется от 0px до нужного значения.
                                
                                3. transition-all duration-500:
                                   Синхронизировано с открытием пина.
                            */}
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
            </div>
        </div>
    );
};