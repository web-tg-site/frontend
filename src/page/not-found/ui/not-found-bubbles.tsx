"use client";

import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import { cn } from "@/shared/utils";
import { 
    Camera, Code, Bitcoin, Mic, BookOpen, Briefcase, 
    Plane, Gamepad2, Heart, GraduationCap, 
    Apple, ShoppingBag, Landmark, 
    BarChart3, Rocket, Megaphone, Tag, Home, 
    BrainCircuit, Lightbulb, Languages, Sparkles, LucideIcon 
} from "lucide-react";

interface BubbleData {
    id: number;
    title: string;
    icon: LucideIcon;
    colorClass: string;
}

const BUBBLES_DATA: BubbleData[] = [
    { id: 1, title: "Фотография", icon: Camera, colorClass: "bg-orange-500" },
    { id: 2, title: "Правильное питание", icon: Apple, colorClass: "bg-green-600" },
    { id: 3, title: "Наука", icon: BookOpen, colorClass: "bg-teal-500" },
    { id: 4, title: "Подкасты", icon: Mic, colorClass: "bg-cyan-500" },
    { id: 5, title: "Обзоры покупок", icon: ShoppingBag, colorClass: "bg-indigo-600" },
    { id: 6, title: "Криптовалюты", icon: Bitcoin, colorClass: "bg-emerald-500" },
    { id: 7, title: "Политика", icon: Landmark, colorClass: "bg-blue-600" },
    { id: 8, title: "Аналитика", icon: BarChart3, colorClass: "bg-fuchsia-600" },
    { id: 9, title: "Мемы", icon: BarChart3, colorClass: "bg-rose-600" },
    { id: 10, title: "Программирование", icon: Code, colorClass: "bg-blue-500" },
    { id: 11, title: "Стартапы", icon: Rocket, colorClass: "bg-red-500" },
    { id: 12, title: "Маркетинг", icon: Megaphone, colorClass: "bg-orange-600" },
    { id: 13, title: "Акции и купоны", icon: Tag, colorClass: "bg-yellow-500" },
    { id: 14, title: "Уют и комфорт", icon: Home, colorClass: "bg-purple-600" },
    { id: 15, title: "Здоровье", icon: Heart, colorClass: "bg-green-500" },
    { id: 16, title: "Видеоигры", icon: Gamepad2, colorClass: "bg-red-600" },
    { id: 17, title: "Путешествия", icon: Plane, colorClass: "bg-orange-500" },
    { id: 18, title: "Образование", icon: GraduationCap, colorClass: "bg-blue-500" },
    { id: 19, title: "Нейросети", icon: BrainCircuit, colorClass: "bg-violet-600" },
    { id: 20, title: "Лайфхаки", icon: Lightbulb, colorClass: "bg-teal-600" },
    { id: 21, title: "Бизнес", icon: Briefcase, colorClass: "bg-amber-700" },
    { id: 22, title: "Искусство", icon: Sparkles, colorClass: "bg-orange-400" },
    { id: 23, title: "Иностранные языки", icon: Languages, colorClass: "bg-yellow-400" },
];

