import { Edit, Link as LinkIcon, Check, Copy } from "lucide-react";
import { useState } from "react";
import { STATUS_BADGES } from "../config/status-badges";
import { IPersonalSelection } from "../types/perosnal-selection.types";

interface AdminSelectionRowProps extends IPersonalSelection {
    searchTerm?: string;
    onEdit?: (id: string) => void;
    onCopyLink?: (slug: string) => void;
}

export const AdminSelectionRow = ({
    id,
    title,
    total, // 👈 Берем строку total
    status,
    searchTerm = "",
    slug,
    onEdit,
    onCopyLink
}: AdminSelectionRowProps) => {
    const [copiedLink, setCopiedLink] = useState(false);
    const [copiedId, setCopiedId] = useState(false);

    const gridClassName = "grid grid-cols-[1fr_2.5fr_1fr_1.2fr_0.8fr] gap-4 items-center";
    const badge = STATUS_BADGES[status] || STATUS_BADGES.draft;

    const formatUuid = (uuid: string) => {
        if (!uuid) return "";
        return `${uuid.slice(0, 4)}...${uuid.slice(-4)}`;
    };

    const handleCopyLink = () => {
        onCopyLink?.(slug);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
    };

    const handleCopyId = () => {
        navigator.clipboard.writeText(id);
        setCopiedId(true);
        setTimeout(() => setCopiedId(false), 2000);
    };

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
            {/* ID */}
            <div 
                className="text-gray-500 text-[14px] font-mono cursor-pointer hover:text-white transition-colors flex items-center gap-1 group"
                title={id}
                onClick={handleCopyId}
            >
                {copiedId ? <span className="text-green-500">Скопировано</span> : formatUuid(id)}
                <Copy size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            {/* Название */}
            <div className="truncate pr-4 text-[18px]" title={title}>
                {renderHighlightedName(title, searchTerm)}
            </div>
            
            {/* Итоговая цена (Выводим строку как есть) */}
            <div className="text-[18px] font-medium">
                {total}
            </div>

            {/* Статус */}
            <div>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${badge.color}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                    {badge.label}
                </div>
            </div>
            
            {/* Действия */}
            <div className="flex items-center justify-end gap-2">
                <button 
                    onClick={handleCopyLink}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer"
                    title="Копировать ссылку"
                >
                    {copiedLink ? <Check size={16} className="text-green-500" /> : <LinkIcon size={16} />}
                </button>

                <button 
                    onClick={() => onEdit?.(id)}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer"
                    title="Редактировать"
                >
                    <Edit size={16} />
                </button>
            </div>
        </div>
    );
};