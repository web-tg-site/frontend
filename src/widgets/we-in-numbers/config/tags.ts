import { 
    Languages, Zap, Database, Smile, Rocket, Code, 
    Cat, Briefcase, Heart, Lightbulb, Dumbbell, 
    ShoppingBag, Activity, Landmark, Coins, 
    Apple, PieChart, Plane, Music 
} from "lucide-react";

export const TAGS = [
    // --- ПЕРЕДНИЙ ПЛАН (Крупные) ---
    { text: "Иностранные языки", icon: Languages, color: "bg-indigo-500", top: "10%", left: "10%", rotate: "-rotate-3", scale: "scale-110", z: 20 },
    { text: "Наука", icon: Zap, color: "bg-red-500", top: "5%", left: "40%", rotate: "rotate-6", scale: "scale-110", z: 20 },
    { text: "Криптовалюты", icon: Database, color: "bg-yellow-400", top: "15%", left: "65%", rotate: "rotate-6", scale: "scale-105", z: 20 },
    { text: "Космос", icon: Rocket, color: "bg-indigo-600", top: "8%", left: "90%", rotate: "rotate-12", scale: "scale-100", z: 10 },
    
    { text: "Бизнес", icon: Briefcase, color: "bg-teal-500", top: "35%", left: "50%", rotate: "-rotate-2", scale: "scale-125", z: 30 }, // Самый крупный
    { text: "Косметика", icon: Heart, color: "bg-red-400", top: "38%", left: "18%", rotate: "rotate-6", scale: "scale-115", z: 30 },
    { text: "Спорт", icon: Dumbbell, color: "bg-purple-600", top: "45%", left: "70%", rotate: "rotate-3", scale: "scale-110", z: 20 },
    
    { text: "Аналитика", icon: PieChart, color: "bg-yellow-500", top: "65%", left: "60%", rotate: "rotate-6", scale: "scale-110", z: 20 },
    { text: "Путешествия", icon: Plane, color: "bg-blue-500", top: "80%", left: "80%", rotate: "-rotate-3", scale: "scale-120", z: 30 },
    { text: "Танцы", icon: Music, color: "bg-orange-500", top: "75%", left: "40%", rotate: "rotate-6", scale: "scale-105", z: 20 },
    { text: "Лайфхаки", icon: Lightbulb, color: "bg-orange-400", top: "68%", left: "88%", rotate: "rotate-3", scale: "scale-100", z: 20 },

    // --- ЗАДНИЙ ПЛАН (Мелкие) ---
    { text: "Программирование", icon: Code, color: "bg-purple-300", top: "25%", left: "5%", rotate: "rotate-3", scale: "scale-90 opacity-40 blur-[1px]", z: 0 },
    { text: "Мемы", icon: Smile, color: "bg-green-500", top: "18%", left: "85%", rotate: "-rotate-6", scale: "scale-90 opacity-60", z: 10 },
    { text: "Животные", icon: Cat, color: "bg-blue-200", top: "20%", left: "35%", rotate: "-rotate-6", scale: "scale-75 opacity-50 blur-[1px]", z: 0 },
    { text: "Стартапы", icon: Rocket, color: "bg-pink-300", top: "30%", left: "25%", rotate: "rotate-12", scale: "scale-75 opacity-40 blur-[1px]", z: 0 },
    { text: "Экономика", icon: Coins, color: "bg-cyan-500", top: "60%", left: "30%", rotate: "-rotate-6", scale: "scale-90 opacity-60 blur-[0.5px]", z: 10 },
    { text: "Тренировки", icon: Activity, color: "bg-fuchsia-300", top: "50%", left: "45%", rotate: "-rotate-12", scale: "scale-75 opacity-30 blur-[2px]", z: 0 },
    { text: "Политика", icon: Landmark, color: "bg-blue-300", top: "55%", left: "55%", rotate: "rotate-3", scale: "scale-75 opacity-40 blur-[1px]", z: 0 },
    { text: "Правильное питание", icon: Apple, color: "bg-amber-700", top: "55%", left: "85%", rotate: "-rotate-12", scale: "scale-90 opacity-50 blur-[0.5px]", z: 10 },
    { text: "Обзоры покупок", icon: ShoppingBag, color: "bg-rose-300", top: "35%", left: "80%", rotate: "rotate-12", scale: "scale-75 opacity-30 blur-[2px]", z: 0 },
];