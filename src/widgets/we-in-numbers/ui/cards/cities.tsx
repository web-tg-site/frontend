import { Numbers, Text } from "@/shared/ui/text";
import { MapPin } from "lucide-react";
import { CITY_PINS_GRID } from "../../config/city-pins-grid";
import { WeCard } from "../we-card";

export const Cities = () => (
    <div className="col-span-12 md:col-span-7">
        <WeCard className="relative overflow-hidden flex flex-col justify-end min-h-[300px]">
            <div className="absolute inset-0 p-6 pt-8">
                <div className="grid grid-cols-6 gap-2 gap-y-6 w-full content-start justify-items-center">
                    {CITY_PINS_GRID.map((status, idx) => {
                        if (status === null) return <div key={idx} />;
                        const isActive = status === 1;
                        return (
                            <div 
                                key={idx}
                                className={`
                                    w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all
                                    bg-white 
                                    ${isActive ? 'shadow-[0_4px_12px_rgba(0,0,0,0.1)] scale-100' : 'shadow-sm opacity-60 scale-90'}
                                `}
                            >
                                <MapPin 
                                    size={22} 
                                    fill={isActive ? "black" : "#D1D5DB"} 
                                    className={isActive ? "text-black" : "text-gray-300"} 
                                    strokeWidth={0} 
                                />
                                <div className="absolute w-1.5 h-1.5 bg-white rounded-full -mt-1.5" />
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