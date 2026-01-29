import { OurServiceCardProps } from "../types/our-service-card.props";
import { 
    DevelopmentIcon, 
    SeoIcon, 
    DesignIcon, 
    SmmIcon, 
    ContextIcon 
} from "../icons";

export const TOP_SERVICE: OurServiceCardProps[] = [
    {
        icon: DevelopmentIcon,
        title: "Размещение рекламы в Telegram, VK и MAX",
        image: "telegram.png"
    },
    {
        icon: SeoIcon,
        title: "Подбор и рекомендация площадок под задачу",
        image: "social-selection.png"
    },
    {
        icon: DesignIcon,
        title: "Написание рекламных постов",
        image: "post-writing.png"
    }
]

export const BOTTOM_SERVICE: OurServiceCardProps[] = [
    {
        icon: SmmIcon,
        title: "Консультация по стратегии и форматам размещений",
        image: "consultation-chat.png"
    },
    {
        icon: ContextIcon,
        title: "Контроль сроков и выходов публикаций",
        image: "calendar-control.png"
    }
]