import { Edit, Trash, HelpCircle } from "lucide-react";
import * as icons from "lucide-react";
import { AdminCategoriesRowProps } from "../types/props";

export const AdminCategoriesRow = ({
    id,
    name,
    color,
    icon,
    onEdit,
    onDelete,
    searchTerm = "",
    withActions = true
}: AdminCategoriesRowProps) => {

    const gridClassName = withActions
        ? "grid grid-cols-[0.5fr_3fr_1fr_1fr_0.8fr] gap-4 items-center"
        : "grid grid-cols-[0.5fr_3.8fr_1fr_1fr] gap-4 items-center";

    const renderHighlightedName = (text: string, highlight: string) => {
        if (!highlight.trim()) return <span className="text-white">{text}</span>;
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <span>
                {parts.map((part, i) => {
                    const isMatch = part.toLowerCase() === highlight.toLowerCase();
                    return <span key={i} className={isMatch ? "text-white" : "text-gray-500"}>{part}</span>;
                })}
            </span>
        );
    };

    // Динамическое получение иконки
    const formattedIconName = icon ? (icon.charAt(0).toUpperCase() + icon.slice(1)) : "";
    // @ts-ignore
    const LucideIcon = icons[formattedIconName] || HelpCircle;

    return (
        <div className={`${gridClassName} bg-card hover:bg-[#2b2b2b] transition-colors rounded-xl px-5 py-4 text-white`}>
            {/* ID */}
            <div className="text-gray-400 text-[18px]">
                №{id}
            </div>
            
            {/* Название */}
            <div className="truncate pr-4 text-[18px]" title={name}>
                {renderHighlightedName(name, searchTerm)}
            </div>
            
            {/* Иконка */}
            <div className="flex items-center gap-2 text-gray-300">
                <div className="p-2 bg-white/5 rounded-lg">
                    {/* ✅ ИЗМЕНЕНИЕ: Иконка всегда белая */}
                    <LucideIcon size={20} className="text-white" />
                </div>
                {/* Название иконки текстом рядом */}
                <span className="text-xs text-gray-500 font-mono">{icon}</span>
            </div>

            {/* Цвет (кружок оставляем цветным, чтобы видеть, какой цвет привязан к категории) */}
            <div className="flex items-center gap-3">
                <div 
                    className="w-6 h-6 rounded-full border border-white/10 shadow-sm" 
                    style={{ backgroundColor: color }}
                />
                <span className="text-[16px] text-gray-300 uppercase">{color}</span>
            </div>
            
            {/* Действия */}
            {withActions && (
                <div className="flex items-center justify-end gap-2">
                    <button 
                        onClick={() => onEdit?.(id)}
                        className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer"
                    >
                        <Edit size={16} />
                    </button>
                    <button 
                        onClick={() => onDelete?.(id)}
                        className="w-8 h-8 rounded-full bg-white/5 hover:bg-red-500/20 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all cursor-pointer"
                    >
                        <Trash size={16} />
                    </button>
                </div>
            )}
        </div>
    );
};