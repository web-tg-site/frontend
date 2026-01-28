import { Numbers, Text } from "@/shared/ui/text";
import { MapPin } from "lucide-react";
import { CITY_PINS_GRID } from "../../config/city-pins-grid";
import { WeCard } from "../we-card";

export const Cities = () => (
    <div className="col-span-1 min-[1025px]:col-span-7">
        <WeCard className="flex flex-col min-h-[300px] overflow-hidden">
            
            {/* 
                ВЕРХНИЙ БЛОК (Сетка)
                flex-grow - растягивается.
                overflow-hidden - если пинов слишком много, нижние обрежутся.
            */}
            <div className="relative w-full flex-grow overflow-hidden p-4 pt-8 min-[1025px]:p-6 [mask-image:linear-gradient(to_bottom,black_90%,transparent)]">
                <div className="grid grid-cols-4 min-[1025px]:grid-cols-6 gap-2 gap-y-4 min-[1025px]:gap-y-6 w-full content-start justify-items-center">
                    {CITY_PINS_GRID.map((status, idx) => {
                        if (status === null) return <div key={idx} />;
                        const isActive = status === 1;
                        return (
                            <div 
                                key={idx}
                                className={`
                                    w-10 h-10 min-[1025px]:w-14 min-[1025px]:h-14 
                                    rounded-full flex items-center justify-center transition-all
                                    bg-white 
                                    ${isActive ? 'shadow-[0_4px_12px_rgba(0,0,0,0.1)] scale-100' : 'shadow-sm opacity-60 scale-90'}
                                `}
                            >
                                <MapPin 
                                    className={`w-[18px] h-[18px] min-[1025px]:w-[22px] min-[1025px]:h-[22px] ${isActive ? "text-black" : "text-gray-300"}`}
                                    fill={isActive ? "black" : "#D1D5DB"} 
                                    strokeWidth={0} 
                                />
                                <div className="absolute w-1 h-1 min-[1025px]:w-1.5 min-[1025px]:h-1.5 bg-white rounded-full -mt-1 min-[1025px]:-mt-1.5" />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* НИЖНИЙ БЛОК (Текст) */}
            <div className="pb-7.5 px-8 pt-2 shrink-0">
                <Numbers className="text-black">45+</Numbers>
                <Text variant="3" className="text-black/60">Городов присутствия</Text>
            </div>
        </WeCard>
    </div>
)