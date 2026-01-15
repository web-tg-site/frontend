import { Numbers, Text } from "@/shared/ui/text";
import { BAGS_GRID } from "../../config/bag-grid";
import { BagIcon } from "../../icons/bag-icon";
import { WeCard } from "../we-card";

export const Coverage = () => (
    <div className="col-span-1 min-[1025px]:col-span-5">
        <WeCard className="flex flex-col min-h-[300px] overflow-hidden">
            
            {/* ВЕРХНИЙ БЛОК (Пакеты) */}
            <div className="relative w-full flex-grow overflow-hidden p-4 pt-8 [mask-image:linear-gradient(to_bottom,black_85%,transparent)]">
                <div className="grid grid-cols-4 min-[1025px]:grid-cols-6 gap-3 content-start justify-items-center w-full">
                    {BAGS_GRID.map((status, idx) => {
                         if (status === null) return <div key={idx} className="w-full aspect-square" />;
                         
                         const isActive = status === 1;
                         return (
                            <div 
                                key={idx} 
                                className={`
                                    w-12 h-12 min-[1025px]:w-16 min-[1025px]:h-16 
                                    rounded-[14px] min-[1025px]:rounded-[20px] 
                                    flex items-center justify-center transition-all duration-500
                                    ${isActive 
                                        ? 'bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] scale-100 z-10' 
                                        : 'bg-white/50 scale-95 opacity-80'
                                    }
                                `}
                            >
                                <BagIcon 
                                    className={`w-6 h-6 min-[1025px]:w-8 min-[1025px]:h-8 ${isActive ? "text-black" : "text-gray-300"}`}
                                />
                            </div>
                         )
                    })}
                </div>
            </div>

            {/* НИЖНИЙ БЛОК (Текст) */}
            <div className="pb-7.5 px-6 pt-2 flex-shrink-0">
                <Numbers className="text-black">540+</Numbers>
                <Text variant="3" className="text-black/60 leading-tight max-w-[80%]">
                    Млн суммарный охват за год
                </Text>
            </div>
        </WeCard>
    </div>
)