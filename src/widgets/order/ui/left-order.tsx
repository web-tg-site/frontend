"use client";

import { useRef } from "react";
import { cn } from "@/shared/utils";
import { Headline } from "@/shared/ui/text";
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
                // 1. Добавили pointer-events-none, чтобы тач по пустому месту уходил в "родителя" и скроллил страницу
                // Убрали cursor-grab отсюда, так как фон теперь неактивен для мыши
                className="absolute inset-0 w-full h-full z-0 pointer-events-none"
                style={{ touchAction: 'pan-y' }} 
            >
                {categories.map((tag) => (
                    <div
                        key={tag.id}
                        ref={(el) => {
                            if (el) bubbleElements.current.set(tag.id, el);
                        }}
                        className={cn(
                            "absolute top-0 left-0",
                            "flex items-center rounded-full",
                            // 2. Добавили pointer-events-auto, чтобы пузыри можно было хватать
                            // 3. Перенесли сюда стили курсора
                            "pointer-events-auto cursor-grab active:cursor-grabbing",
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
                        <DynamicIcon 
                            name={tag.icon} 
                            className="w-4 h-4 lg:w-7 lg:h-7" 
                            strokeWidth={2} 
                        />
                        <span>{tag.title}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}