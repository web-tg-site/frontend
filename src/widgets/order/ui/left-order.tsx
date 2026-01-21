"use client";

import { useRef } from "react";
import { cn } from "@/shared/utils";
import { Headline } from "@/shared/ui/text";
// Убрали импорты конкретных иконок (Gamepad2, Landmark и т.д.), так как они приходят строкой
import { useMatterPhysics } from "../hooks/use-matter-physics";
import { useCategories } from "../api/use-categories";
import { DynamicIcon } from "@/shared/ui/dynamic-icon";

export const LeftOrder = () => {
    const sceneRef = useRef<HTMLDivElement>(null);
    const bubbleElements = useRef<Map<number, HTMLDivElement>>(new Map());

    const { data: categories = [] } = useCategories();

    const { isReady } = useMatterPhysics(sceneRef, categories, bubbleElements);

    return (
        <div className="bg-primary rounded-2xl min-h-[500px] lg:min-h-[785px] h-full relative overflow-hidden flex flex-col select-none">
            {/* Текст */}
            <div className="relative z-10 pt-6 pl-6 pr-6 lg:pt-10 lg:pl-10 lg:pr-10 pointer-events-none">
                <Headline variant="h3" className="text-white mb-4 text-2xl lg:text-4xl">
                    Заказать<br />
                    бесплатный подбор<br />
                    каналов под ваши<br />
                    цели
                </Headline>
            </div>
            
            {/* Сцена */}
            <div 
                ref={sceneRef} 
                className="absolute inset-0 w-full h-full z-0 cursor-grab active:cursor-grabbing"
                style={{ touchAction: 'pan-y' }} 
            >
                {/* 3. Рендерим категории, пришедшие с бэкенда */}
                {categories.map((tag) => (
                    <div
                        key={tag.id}
                        ref={(el) => {
                            if (el) bubbleElements.current.set(tag.id, el);
                        }}
                        className={cn(
                            "absolute top-0 left-0",
                            "flex items-center rounded-full",
                            "bg-transparent text-white font-semibold select-none whitespace-nowrap",
                            "transition-colors hover:bg-white/10",
                            "gap-2 px-3 py-2 border", 
                            "text-sm",                
                            "lg:gap-4 lg:px-8 lg:lg:py-4 lg:border-2",
                            "lg:text-2xl",
                            !isReady && "opacity-0" 
                        )}
                        style={{
                            transform: 'translate3d(-5000px, -5000px, 0)',
                            willChange: 'transform'
                        }}
                    >
                        {/* 4. Используем DynamicIcon для иконки из строки (например "gamepad-2") */}
                        <DynamicIcon 
                            name={tag.icon} 
                            className="w-4 h-4 lg:w-7 lg:h-7" 
                            strokeWidth={2} 
                        />
                        {/* 5. Выводим title (так как в маппере хука ты назвал поле title) */}
                        <span>{tag.title}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}