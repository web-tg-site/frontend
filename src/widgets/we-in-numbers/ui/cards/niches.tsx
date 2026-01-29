import { Numbers, Text } from "@/shared/ui/text";
import { TAGS } from "../../config/tags";
import { WeCard } from "../we-card";

export const Niches = () => (
    <div className="col-span-1 min-[1025px]:col-span-7">
        <WeCard className="relative flex flex-col justify-end min-h-[340px] overflow-hidden">
            
            {/* 
                СЛОЙ С ТЕГАМИ (Фон)
                Ключевые изменения для мобилки:
                1. bottom-[100px] на мобилке - оставляем место для текста
                2. Более агрессивная маска на мобилке (50% вместо 60%)
            */}
            <div 
                className="
                    absolute inset-x-0 top-0 
                    bottom-[100px] min-[1025px]:bottom-0
                    pointer-events-none 
                    [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)]
                    min-[1025px]:[mask-image:linear-gradient(to_bottom,black_60%,transparent_95%)]
                "
            >
                {/* 
                    Контейнер для масштабирования.
                    На мобилке уменьшаем scale чтобы теги не выходили за границы
                */}
                <div className="relative w-full h-full origin-top scale-100 min-[1025px]:scale-100">
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
                                // Пересчитываем top относительно урезанного контейнера
                                top: tag.top, 
                                left: tag.left, 
                                animationDelay: `${idx * 0.5}s`,
                                transform: 'translate(-50%, -50%)' 
                            }}
                        >
                            <div className={`p-1 min-[1025px]:p-1.5 rounded-full ${tag.color}`}>
                                <tag.icon className="w-3 h-3 min-[1025px]:w-3.5 min-[1025px]:h-3.5 text-white" />
                            </div>
                            <span className="text-xs min-[1025px]:text-sm font-bold text-gray-800">
                                {tag.text}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 
                СЛОЙ С ТЕКСТОМ
                Добавляем фоновый градиент как дополнительную защиту
            */}
            <div className="relative z-10 pb-7.5 px-8 pt-4 bg-gradient-to-t from-white via-white/80 to-transparent min-[1025px]:bg-none">
                <Numbers className="text-black">20+</Numbers>
                <Text variant="3" className="text-black/60">Ниш и индустрий</Text>
            </div>
        </WeCard>
    </div>
)