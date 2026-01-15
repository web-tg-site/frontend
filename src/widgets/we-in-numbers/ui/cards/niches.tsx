import { Numbers, Text } from "@/shared/ui/text";
import { TAGS } from "../../config/tags";
import { WeCard } from "../we-card";

export const Niches = () => (
    <div className="col-span-1 min-[1025px]:col-span-7">
        {/* 
            Карточка: relative для позиционирования слоев.
            flex + justify-end: чтобы прижать блок с текстом к низу.
        */}
        <WeCard className="relative flex flex-col justify-end min-h-[340px] overflow-hidden">
            
            {/* 
                СЛОЙ С ТЕГАМИ (Фон)
                1. absolute inset-0: Растягиваем на всю карточку.
                2. mask-image: Делаем их видимыми сверху, но прозрачными в нижних 30%, 
                   где находится текст.
            */}
            <div className="absolute inset-0 w-full h-full pointer-events-none [mask-image:linear-gradient(to_bottom,black_60%,transparent_95%)]">
                {/* 
                    Контейнер для масштабирования.
                    scale-[1.1]: Немного увеличиваем на мобилке, чтобы раздвинуть теги к краям.
                    origin-center: Масштабируем от центра, чтобы заполнить все углы.
                */}
                <div className="relative w-full h-full origin-center scale-[1.1] min-[1025px]:scale-100">
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
                            // Убрали zIndex из style, чтобы они случайно не перекрыли текст (хотя маска и так спасет)
                            style={{
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
                relative z-10: Поднимаем над фоном.
                bg-gradient-to-t: Можно добавить легкий градиент снизу, если иконки все еще мешают,
                но mask-image выше должна справиться.
            */}
            <div className="relative z-10 pb-7.5 px-8 pt-4">
                <Numbers className="text-black">15+</Numbers>
                <Text variant="3" className="text-black/60">Ниш и индустрий</Text>
            </div>
        </WeCard>
    </div>
)