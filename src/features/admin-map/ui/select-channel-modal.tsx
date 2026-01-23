'use client'

import { useState } from "react";
import { X, Search } from "lucide-react";
import { useAdminChannels } from "@/page/admin-channels/api/use-admin-channels";

interface SelectChannelModalProps {
    onClose: () => void;
    onSelect: (channelId: number) => void;
    existingChannelIds: number[];
}

export const SelectChannelModal = ({ onClose, onSelect, existingChannelIds }: SelectChannelModalProps) => {
    const [search, setSearch] = useState("");

    const { data: channels, isLoading: channelLoading } = useAdminChannels();

    if(channelLoading) {
        return null;
    }

    if(!channels) {
        return null;
    }

    // Фильтруем: поиск + убираем те, что уже есть на карте
    const filteredChannels = channels.filter(c => 
        c.name.toLowerCase().includes(search.toLowerCase()) && 
        !existingChannelIds.includes(Number(c.id))
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-[#1e1e1e] w-[500px] max-w-full rounded-xl border border-white/10 shadow-2xl overflow-hidden">
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                    <h3 className="text-lg font-medium text-white">Выберите канал</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-4">
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input 
                            type="text" 
                            placeholder="Поиск..." 
                            className="w-full bg-[#2a2a2a] text-white pl-10 pr-4 py-2 rounded-lg border border-white/5 focus:outline-none focus:border-blue-500"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                        {filteredChannels.length === 0 ? (
                            <div className="text-center text-gray-500 py-4">Каналов не найдено</div>
                        ) : (
                            filteredChannels.map(channel => (
                                <div 
                                    key={channel.id}
                                    onClick={() => onSelect(Number(channel.id))}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                                >
                                    <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden shrink-0">
                                        <img src={channel.image} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="text-white font-medium">{channel.name}</div>
                                    <div className="ml-auto text-xs text-gray-500">ID: {channel.id}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};