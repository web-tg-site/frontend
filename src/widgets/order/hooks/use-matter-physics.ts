import { useEffect, useState, MutableRefObject, useRef } from "react";
import Matter from "matter-js";

interface PhysicsItem {
    id: number;
}

export const useMatterPhysics = (
    containerRef: MutableRefObject<HTMLDivElement | null>,
    items: PhysicsItem[],
    elementsMap: MutableRefObject<Map<number, HTMLDivElement>>
) => {
    const [isReady, setIsReady] = useState(false);
    const engineRef = useRef<Matter.Engine | null>(null);
    const runnerRef = useRef<Matter.Runner | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint, Events, Body } = Matter;

        // Настройки движка
        const engine = Engine.create({
            positionIterations: 8,
            velocityIterations: 8
        });
        engineRef.current = engine;
        engine.gravity.y = 1;

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        const wallThickness = 1000; 
        const renderHidden = { visible: false };

        // 1. Границы (Пол, Стены, Потолок)
        const ground = Bodies.rectangle(width / 2, height + wallThickness / 2 - 10, width + 200, wallThickness, { isStatic: true, render: renderHidden, label: "ground" });
        const wallLeft = Bodies.rectangle(0 - wallThickness / 2, height / 2, wallThickness, height * 2, { isStatic: true, render: renderHidden, label: "wall" });
        const wallRight = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, { isStatic: true, render: renderHidden, label: "wall" });
        const ceiling = Bodies.rectangle(width / 2, -wallThickness / 2, width + 200, wallThickness, { isStatic: true, render: renderHidden, label: "ceiling" });

        const bubblesBodies: { id: number; body: Matter.Body; w: number; h: number }[] = [];

        // 2. Создание тел для элементов
        items.forEach((item) => {
            const el = elementsMap.current.get(item.id);
            if (!el) return;

            const w = el.offsetWidth;
            const h = el.offsetHeight;

            // Спавн в центре/внизу, чтобы не застряли в потолке
            const x = Math.random() * (width - 100) + 50;
            const y = Math.random() * (height / 2) + (height / 3); 

            const body = Bodies.rectangle(x, y, w, h, {
                chamfer: { radius: h / 2 },
                restitution: 0.4,
                friction: 0.5,
                density: 0.002,
                label: `bubble-${item.id}`,
            });

            Body.setAngle(body, (Math.random() - 0.5) * 0.5);
            bubblesBodies.push({ id: item.id, body, w, h });
        });

        Composite.add(engine.world, [ground, wallLeft, wallRight, ceiling, ...bubblesBodies.map(b => b.body)]);

        // 3. Настройка мыши
        const mouse = Mouse.create(container);
        mouse.element.style.touchAction = "pan-y";

        const mouseElement = mouse.element as HTMLElement;
        const mouseWheelHandler = (mouse as unknown as { mousewheel: (e: Event) => void }).mousewheel;
        
        mouseElement.removeEventListener("mousewheel", mouseWheelHandler);
        mouseElement.removeEventListener("DOMMouseScroll", mouseWheelHandler);
        mouseElement.removeEventListener("wheel", mouseWheelHandler);

        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false }
            }
        });

        Composite.add(engine.world, mouseConstraint);

        const runner = Runner.create();
        runnerRef.current = runner;
        Runner.run(runner, engine);

        // 4. Ограничитель (Clamp) от пролета сквозь потолок
        Events.on(engine, "beforeUpdate", () => {
            bubblesBodies.forEach(({ body, h }) => {
                const radius = h / 2;
                if (body.position.y - radius < 0) {
                    Body.setPosition(body, {
                        x: body.position.x,
                        y: radius + 1 
                    });
                    if (body.velocity.y < 0) {
                        Body.setVelocity(body, { x: body.velocity.x, y: 0 });
                    }
                }
            });
        });

        // 5. Синхронизация DOM
        Events.on(engine, "afterUpdate", () => {
            bubblesBodies.forEach(({ id, body, w, h }) => {
                const el = elementsMap.current.get(id);
                if (el) {
                    const x = body.position.x - w / 2;
                    const y = body.position.y - h / 2;
                    el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${body.angle}rad)`;
                }
            });
        });

        setIsReady(true);

        return () => {
            Runner.stop(runner);
            Matter.Engine.clear(engine);
            Matter.Composite.clear(engine.world, false);
            engineRef.current = null;
            runnerRef.current = null;
        };
    }, [items]); // Зависимость от items, чтобы перезапускать при изменении данных (если нужно)

    return { isReady };
};