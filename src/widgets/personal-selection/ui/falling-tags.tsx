"use client";

import React, { useEffect, useRef, useMemo, useState } from "react";
import Matter from "matter-js";
import { 
    Heart, Repeat, Users, Eye, FileText, Send, MessageCircle, BarChart3, 
    Megaphone, Zap 
} from "lucide-react";

const BASE_TAGS = [
    { text: "Лайки", icon: Heart, className: "bg-[#FFC107] text-white" },
    { text: "Репосты", icon: Repeat, className: "bg-[#00D2BA] text-white" },
    { text: "Аудитория", icon: Users, className: "bg-[#F44336] text-white" },
    { text: "Просмотры", icon: Eye, className: "bg-[#8D6E63] text-white" },
    { text: "Публикации", icon: FileText, className: "bg-[#655AF9] text-white" },
    { text: "Телеграм каналы", icon: Send, className: "bg-[#FF9800] text-white" },
    { text: "Посты", icon: MessageCircle, className: "bg-[#E91E63] text-white" },
    { text: "Реклама", icon: Megaphone, className: "bg-[#2979FF] text-white" },
    { text: "Охваты", icon: BarChart3, className: "bg-[#00E676] text-white" },
    { text: "Тренды", icon: Zap, className: "bg-[#FFEA00] text-white" },
];

export const FallingTags = () => {
    const sceneRef = useRef<HTMLDivElement>(null);
    const elementsRef = useRef<Map<string, HTMLDivElement>>(new Map());
    const engineRef = useRef<Matter.Engine | null>(null);
    const runnerRef = useRef<Matter.Runner | null>(null);
    
    // Состояние для принудительного перезапуска при ресайзе
    const [sceneKey, setSceneKey] = useState(0);

    const items = useMemo(() => {
        return Array.from({ length: 35 }).map((_, i) => {
            const base = BASE_TAGS[i % BASE_TAGS.length];
            return {
                ...base,
                id: `tag-${i}`,
            };
        });
    }, []);

    // Слушатель ресайза: если окно меняется, перезапускаем физику, 
    // чтобы "твердые тела" (bodies) подстроились под новые визуальные размеры тэгов
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setSceneKey(prev => prev + 1);
            }, 300); // Debounce
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!sceneRef.current) return;
        
        // Если экран 500px или меньше, не запускаем физику вообще
        if (window.innerWidth <= 500) return;

        const initTimeout = setTimeout(() => {
            if (!sceneRef.current) return;

            // Очистка предыдущего инстанса, если он был
            if (engineRef.current) Matter.Engine.clear(engineRef.current);
            if (runnerRef.current) Matter.Runner.stop(runnerRef.current);

            const { Engine, Runner, Bodies, Composite, Events, Body } = Matter;

            const engine = Engine.create();
            engine.gravity.y = 1; 
            engineRef.current = engine;

            const width = sceneRef.current.clientWidth;
            const height = sceneRef.current.clientHeight;

            const wallThickness = 200;

            const ground = Bodies.rectangle(
                width / 2, height + wallThickness / 2, 
                width * 2, wallThickness, 
                { isStatic: true, label: "ground" }
            );

            const rightWall = Bodies.rectangle(
                width + wallThickness / 2, height / 2, 
                wallThickness, height * 4, 
                { isStatic: true, label: "rightWall" }
            );

            const leftBarrierX = width < 768 ? -wallThickness : width * 0.35; 
            const leftWall = Bodies.rectangle(
                leftBarrierX - wallThickness / 2, height / 2, 
                wallThickness, height * 4, 
                { isStatic: true, label: "leftWall" }
            );

            const bodies: Matter.Body[] = [];

            items.forEach((item, i) => {
                const el = elementsRef.current.get(item.id);
                if (!el) return;

                // Matter.js берет размеры прямо из DOM. 
                // Благодаря CSS медиа-запросам, offsetWidth тут будет уже уменьшенным.
                const w = el.offsetWidth;
                const h = el.offsetHeight;

                const spawnMinX = Math.max(leftBarrierX + 50, width * 0.5);
                const spawnMaxX = width - 50;
                
                const x = spawnMinX + Math.random() * (spawnMaxX - spawnMinX);
                const y = -150 - (i * 100); 

                const body = Bodies.rectangle(x, y, w, h, {
                    angle: (Math.random() - 0.5) * 0.8,
                    chamfer: { radius: h / 2 },
                    restitution: 0.2,
                    friction: 0.6,
                    density: 0.002,
                });

                (body as any).tagId = item.id;
                bodies.push(body);
            });

            Composite.add(engine.world, [...bodies, ground, rightWall, leftWall]);

            const runner = Runner.create();
            runnerRef.current = runner;
            Runner.run(runner, engine);

            Events.on(engine, "afterUpdate", () => {
                bodies.forEach((body) => {
                    const id = (body as any).tagId;
                    const el = elementsRef.current.get(id);
                    
                    if (el) {
                        const { x, y } = body.position;
                        el.style.transform = `translate3d(${x - el.offsetWidth/2}px, ${y - el.offsetHeight/2}px, 0) rotate(${body.angle}rad)`;

                        if (y > height + 200) {
                            Body.setPosition(body, {
                                x: width - 100 - Math.random() * 300,
                                y: -200
                            });
                            Body.setVelocity(body, { x: 0, y: 0 });
                        }
                    }
                });
            });

        }, 100);

        return () => {
            clearTimeout(initTimeout);
            if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
            if (engineRef.current) Matter.Engine.clear(engineRef.current);
        };
    }, [items, sceneKey]); // sceneKey заставляет эффект перезапуститься при ресайзе

    return (
        <div 
            ref={sceneRef} 
            // Добавлено: max-[500px]:hidden - скрывает весь блок на мобильных
            className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 max-[500px]:hidden"
        >
            {items.map((item) => (
                <div
                    key={item.id}
                    ref={(el) => {
                        if (el) elementsRef.current.set(item.id, el);
                    }}
                    // ИЗМЕНЕНИЯ ЗДЕСЬ:
                    // 1. px/py и gap уменьшены вдвое по умолчанию (для 500-1024px)
                    // 2. lg: (для > 1024px) возвращают оригинальные большие размеры
                    className={`
                        absolute left-0 top-0 flex items-center rounded-full shadow-lg will-change-transform 
                        
                        gap-1.5 px-3.5 py-2 
                        lg:gap-3 lg:px-7 lg:py-3.5
                        
                        ${item.className}
                    `}
                    style={{ transform: "translate3d(-500px, -500px, 0)" }}
                >
                    {/* Иконка: размеры через Tailwind классы вместо size prop */}
                    <item.icon 
                        strokeWidth={2.5} 
                        className="w-3 h-3 lg:w-6 lg:h-6"
                    />
                    
                    {/* Текст: размер 10px для планшетов, 20px для десктопа */}
                    <span className="font-bold leading-none pb-0.5 text-[10px] lg:text-[20px]">
                        {item.text}
                    </span>
                </div>
            ))}
        </div>
    );
};