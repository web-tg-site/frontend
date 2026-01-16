"use client";

import React, { useRef } from "react";
import { cn } from "@/shared/utils";
import { Headline } from "@/shared/ui/text";
import { 
    Gamepad2, Landmark, Bitcoin, Plane, Hammer, 
    GraduationCap, Home, Sparkles, BarChart3, Heart 
} from "lucide-react";
import { useMatterPhysics } from "../hooks/use-matter-physics";

const TAGS_DATA = [
    { id: 1, title: "Видеоигры", icon: Gamepad2 },
    { id: 2, title: "Политика", icon: Landmark },
    { id: 3, title: "Криптовалюты", icon: Bitcoin },
    { id: 4, title: "Путешествия", icon: Plane },
    { id: 5, title: "Строительство", icon: Hammer },
    { id: 6, title: "Образование", icon: GraduationCap },
    { id: 7, title: "Уют и комфорт", icon: Home },
    { id: 8, title: "Красота", icon: Sparkles },
    { id: 9, title: "Аналитика", icon: BarChart3 },
    { id: 10, title: "Здоровье", icon: Heart },
];

export const LeftOrder = () => {
    const sceneRef = useRef<HTMLDivElement>(null);
    const bubbleElements = useRef<Map<number, HTMLDivElement>>(new Map());

    // Логика физики
    const { isReady } = useMatterPhysics(sceneRef, TAGS_DATA, bubbleElements);

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
                // ИСПРАВЛЕНИЕ:
                // 'pan-y' разрешает вертикальный скролл страницы браузером.
                // Горизонтальные действия и тапы останутся доступны для физики.
                style={{ touchAction: 'pan-y' }} 
            >
                {TAGS_DATA.map((tag) => (
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
                        <tag.icon className="w-4 h-4 lg:w-7 lg:h-7" strokeWidth={2} />
                        <span>{tag.title}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}