import { Edit, Trash } from "lucide-react";
import { formatPrice } from "@/shared/utils";
import { AdminChannelsRowProps } from "../types/admin-channel-row.props";

export const AdminChannelsRow = ({
    id,
    name,
    category,
    subscribers,
    price,
    onEdit,
    onDelete,
    searchTerm = "",
    withActions = true // <-- Принимаем флаг
}: AdminChannelsRowProps) => {

    // Та же логика сетки, что и в таблице
    const gridClassName = withActions
        ? "grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr_0.8fr] gap-4 items-center"
        : "grid grid-cols-[0.5fr_2.8fr_1fr_1fr_1fr] gap-4 items-center";

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

    return (
        <div className={`${gridClassName} bg-card hover:bg-[#2b2b2b] transition-colors rounded-xl px-5 py-4 text-white`}>
            <div className="text-gray-400 text-[18px]">
                №{id}
            </div>
            
            <div className="truncate pr-4 text-[18px]" title={name}>
                {renderHighlightedName(name, searchTerm)}
            </div>
            
            <div className="text-gray-300">
                {category}
            </div>
            <div className="text-[18px]">
                {formatPrice(subscribers)}
            </div>
            <div className="text-[18px]">
                {formatPrice(price)}р
            </div>
            
            {/* Рендерим кнопки только если withActions === true */}
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