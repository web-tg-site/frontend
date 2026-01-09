import { Numbers, Text } from "@/shared/ui/text";
import { TAGS } from "../../config/tags";
import { WeCard } from "../we-card";

export const Niches = () => (
    // Внешняя сетка: 1 колонка (до 1024px), 7 колонок (после 1024px)
    <div className="col-span-1 min-[1025px]:col-span-7">
        <WeCard className="relative overflow-hidden flex flex-col justify-end min-h-[340px]">
            {/* 
               Масштабирование контента:
               scale-[0.85] для планшетов (чтобы теги не вылезали)
               scale-100 для десктопов
            */}
            <div className="absolute inset-0 w-full h-full origin-center scale-[0.85] min-[1025px]:scale-100">
                {TAGS.map((tag, idx) => (
                    <div
                        key={idx}
                        className={`
                            absolute flex items-center gap-2 
                            bg-white px-3 py-1.5 min-[1025px]:px-4 min-[1025px]:py-2 
                            rounded-full shadow-md border border-gray-100 
                            whitespace-nowrap animate-float 
                            ${tag.rotate} ${tag.scale}
                        `}
                        style={{
                            top: tag.top, left: tag.left, zIndex: tag.z,
                            animationDelay: `${idx * 0.5}s`,
                            transform: 'translate(-50%, -50%)' 
                        }}
                    >
                        <div className={`p-1 min-[1025px]:p-1.5 rounded-full ${tag.color}`}>
                            {/* Уменьшаем иконку на планшете */}
                            <tag.icon className="w-3 h-3 min-[1025px]:w-3.5 min-[1025px]:h-3.5 text-white" />
                        </div>
                        {/* Уменьшаем шрифт на планшете */}
                        <span className="text-xs min-[1025px]:text-sm font-bold text-gray-800">
                            {tag.text}
                        </span>
                    </div>
                ))}
            </div>
            <div className="pb-7.5 px-8 relative z-40 pointer-events-none">
                <Numbers className="text-black">15+</Numbers>
                <Text variant="3" className="text-black/60">Ниш и индустрий</Text>
            </div>
        </WeCard>
    </div>
)