export const NotFoundBubbles = () => {
    const sceneRef = useRef<HTMLDivElement>(null);
    const bubbleElements = useRef<Map<number, HTMLDivElement>>(new Map());
    const runnerRef = useRef<Matter.Runner | null>(null);
    const engineRef = useRef<Matter.Engine | null>(null);

    useEffect(() => {
        if (!sceneRef.current) return;

        let initTimeout: NodeJS.Timeout;
        let resizeTimeout: NodeJS.Timeout;

        const clearWorld = () => {
            if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
            if (engineRef.current) {
                Matter.World.clear(engineRef.current.world, false);
                Matter.Engine.clear(engineRef.current);
            }
            runnerRef.current = null;
            engineRef.current = null;
        };

        const initPhysics = () => {
            if (!sceneRef.current) return;
            clearWorld();

            const { Engine, Runner, Bodies, Composite, Events, Body } = Matter;
            const engine = Engine.create();
            engineRef.current = engine;
            engine.gravity.y = 1; // Нормальная гравитация

            const width = sceneRef.current.clientWidth;
            const height = sceneRef.current.clientHeight;

            // 1. Создание тел для бабблов
            const bubblesBodies: { bubbleId: number; body: Matter.Body; width: number; height: number }[] = [];

            // Перемешиваем массив, чтобы падали в случайном порядке
            const shuffledBubbles = [...BUBBLES_DATA].sort(() => Math.random() - 0.5);

            shuffledBubbles.forEach((bubble, index) => {
                const el = bubbleElements.current.get(bubble.id);
                const elWidth = el?.offsetWidth || 150; 
                const elHeight = el?.offsetHeight || 40; 

                // Спавним их выше верхней границы блока, чтобы они падали внутрь
                // Разносим их по высоте (index * 50), чтобы они не падали единым кирпичом
                const x = 50 + Math.random() * (width - 100);
                const y = -100 - (index * 60); 

                const body = Bodies.rectangle(x, y, elWidth, elHeight, {
                    chamfer: { radius: elHeight / 2 }, // Скругление углов физического тела
                    restitution: 0.2, // Упругость (низкая, чтобы не прыгали вечно)
                    friction: 0.5,    // Трение (чтобы не скользили как по льду)
                    frictionAir: 0.04, // Сопротивление воздуха (плавность падения)
                    density: 0.001,
                    angle: (Math.random() - 0.5) * 0.5, // Небольшой наклон при старте
                    label: `bubble-${bubble.id}`,
                });

                bubblesBodies.push({ bubbleId: bubble.id, body, width: elWidth, height: elHeight });
            });

            // 2. Стены и ПОЛ
            const wallThickness = 200; // Толстые стены, чтобы не пролетали сквозь них
            
            // Пол: Располагаем его прямо под нижней границей (height + половина толщины)
            const ground = Bodies.rectangle(width / 2, height + (wallThickness / 2), width * 2, wallThickness, { 
                isStatic: true,
                render: { visible: false }
            });

            const wallLeft = Bodies.rectangle(0 - (wallThickness / 2), height / 2, wallThickness, height * 4, { isStatic: true });
            const wallRight = Bodies.rectangle(width + (wallThickness / 2), height / 2, wallThickness, height * 4, { isStatic: true });

            Composite.add(engine.world, [...bubblesBodies.map(b => b.body), ground, wallLeft, wallRight]);

            const runner = Runner.create();
            runnerRef.current = runner;
            Runner.run(runner, engine);

            Events.on(engine, "afterUpdate", () => {
                bubblesBodies.forEach(({ bubbleId, body, width: w, height: h }) => {
                    const el = bubbleElements.current.get(bubbleId);
                    if (el) {
                        const x = body.position.x - w / 2;
                        const y = body.position.y - h / 2;
                        el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${body.angle}rad)`;
                        
                        // Респаун удален: теперь они просто лежат на 'ground'
                    }
                });
            });
        };

        // Задержка нужна, чтобы DOM успел отрисоваться и дать правильные размеры
        initTimeout = setTimeout(initPhysics, 100);

        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(initPhysics, 300);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            clearTimeout(initTimeout);
            clearTimeout(resizeTimeout);
            window.removeEventListener("resize", handleResize);
            clearWorld();
        };
    }, []);

    return (
        <div ref={sceneRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            {BUBBLES_DATA.map((bubble) => (
                <div
                    key={bubble.id}
                    ref={(el) => {
                        if (el) bubbleElements.current.set(bubble.id, el);
                        else bubbleElements.current.delete(bubble.id);
                    }}
                    className={cn(
                        "absolute top-0 left-0 pointer-events-none", 
                        "flex items-center rounded-full text-white font-semibold select-none whitespace-nowrap will-change-transform shadow-sm opacity-80",
                        // Стили плашек
                        "px-3 py-1.5 gap-1.5 text-[12px]", 
                        "lg:px-5 lg:py-2.5 lg:gap-2.5 lg:text-[16px]", 
                        bubble.colorClass
                    )}
                    style={{
                        transform: 'translate3d(-9999px, -9999px, 0)',
                    }}
                >
                    <bubble.icon className="w-3.5 h-3.5 lg:w-5 lg:h-5" strokeWidth={2.5} />
                    <span>{bubble.title}</span>
                </div>
            ))}
        </div>
    );
};