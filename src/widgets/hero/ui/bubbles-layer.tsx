"use client";

import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import { useRouter } from "next/navigation";
import { cn } from "@/shared/utils";
import { 
    Camera, Code, Bitcoin, Mic, BookOpen, Briefcase, 
    Plane, Gamepad2, Heart, GraduationCap, Globe, 
    Palette, Smile, Zap, Apple, ShoppingBag, Landmark, 
    BarChart3, Rocket, Megaphone, Tag, Home, 
    BrainCircuit, Lightbulb, Languages, TrendingUp, Sparkles, LucideIcon 
} from "lucide-react";

interface BubbleData {
    id: number;
    title: string;
    icon: LucideIcon;
    colorClass: string;
    href: string;
}

const BUBBLES_DATA: BubbleData[] = [
    // Левая сторона макета
    { id: 1, title: "Фотография", icon: Camera, colorClass: "bg-orange-500", href: "/catalog/photo" },
    { id: 2, title: "Правильное питание", icon: Apple, colorClass: "bg-green-600", href: "/catalog/nutrition" },
    { id: 3, title: "Наука", icon: BookOpen, colorClass: "bg-teal-500", href: "/catalog/science" },
    { id: 4, title: "Подкасты", icon: Mic, colorClass: "bg-cyan-500", href: "/catalog/podcasts" },
    { id: 5, title: "Обзоры покупок", icon: ShoppingBag, colorClass: "bg-indigo-600", href: "/catalog/shopping" },
    { id: 6, title: "Криптовалюты", icon: Bitcoin, colorClass: "bg-emerald-500", href: "/catalog/crypto" },
    { id: 7, title: "Политика", icon: Landmark, colorClass: "bg-blue-600", href: "/catalog/politics" },
    { id: 8, title: "Аналитика", icon: BarChart3, colorClass: "bg-fuchsia-600", href: "/catalog/analytics" },
    { id: 9, title: "Мемы", icon: Smile, colorClass: "bg-rose-600", href: "/catalog/memes" },
    { id: 10, title: "Программирование", icon: Code, colorClass: "bg-blue-500", href: "/catalog/programming" },
    { id: 11, title: "Стартапы", icon: Rocket, colorClass: "bg-red-500", href: "/catalog/startups" },
    { id: 12, title: "Маркетинг", icon: Megaphone, colorClass: "bg-orange-600", href: "/catalog/marketing" },
    
    // Правая сторона макета
    { id: 13, title: "Акции и купоны", icon: Tag, colorClass: "bg-yellow-500", href: "/catalog/sales" },
    { id: 14, title: "Уют и комфорт", icon: Home, colorClass: "bg-purple-600", href: "/catalog/home" },
    { id: 15, title: "Здоровье", icon: Heart, colorClass: "bg-green-500", href: "/catalog/health" },
    { id: 16, title: "Видеоигры", icon: Gamepad2, colorClass: "bg-red-600", href: "/catalog/games" },
    { id: 17, title: "Путешествия", icon: Plane, colorClass: "bg-orange-500", href: "/catalog/travel" },
    { id: 18, title: "Образование", icon: GraduationCap, colorClass: "bg-blue-500", href: "/catalog/education" },
    { id: 19, title: "Нейросети", icon: BrainCircuit, colorClass: "bg-violet-600", href: "/catalog/ai" },
    { id: 20, title: "Лайфхаки", icon: Lightbulb, colorClass: "bg-teal-600", href: "/catalog/lifehacks" },
    { id: 21, title: "Бизнес", icon: Briefcase, colorClass: "bg-amber-700", href: "/catalog/business" },
    { id: 22, title: "Искусство", icon: Palette, colorClass: "bg-orange-400", href: "/catalog/art" },
    { id: 23, title: "Иностранные языки", icon: Languages, colorClass: "bg-yellow-400", href: "/catalog/languages" },
    { id: 24, title: "Красота", icon: Sparkles, colorClass: "bg-rose-500", href: "/catalog/beauty" },
    { id: 25, title: "Саморазвитие", icon: TrendingUp, colorClass: "bg-indigo-500", href: "/catalog/self-development" },
];

