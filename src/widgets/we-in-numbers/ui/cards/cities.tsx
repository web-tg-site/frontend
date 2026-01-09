import { Numbers, Text } from "@/shared/ui/text";
import { MapPin } from "lucide-react";
import { CITY_PINS_GRID } from "../../config/city-pins-grid";
import { WeCard } from "../we-card";

export const Cities = () => (
    // Внешняя сетка: 1 колонка (до 1024px), 7 колонок (после 1024px)
    <div className="col-span-1 min-[1025px]:col-span-7">
        <WeCard className="relative overflow-hidden flex flex-col justify-end min-h-[300px]">
            <div className="absolute inset-0 p-4 pt-8 min-[1025px]:p-6">
                {/* Внутренняя сетка: 4 колонки (до 1024px), 6 колонок (после 1024px) */}
                <div className="grid grid-cols-4 min-[1025px]:grid-cols-6 gap-2 gap-y-4 min-[1025px]:gap-y-6 w-full content-start justify-items-center">
                    {CITY_PINS_GRID.map((status, idx) => {
                        if (status === null) return <div key={idx} />;
                        const isActive = status === 1;
                        return (
                            <div 
                                key={idx}
                                className={`
                                    /* Размеры кружка: 40px на планшете, 56px на десктопе */
                                    w-10 h-10 min-[1025px]:w-14 min-[1025px]:h-14 
                                    rounded-full flex items-center justify-center transition-all
                                    bg-white 
                                    ${isActive ? 'shadow-[0_4px_12px_rgba(0,0,0,0.1)] scale-100' : 'shadow-sm opacity-60 scale-90'}
                                `}
                            >
                                {/* Иконка: 18px на планшете, 22px на десктопе */}
                                <MapPin 
                                    className={`w-[18px] h-[18px] min-[1025px]:w-[22px] min-[1025px]:h-[22px] ${isActive ? "text-black" : "text-gray-300"}`}
                                    fill={isActive ? "black" : "#D1D5DB"} 
                                    strokeWidth={0} 
                                />
                                {/* Блик на пине */}
                                <div className="absolute w-1 h-1 min-[1025px]:w-1.5 min-[1025px]:h-1.5 bg-white rounded-full -mt-1 min-[1025px]:-mt-1.5" />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="pb-7.5 px-8 relative z-20 mt-auto pointer-events-none">
                <Numbers className="text-black">30+</Numbers>
                <Text variant="3" className="text-black/60">Городов присутствия</Text>
            </div>
        </WeCard>
    </div>
)