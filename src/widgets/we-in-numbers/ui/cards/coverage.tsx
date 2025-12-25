import { Numbers, Text } from "@/shared/ui/text";
import { BAGS_GRID } from "../../config/bag-grid";
import { BagIcon } from "../../icons/bag-icon";
import { WeCard } from "../we-card";

export const Coverage = () => (
    <div className="col-span-12 md:col-span-5">
        {/* Фон не трогаем, берется из WeCard */}
        <WeCard className="relative overflow-hidden flex flex-col justify-end min-h-[300px]">
            {/* Контейнер на всю ширину с отступами */}
            <div className="absolute inset-0 p-4 pt-8">
                {/* Сетка на 6 колонок без поворотов, выравнена вправо */}
                <div className="grid grid-cols-6 gap-3 sm:gap-4 content-start justify-items-center w-full">
                    {BAGS_GRID.map((status, idx) => {
                         // Пустой div вместо null сохраняет структуру
                         if (status === null) return <div key={idx} className="w-full aspect-square" />;
                         
                         const isActive = status === 1;
                         return (
                            <div 
                                key={idx} 
                                className={`
                                    w-14 h-14 sm:w-16 sm:h-16 rounded-[20px] flex items-center justify-center transition-all duration-500
                                    ${isActive 
                                        ? 'bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] scale-100 z-10' 
                                        : 'bg-white/50 scale-95 opacity-80' // Полупрозрачные белые квадраты
                                    }
                                `}
                            >
                                <BagIcon 
                                    className={`w-7 h-7 sm:w-8 sm:h-8 ${isActive ? "text-black" : "text-gray-300"}`}
                                />
                            </div>
                         )
                    })}
                </div>
            </div>
            <div className="pb-7.5 px-6 relative z-20 pointer-events-none">
                <Numbers className="text-black">540+</Numbers>
                <Text variant="3" className="text-black/60 leading-tight max-w-[80%]">
                    Млн суммарный охват за год
                </Text>
            </div>
        </WeCard>
    </div>
)