"use client";

import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import { useRouter } from "next/navigation";
import { cn } from "@/shared/utils";
import { DynamicIcon } from "@/shared/ui/dynamic-icon";

export interface BubbleData {
    id: number;
    title: string;
    icon: string;
    color: string; // ✅ Теперь здесь HEX код
    href: string;
}

interface MouseConstraintEvent extends Matter.IEvent<Matter.MouseConstraint> {
    body?: Matter.Body;
}

// ✅ Перевел цвета из классов Tailwind в HEX
export const DEFAULT_BUBBLES: BubbleData[] = [
    { id: 1, title: "Фотография", icon: "Camera", color: "#F97316", href: "/catalog/photo" }, // orange-500
    { id: 2, title: "Правильное питание", icon: "Apple", color: "#16A34A", href: "/catalog/nutrition" }, // green-600
    { id: 3, title: "Наука", icon: "BookOpen", color: "#14B8A6", href: "/catalog/science" }, // teal-500
    { id: 4, title: "Подкасты", icon: "Mic", color: "#06B6D4", href: "/catalog/podcasts" }, // cyan-500
    { id: 5, title: "Обзоры покупок", icon: "ShoppingBag", color: "#4F46E5", href: "/catalog/shopping" }, // indigo-600
    { id: 6, title: "Криптовалюты", icon: "Bitcoin", color: "#10B981", href: "/catalog/crypto" }, // emerald-500
    { id: 7, title: "Политика", icon: "Landmark", color: "#2563EB", href: "/catalog/politics" }, // blue-600
    { id: 8, title: "Аналитика", icon: "BarChart3", color: "#C026D3", href: "/catalog/analytics" }, // fuchsia-600
    { id: 9, title: "Мемы", icon: "Smile", color: "#E11D48", href: "/catalog/memes" }, // rose-600
    { id: 10, title: "Программирование", icon: "Code", color: "#3B82F6", href: "/catalog/programming" }, // blue-500
    { id: 11, title: "Стартапы", icon: "Rocket", color: "#EF4444", href: "/catalog/startups" }, // red-500
    { id: 12, title: "Маркетинг", icon: "Megaphone", color: "#EA580C", href: "/catalog/marketing" }, // orange-600
    { id: 13, title: "Акции и купоны", icon: "Tag", color: "#EAB308", href: "/catalog/sales" }, // yellow-500
    { id: 14, title: "Уют и комфорт", icon: "Home", color: "#9333EA", href: "/catalog/home" }, // purple-600
    { id: 15, title: "Здоровье", icon: "Heart", color: "#22C55E", href: "/catalog/health" }, // green-500
    { id: 16, title: "Видеоигры", icon: "Gamepad2", color: "#DC2626", href: "/catalog/games" }, // red-600
    { id: 17, title: "Путешествия", icon: "Plane", color: "#F97316", href: "/catalog/travel" }, // orange-500
    { id: 18, title: "Образование", icon: "GraduationCap", color: "#3B82F6", href: "/catalog/education" }, // blue-500
    { id: 19, title: "Нейросети", icon: "BrainCircuit", color: "#7C3AED", href: "/catalog/ai" }, // violet-600
    { id: 20, title: "Лайфхаки", icon: "Lightbulb", color: "#0D9488", href: "/catalog/lifehacks" }, // teal-600
    { id: 21, title: "Бизнес", icon: "Briefcase", color: "#B45309", href: "/catalog/business" }, // amber-700
    { id: 22, title: "Искусство", icon: "Sparkles", color: "#FB923C", href: "/catalog/art" }, // orange-400
    { id: 23, title: "Иностранные языки", icon: "Languages", color: "#FACC15", href: "/catalog/languages" }, // yellow-400
    { id: 24, title: "Красота", icon: "Flower", color: "#F43F5E", href: "/catalog/beauty" }, // rose-500
    { id: 25, title: "Саморазвитие", icon: "TrendingUp", color: "#6366F1", href: "/catalog/self-development" }, // indigo-500
];

interface BubblesLayerProps {
    data?: BubbleData[];
}

