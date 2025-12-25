import { Variants } from "framer-motion"

// Контейнер управляет очередностью
export const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.8, // Задержка между шагами
            delayChildren: 0.2
        }
    }
}

// Анимация круга: выезд слева направо
export const circleSlideVariants: Variants = {
    hidden: { 
        opacity: 0, 
        x: -100, // Спрятан слева (под предыдущим кругом)
    },
    visible: { 
        opacity: 1, 
        x: 0, // Выезжает на свое место
        transition: {
            type: "spring",
            stiffness: 120, // Энергичность пружины
            damping: 20,    // Гашение колебаний
            mass: 1
        }
    }
}