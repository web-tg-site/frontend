import { Variants } from "framer-motion";

export const textContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
};

export const digitAppearance: Variants = {
    hidden: { y: 50, opacity: 0, rotate: 5 },
    visible: {
        y: 0, opacity: 1, rotate: 0,
        transition: { type: "spring", stiffness: 120, damping: 12 },
    },
};

// Вылет слева (Красный блок + Черный блок на десктопе)
export const slideInLeft: Variants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
        x: 0, opacity: 1,
        transition: { type: "spring", stiffness: 80, damping: 15 }
    },
};

// Вылет слева С ЗАДЕРЖКОЙ (для черного блока на десктопе)
export const slideInLeftDelayed: Variants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
        x: 0, opacity: 1,
        transition: { type: "spring", stiffness: 80, damping: 15, delay: 0.15 }
    },
};

// Вылет справа (Для планшета и мобильного - черный блок)
export const slideInRight: Variants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
        x: 0, opacity: 1,
        transition: { type: "spring", stiffness: 80, damping: 15, delay: 0.1 }
    },
};