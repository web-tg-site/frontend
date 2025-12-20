"use client";

import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import { useRouter } from "next/navigation";
import { cn } from "@/shared/utils";
import { 
    Camera, Code, Bitcoin, Mic, BookOpen, Briefcase, 
    Plane, Gamepad2, Heart, GraduationCap, Globe, 
    Palette, Smile, Zap, Coffee, LucideIcon 
} from "lucide-react";

interface BubbleData {
    id: number;
    title: string;
    icon: LucideIcon;
    colorClass: string;
    href: string;
}

const BUBBLES_DATA: BubbleData[] = [
    { id: 1, title: "Фотография", icon: Camera, colorClass: "bg-orange-500", href: "/catalog/photo" },
    { id: 2, title: "Наука", icon: BookOpen, colorClass: "bg-teal-400", href: "/catalog/science" },
    { id: 3, title: "Еда", icon: Coffee, colorClass: "bg-green-500", href: "/catalog/food" },
    { id: 4, title: "Подкасты", icon: Mic, colorClass: "bg-cyan-500", href: "/catalog/podcasts" },
    { id: 5, title: "Шоппинг", icon: Zap, colorClass: "bg-indigo-500", href: "/catalog/reviews" },
    { id: 6, title: "Крипта", icon: Bitcoin, colorClass: "bg-emerald-500", href: "/catalog/crypto" },
    { id: 7, title: "Код", icon: Code, colorClass: "bg-blue-600", href: "/catalog/programming" },
    { id: 8, title: "Бизнес", icon: Briefcase, colorClass: "bg-purple-500", href: "/catalog/analytics" },
    { id: 9, title: "Акции", icon: Zap, colorClass: "bg-yellow-500", href: "/catalog/sales" },
    { id: 10, title: "Дом", icon: Heart, colorClass: "bg-fuchsia-500", href: "/catalog/home" },
    { id: 11, title: "Игры", icon: Gamepad2, colorClass: "bg-red-500", href: "/catalog/games" },
    { id: 12, title: "Travel", icon: Plane, colorClass: "bg-orange-400", href: "/catalog/travel" },
    { id: 13, title: "AI", icon: Globe, colorClass: "bg-violet-600", href: "/catalog/ai" },
    { id: 14, title: "Учеба", icon: GraduationCap, colorClass: "bg-sky-500", href: "/catalog/education" },
    { id: 15, title: "Арт", icon: Palette, colorClass: "bg-amber-600", href: "/catalog/art" },
    { id: 16, title: "Beauty", icon: Smile, colorClass: "bg-rose-500", href: "/catalog/beauty" },
];