export const BubblesLayer = () => {
    const sceneRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const bubbleElements = useRef<Map<number, HTMLDivElement>>(new Map());
    const runnerRef = useRef<Matter.Runner | null>(null);
    const engineRef = useRef<Matter.Engine | null>(null);

    useEffect(() => {
        if (!sceneRef.current) return;

        const initTimeout = setTimeout(initPhysics, 50);

        function initPhysics() {
            if (!sceneRef.current) return;

            const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint, Events, Body } = Matter;

            const engine = Engine.create();
            engineRef.current = engine;
            
            engine.gravity.y = 0.6;

            const width = window.innerWidth;
            const height = window.innerHeight;

            const bubblesBodies: { bubbleId: number; body: Matter.Body; width: number; height: number }[] = [];

            BUBBLES_DATA.forEach((bubble) => {
                const el = bubbleElements.current.get(bubble.id);
                // Если элемент еще не отрисован (например, при ssr или лаге), берем дефолтные увеличенные размеры
                const elWidth = el?.offsetWidth || 160; 
                const elHeight = el?.offsetHeight || 52; 

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
                Body.setVelocity(body, { 
                    x: (Math.random() - 0.5) * 4, 
                    y: 5 + Math.random() * 5 
                });

                bubblesBodies.push({ bubbleId: bubble.id, body, width: elWidth, height: elHeight });
            });

            // Стены и пол
            const wallThickness = 100;
            const ground = Bodies.rectangle(width / 2, height + wallThickness / 2, width + 400, wallThickness, { isStatic: true });
            const wallLeft = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 3, { isStatic: true });
            const wallRight = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 3, { isStatic: true });

            // Телефон
            const phoneWidth = 420;
            const phoneVisibleHeight = 350;
            const phoneTopY = height - 340;
            const phoneCenterY = phoneTopY + phoneVisibleHeight / 2;

            const phoneCollider = Bodies.rectangle(
                width / 2, 
                phoneCenterY, 
                phoneWidth, 
                phoneVisibleHeight, 
                { 
                    isStatic: true,
                    chamfer: { radius: [55, 55, 20, 20] },
                }
            );

            Composite.add(engine.world, [
                ...bubblesBodies.map(b => b.body),
                ground,
                wallLeft,
                wallRight,
                phoneCollider
            ]);

            const mouse = Mouse.create(document.body);
            mouse.element.style.touchAction = "auto";
            
            // @ts-ignore
            mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
            // @ts-ignore
            mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
            // @ts-ignore
            mouse.element.removeEventListener("wheel", mouse.mousewheel);

            const mouseConstraint = MouseConstraint.create(engine, {
                mouse,
                constraint: {
                    stiffness: 0.2,
                    render: { visible: false }
                }
            });

            Composite.add(engine.world, mouseConstraint);

            let isDragging = false;
            let draggedBody: Matter.Body | null = null;
            let dragStart = { x: 0, y: 0, time: 0 };

            Events.on(mouseConstraint, "startdrag", (event) => {
                if (event.body?.label?.startsWith("bubble-")) {
                    isDragging = true;
                    draggedBody = event.body;
                    dragStart = { 
                        x: mouse.position.x, 
                        y: mouse.position.y, 
                        time: Date.now() 
                    };
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
                            const bubble = BUBBLES_DATA.find(b => b.id === id);
                            if (bubble) {
                                router.push(bubble.href);
                            }
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

                        if (
                            body.position.y > height + 300 || 
                            body.position.x < -300 || 
                            body.position.x > width + 300
                        ) {
                            Body.setPosition(body, { 
                                x: 100 + Math.random() * (width - 200), 
                                y: -200 - Math.random() * 300 
                            });
                            Body.setVelocity(body, { x: (Math.random() - 0.5) * 5, y: 5 });
                            Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.1);
                        }
                    }
                });
            });
        }

        return () => {
            clearTimeout(initTimeout);
            if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
            if (engineRef.current) {
                Matter.Composite.clear(engineRef.current.world, false);
                Matter.Engine.clear(engineRef.current);
            }
        };
    }, [router]);

    return (
        <div 
            ref={sceneRef} 
            className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        >
            {BUBBLES_DATA.map((bubble) => (
                <div
                    key={bubble.id}
                    ref={(el) => {
                        if (el) bubbleElements.current.set(bubble.id, el);
                        else bubbleElements.current.delete(bubble.id);
                    }}
                    className={cn(
                        "absolute top-0 left-0 pointer-events-auto",
                        // ИЗМЕНЕНИЯ РАЗМЕРОВ ЗДЕСЬ:
                        "flex items-center gap-3 px-6 py-3.5 rounded-full", // Больше gap, px, py
                        "text-white font-semibold select-none whitespace-nowrap", // font-semibold
                        "will-change-transform cursor-grab active:cursor-grabbing",
                        "shadow-lg",
                        bubble.colorClass
                    )}
                    style={{
                        transform: 'translate3d(-9999px, -9999px, 0)',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.2), 0 2px 6px rgba(0,0,0,0.1)'
                    }}
                >
                    {/* Увеличен размер иконки до 24 */}
                    <bubble.icon size={24} strokeWidth={2.5} />
                    {/* Увеличен размер текста до 17px */}
                    <span className="text-[17px]">{bubble.title}</span>
                </div>
            ))}
        </div>
    );
};