export const BubblesLayer = ({
    data = DEFAULT_BUBBLES
}: BubblesLayerProps) => {
    const sceneRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const bubbleElements = useRef<Map<number, HTMLDivElement>>(new Map());
    const runnerRef = useRef<Matter.Runner | null>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const lastWidthRef = useRef<number>(0);

    useEffect(() => {
        const handlePointerUp = () => {
            if (sceneRef.current) {
                sceneRef.current.style.pointerEvents = "none";
                sceneRef.current.style.zIndex = "auto";
            }
        };
        window.addEventListener("pointerup", handlePointerUp);
        window.addEventListener("touchend", handlePointerUp);
        
        return () => {
            window.removeEventListener("pointerup", handlePointerUp);
            window.removeEventListener("touchend", handlePointerUp);
        };
    }, []);

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

            const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint, Events, Body } = Matter;
            const engine = Engine.create();
            engineRef.current = engine;
            engine.gravity.y = 0.6;

            const width = document.documentElement.clientWidth;
            const height = window.innerHeight;

            lastWidthRef.current = width;

            const bubblesBodies: { bubbleId: number; body: Matter.Body; width: number; height: number }[] = [];

            data.forEach((bubble) => {
                const el = bubbleElements.current.get(bubble.id);
                const elWidth = el?.offsetWidth || 150; 
                const elHeight = el?.offsetHeight || 40; 

                const x = width / 2 + (Math.random() - 0.5) * 300;
                const y = -200 - Math.random() * 1200;

                const body = Bodies.rectangle(x, y, elWidth, elHeight, {
                    chamfer: { radius: elHeight / 2 },
                    restitution: 0.5, 
                    friction: 0.02,
                    frictionAir: 0.01, 
                    density: 0.001,
                    angle: Math.random() * Math.PI * 2,
                    label: `bubble-${bubble.id}`,
                });

                Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.15);
                Body.setVelocity(body, { x: (Math.random() - 0.5) * 4, y: 5 + Math.random() * 5 });
                bubblesBodies.push({ bubbleId: bubble.id, body, width: elWidth, height: elHeight });
            });

            const wallThickness = 100;
            const ground = Bodies.rectangle(width / 2, height + wallThickness / 2, width + 400, wallThickness, { isStatic: true });
            const wallLeft = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 3, { isStatic: true });
            const wallRight = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 3, { isStatic: true });

            const bodiesToAdd = [...bubblesBodies.map(b => b.body), ground, wallLeft, wallRight];

            if (width > 500) {
                const phoneW = 445; 
                const phoneH = 350;
                const phoneTopY = height - 340; 
                const phoneCenterY = phoneTopY + (phoneH / 2);

                const phoneCollider = Bodies.rectangle(
                    width / 2, 
                    phoneCenterY, 
                    phoneW, 
                    phoneH, 
                    { 
                        isStatic: true,
                        chamfer: { radius: [60, 60, 20, 20] },
                    }
                );
                bodiesToAdd.push(phoneCollider);
            }

            Composite.add(engine.world, bodiesToAdd);

            const mouse = Mouse.create(sceneRef.current);
            // @ts-ignore
            mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
            // @ts-ignore
            mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

            const mouseConstraint = MouseConstraint.create(engine, {
                mouse,
                constraint: { stiffness: 0.2, render: { visible: false } }
            });
            Composite.add(engine.world, mouseConstraint);

            let isDragging = false;
            let draggedBody: Matter.Body | null = null;
            let dragStart = { x: 0, y: 0, time: 0 };

            Events.on(mouseConstraint, "startdrag", (e) => {
                const event = e as MouseConstraintEvent;
                if (event.body?.label?.startsWith("bubble-")) {
                    isDragging = true;
                    draggedBody = event.body;
                    dragStart = { x: mouse.position.x, y: mouse.position.y, time: Date.now() };
                }
            });

            Events.on(mouseConstraint, "enddrag", () => {
                if (isDragging && draggedBody) {
                    const dx = mouse.position.x - dragStart.x;
                    const dy = mouse.position.y - dragStart.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const duration = Date.now() - dragStart.time;
                    if (distance < 10 && duration < 250) {
                        const label = draggedBody.label;
                        if (label?.startsWith("bubble-")) {
                            const id = parseInt(label.replace("bubble-", ""));
                            const bubble = data.find(b => b.id === id);
                            if (bubble) router.push(bubble.href);
                        }
                    }
                }
                isDragging = false;
                draggedBody = null;
            });

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

                        if (body.position.y > height + 300 || body.position.x < -300 || body.position.x > width + 300) {
                            Body.setPosition(body, { x: 100 + Math.random() * (width - 200), y: -200 - Math.random() * 300 });
                            Body.setVelocity(body, { x: (Math.random() - 0.5) * 5, y: 5 });
                        }
                    }
                });
            });
        };

        initTimeout = setTimeout(initPhysics, 50);

        const handleResize = () => {
            const currentWidth = document.documentElement.clientWidth;
            if (Math.abs(currentWidth - lastWidthRef.current) < 50) return;
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
    }, [router, data]);

    return (
        <div ref={sceneRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            {data.map((bubble) => (
                <div
                    key={bubble.id}
                    ref={(el) => {
                        if (el) bubbleElements.current.set(bubble.id, el);
                        else bubbleElements.current.delete(bubble.id);
                    }}
                    onPointerDown={() => {
                        if (sceneRef.current) {
                            sceneRef.current.style.pointerEvents = "auto";
                            sceneRef.current.style.zIndex = "50";
                        }
                    }}
                    className={cn(
                        "absolute top-0 left-0 pointer-events-auto touch-none", 
                        "flex items-center rounded-full text-white font-semibold select-none whitespace-nowrap will-change-transform cursor-grab active:cursor-grabbing shadow-lg",
                        "px-3 py-2 gap-1.5", 
                        "min-[1025px]:px-6 min-[1025px]:py-3.5 min-[1025px]:gap-3"
                    )}
                    style={{
                        transform: 'translate3d(-9999px, -9999px, 0)',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.2), 0 2px 6px rgba(0,0,0,0.1)',
                        backgroundColor: bubble.color // ✅ Применяем цвет здесь инлайном
                    }}
                >
                    <DynamicIcon 
                        name={bubble.icon} 
                        className="w-3.5 h-3.5 min-[1025px]:w-6 min-[1025px]:h-6" 
                        strokeWidth={2.5} 
                    />
                    <span className="text-[10px] min-[1025px]:text-[17px]">{bubble.title}</span>
                </div>
            ))}
        </div>
    );
};