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

        // Создаем движок
        const engine = Engine.create({
            positionIterations: 8,
            velocityIterations: 8
        });
        engineRef.current = engine;
        engine.gravity.y = 1;

        const container = containerRef.current;
        let width = container.clientWidth;
        let height = container.clientHeight;

        const wallThickness = 1000; 
        const renderHidden = { visible: false };

        // 1. Создаем границы (стены)
        // Выносим создание стен в переменные, чтобы иметь к ним доступ
        const ground = Bodies.rectangle(width / 2, height + wallThickness / 2 - 10, width + 200, wallThickness, { isStatic: true, render: renderHidden, label: "ground" });
        const wallLeft = Bodies.rectangle(0 - wallThickness / 2, height / 2, wallThickness, height * 2, { isStatic: true, render: renderHidden, label: "wall" });
        const wallRight = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, { isStatic: true, render: renderHidden, label: "wall" });
        const ceiling = Bodies.rectangle(width / 2, -wallThickness / 2, width + 200, wallThickness, { isStatic: true, render: renderHidden, label: "ceiling" });

        const bubblesBodies: { id: number; body: Matter.Body; w: number; h: number }[] = [];

        // 2. Создаем тела
        items.forEach((item) => {
            const el = elementsMap.current.get(item.id);
            if (!el) return;

            // Тут берутся размеры элемента. Так как CSS уже применил адаптивные классы,
            // размеры w и h будут маленькими на телефоне и большими на ПК автоматически.
            const w = el.offsetWidth;
            const h = el.offsetHeight;

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

        // 3. Настройка мыши и тача
        const mouse = Mouse.create(container);
        
        // ВАЖНО: Ставим none, чтобы браузер не скроллил страницу при перетаскивании тегов пальцем
        mouse.element.style.touchAction = "none";

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

        // 4. Логика "потолка" (не даем улететь вверх)
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

        // 5. Синхронизация
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

        // 6. Обработка ресайза (поворот экрана)
        const handleResize = () => {
            if (!containerRef.current) return;
            const newWidth = containerRef.current.clientWidth;
            const newHeight = containerRef.current.clientHeight;

            // Обновляем позиции стен
            Body.setPosition(ground, { x: newWidth / 2, y: newHeight + wallThickness / 2 - 10 });
            Body.setPosition(ceiling, { x: newWidth / 2, y: -wallThickness / 2 });
            Body.setPosition(wallLeft, { x: 0 - wallThickness / 2, y: newHeight / 2 });
            Body.setPosition(wallRight, { x: newWidth + wallThickness / 2, y: newHeight / 2 });
            
            // Можно также обновить геометрию стен (vertices), если высота сильно меняется, 
            // но для прямоугольников достаточно переместить центр, если они достаточно длинные.
            // У нас wallHeight = height * 2, этого должно хватить.
        };

        window.addEventListener('resize', handleResize);

        setIsReady(true);

        return () => {
            window.removeEventListener('resize', handleResize);
            Runner.stop(runner);
            Matter.Engine.clear(engine);
            Matter.Composite.clear(engine.world, false);
            engineRef.current = null;
            runnerRef.current = null;
        };
    }, [items]);

    return { isReady };
};