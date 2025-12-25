import { Variants } from "framer-motion"

export const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
}

// 2. Явно указываем тип : Variants
export const itemVariants: Variants = {
    hidden: { 
        opacity: 0, 
        y: 20, 
        scale: 0.95 
    },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: {
            type: "spring", // Теперь TS понимает, что это валидный тип анимации
            stiffness: 100,
            damping: 20
        }
    }
}