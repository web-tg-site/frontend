import { Edit, Trash, Pin, BadgeCheck, Menu } from "lucide-react";
import { cn } from "@/shared/utils";
import { AdminHeroRowProps } from "../types/admin-hero";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const AdminHeroRow = ({
    id,
    channelId,
    message,
    time,
    isPinned,
    isVerified,
    searchTerm,
    onDelete,
    onEdit
}: AdminHeroRowProps) => {

    // --- DND HOOK ---
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1, // Перетаскиваемый элемент всегда сверху
        position: 'relative' as const,
    };

    // Добавили 'auto' в начало сетки для иконки драга
    const gridClassName = "grid grid-cols-[auto_0.5fr_1fr_3fr_1fr_1fr_0.5fr] gap-4 items-center";

    const renderHighlightedText = (text: string, highlight: string) => {
        if (!highlight.trim()) return <span className="text-white">{text}</span>;
        const parts = text.split(new RegExp(`(${highlight})`, "gi"));
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
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                gridClassName, 
                "bg-card transition-colors rounded-xl px-5 py-4 text-white text-[14px]",
                // Меняем стиль при перетаскивании
                isDragging ? "opacity-50 bg-[#2b2b2b]" : "hover:bg-[#2b2b2b]"
            )}
        >
            {/* --- DRAG HANDLE (БУРГЕР) --- */}
            <div 
                {...attributes} 
                {...listeners} 
                className="cursor-grab active:cursor-grabbing p-1 text-gray-500 hover:text-white transition-colors"
            >
                <Menu size={18} />
            </div>

            <div className="text-gray-400">№{id}</div>
            <div className="text-gray-300">Канал ID: {channelId}</div>
            <div className="truncate pr-4 font-medium" title={message}>
                {renderHighlightedText(message, searchTerm)}
            </div>
            <div className="text-gray-300">{time}</div>
            <div className="flex items-center gap-2">
                {isPinned ? (
                    <div title="Закреплено" className="bg-blue-500/20 p-1.5 rounded-lg">
                        <Pin size={14} className="text-blue-400" />
                    </div>
                ) : null}
                {isVerified ? (
                    <div title="Верифицировано" className="bg-green-500/20 p-1.5 rounded-lg">
                        <BadgeCheck size={14} className="text-green-400" />
                    </div>
                ) : null}
                {!isPinned && !isVerified && <span className="text-gray-600">-</span>}
            </div>
            <div className="flex items-center justify-end gap-2">
                <button 
                    onClick={() => onEdit(id)}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer"
                >
                    <Edit size={14} />
                </button>
                <button 
                    onClick={() => onDelete(id)}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-red-500/20 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all cursor-pointer"
                >
                    <Trash size={14} />
                </button>
            </div>
        </div>
    );
};