export const BubblesLayer = () => {
    const sceneRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const bubbleElements = useRef<Map<number, HTMLDivElement>>(new Map());
    const engineRef = useRef<Matter.Engine | null>(null);

    useEffect(() => {
        const Engine = Matter.Engine,
              Runner = Matter.Runner,
              Bodies = Matter.Bodies,
              Composite = Matter.Composite,
              Mouse = Matter.Mouse,
              MouseConstraint = Matter.MouseConstraint,
              Events = Matter.Events;

        const engine = Engine.create();
        engineRef.current = engine;
        
        // Немного уменьшил гравитацию для плавности
        engine.gravity.y = 0.5; 

        const width = window.innerWidth;
        const height = window.innerHeight;

        // --- БАБЛЫ ---
        const bubblesBodies = BUBBLES_DATA.map((bubble) => {
            const x = Math.random() * width;
            const y = Math.random() * -800 - 100; 
            const radius = 24; 

            return { 
                bubbleId: bubble.id, 
                body: Bodies.circle(x, y, radius, {
                    restitution: 0.5,
                    friction: 0.005,
                    frictionAir: 0.01,
                    density: 0.04,
                    label: `bubble-${bubble.id}`,
                }) 
            };
        });

        // --- СТЕНЫ ---
        const ground = Bodies.rectangle(width / 2, height + 60, width, 120, { isStatic: true });
        const wallLeft = Bodies.rectangle(-60, height / 2, 120, height * 2, { isStatic: true });
        const wallRight = Bodies.rectangle(width + 60, height / 2, 120, height * 2, { isStatic: true });

        // --- КОЛЛИЗИЯ ТЕЛЕФОНА ---
        const phoneWidth = 440;
        const phoneHeight = 850;
        
        // Визуально телефон торчит на ~320-340px снизу.
        // Нам нужно расположить коллайдер так, чтобы его верхняя грань была на (height - 320).
        // Центр прямоугольника = Верхняя грань + Половина высоты.
        // CenterY = (height - 320) + (850 / 2) = height - 320 + 425 = height + 105.
        // Ставим height + 120 для запаса (чуть ниже), чтобы баблы немного перекрывали край.
        const phoneColliderY = height + 120;

        const phoneCollider = Bodies.rectangle(
            width / 2, 
            phoneColliderY, 
            phoneWidth, 
            phoneHeight, 
            { 
                isStatic: true,
                // chamfer создает скругленные углы у физического тела.
                // radius: [TopLeft, TopRight, BottomRight, BottomLeft]
                chamfer: { radius: [60, 60, 0, 0] }, 
                render: { visible: false }
            }
        );

        Composite.add(engine.world, [
            ...bubblesBodies.map(b => b.body),
            ground,
            wallLeft,
            wallRight,
            phoneCollider
        ]);

        // --- МЫШЬ ---
        const mouse = Mouse.create(document.body);
        
        // Отключаем перехват стандартных событий браузера
        // @ts-ignore
        mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
        // @ts-ignore
        mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
        // @ts-ignore
        mouse.element.removeEventListener("touchmove", mouse.mousemove);
        // @ts-ignore
        mouse.element.removeEventListener("touchstart", mouse.mousedown);
        // @ts-ignore
        mouse.element.removeEventListener("touchend", mouse.mouseup);

        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.15,
                render: { visible: false }
            }
        });

        Composite.add(engine.world, mouseConstraint);

        // Логика клика
        let startPos = { x: 0, y: 0 };
        Events.on(mouseConstraint, "mousedown", (event) => {
            startPos = { x: event.mouse.position.x, y: event.mouse.position.y };
        });

        Events.on(mouseConstraint, "mouseup", (event) => {
            const endPos = event.mouse.position;
            const dist = Math.hypot(endPos.x - startPos.x, endPos.y - startPos.y);
            
            if (dist < 5 && mouseConstraint.body) {
                const label = mouseConstraint.body.label;
                if (label && label.startsWith("bubble-")) {
                    const id = parseInt(label.replace("bubble-", ""));
                    const bubble = BUBBLES_DATA.find(b => b.id === id);
                    if (bubble) router.push(bubble.href);
                }
            }
        });

        const runner = Runner.create();
        Runner.run(runner, engine);

        // Синхронизация
        Events.on(engine, "afterUpdate", () => {
            bubblesBodies.forEach(({ bubbleId, body }) => {
                const el = bubbleElements.current.get(bubbleId);
                if (el) {
                    el.style.transform = `translate3d(${body.position.x - el.offsetWidth / 2}px, ${body.position.y - el.offsetHeight / 2}px, 0) rotate(${body.angle}rad)`;
                    
                    if (body.position.y > height + 200) {
                         Matter.Body.setPosition(body, { x: Math.random() * width, y: -100 });
                         Matter.Body.setVelocity(body, { x: 0, y: 0 });
                    }
                }
            });
        });

        return () => {
            Runner.stop(runner);
            Matter.Engine.clear(engine);
        };
    }, []);

    return (
        <div ref={sceneRef} className="absolute inset-0 w-full h-full z-30 overflow-hidden pointer-events-none">
            {BUBBLES_DATA.map((bubble) => (
                <div
                    key={bubble.id}
                    ref={(el) => {
                        if (el) bubbleElements.current.set(bubble.id, el);
                        else bubbleElements.current.delete(bubble.id);
                    }}
                    className={cn(
                        "absolute top-0 left-0",
                        "flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-medium shadow-lg select-none whitespace-nowrap",
                        "will-change-transform cursor-grab active:cursor-grabbing pointer-events-auto", 
                        bubble.colorClass
                    )}
                >
                    <bubble.icon size={20} strokeWidth={2.5} />
                    <span className="text-[15px]">{bubble.title}</span>
                </div>
            ))}
        </div>
    );
};