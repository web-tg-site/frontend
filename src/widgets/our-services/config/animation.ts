import { Variants } from "framer-motion";

export const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { 
            type: "spring",
            stiffness: 100,
            damping: 20
        } 
    }
};

export const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
}