import React from 'react';
import Image from 'next/image';

interface ChannelData {
    id: number;
    name: string;
    region: string;
    subscribers: string;
    price: string;
    iconUrl: string;
    coords: {
        top: number;  // % отступа сверху
        left: number; // % отступа слева
    };
}

// Данные (координаты примерные, подгоните под свою карту)
const CHANNELS: ChannelData[] = [
    {
        id: 1,
        name: "Новости Москвы",
        region: "Москва",
        subscribers: "150k",
        price: "15 000 ₽",
        iconUrl: "https://via.placeholder.com/60",
        coords: { top: 38, left: 18 },
    },
    {
        id: 2,
        name: "Питер Live",
        region: "Санкт-Петербург",
        subscribers: "95k",
        price: "10 000 ₽",
        iconUrl: "https://via.placeholder.com/60",
        coords: { top: 32, left: 12 },
    },
    {
        id: 3,
        name: "Екатеринбург ЧП",
        region: "Екатеринбург",
        subscribers: "45k",
        price: "5 500 ₽",
        iconUrl: "https://via.placeholder.com/60",
        coords: { top: 55, left: 35 },
    },
];

export const Map = () => {
    return (
        // Родительский контейнер может быть любой ширины. Карта подстроится.
        <div className="w-full relative">
            
            {/* 
                Картинка карты.
                width: 100% и height: auto обеспечивают сохранение пропорций.
                Убраны fill и aspect-ratio, теперь размеры зависят от самой картинки.
            */}
            <Image
                src="/map.png"
                alt="Карта регионов"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto block select-none"
                priority
            />

            {/* Рендерим точки поверх карты */}
            {CHANNELS.map((channel) => (
                <MapPin key={channel.id} data={channel} />
            ))}
        </div>
    );
};

const MapPin = ({ data }: { data: ChannelData }) => {
    return (
        <div
            className="absolute group z-10"
            style={{
                top: `${data.coords.top}%`,
                left: `${data.coords.left}%`,
            }}
        >
            {/* 
                --- ВИЗУАЛ ПИНА --- 
            */}
            <div className="relative -translate-x-1/2 -translate-y-[115%] cursor-pointer drop-shadow-md transition-transform duration-300 hover:scale-110 hover:z-50 hover:drop-shadow-xl">
                {/* Синяя форма капли */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#3B82F6] rounded-full rounded-br-none rotate-45 flex items-center justify-center p-1">
                    {/* Аватарка (повернута обратно) */}
                    <div className="-rotate-45 w-full h-full rounded-full overflow-hidden bg-white border-[2px] border-[#3B82F6]">
                        <img 
                            src={data.iconUrl} 
                            alt={data.name} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* 
                --- ВСПЛЫВАШКА (TOOLTIP) --- 
                Изменено: mb-20 (было mb-4). 
                Это поднимает окно на 5rem (80px) от точки привязки, чтобы не перекрывать пин.
            */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-20 sm:mb-24 w-60 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-50">
                <div className="bg-white rounded-lg shadow-xl p-3 text-sm border border-gray-100">
                    
                    {/* Хедер тултипа */}
                    <div className="flex items-center gap-2 mb-3 border-b border-gray-100 pb-2">
                        <img src={data.iconUrl} className="w-8 h-8 rounded-full shadow-sm" alt="" />
                        <div className="overflow-hidden">
                            <h4 className="font-bold text-gray-800 truncate leading-tight text-base">{data.name}</h4>
                            <span className="text-xs text-gray-400">{data.region}</span>
                        </div>
                    </div>

                    {/* Статистика */}
                    <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="bg-gray-50 rounded-md p-1.5">
                            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Подписчики</div>
                            <div className="font-bold text-gray-900 text-sm">{data.subscribers}</div>
                        </div>
                        <div className="bg-blue-50 rounded-md p-1.5">
                            <div className="text-[10px] text-blue-500 font-bold uppercase tracking-wide">Цена</div>
                            <div className="font-bold text-blue-600 text-sm">{data.price}</div>
                        </div>
                    </div>

                    {/* Стрелочка тултипа */}
                    <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-b border-r border-gray-100"></div>
                </div>
            </div>
        </div>
    );
};