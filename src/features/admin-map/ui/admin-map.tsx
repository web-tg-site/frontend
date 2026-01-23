'use client'

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { AdminPageTitle } from "@/shared/ui/admin/ui/admin-page-title";
import { MapResponse } from "@/shared/types";
import { Trash2, Plus, Save, Loader2 } from "lucide-react"; 
import { useAdminMapMutations, useGetAdminMap } from "../api/use-get-admin-map";
import { AdminButton } from "@/shared/ui/admin/ui/admin-button";
import { SelectChannelModal } from "./select-channel-modal";
import { UpdateMapPinPayload } from "../types";

export const AdminMap = () => {
    // Получаем массив
    const { data: serverMap, isLoading: mapLoading } = useGetAdminMap();
    const { updatePositions, deletePin, addPin } = useAdminMapMutations();

    const [pins, setPins] = useState<MapResponse[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    
    // Drag & Drop
    const [draggingId, setDraggingId] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Синхронизация
    useEffect(() => {
        if (serverMap) {
            setPins(serverMap);
        }
    }, [serverMap]);

    // --- LOGIC ---
    const handleMouseDown = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        e.preventDefault();
        setDraggingId(id);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (draggingId === null || !containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        
        let x = e.clientX - containerRect.left;
        let y = e.clientY - containerRect.top;

        x = Math.max(0, Math.min(x, containerRect.width));
        y = Math.max(0, Math.min(y, containerRect.height));

        const leftPercent = (x / containerRect.width) * 100;
        const topPercent = (y / containerRect.height) * 100;

        setPins((prev) => prev.map(pin => 
            pin.id === draggingId 
                ? { ...pin, left: leftPercent, top: topPercent } 
                : pin
        ));
    };

    const handleMouseUp = () => {
        setDraggingId(null);
    };

    useEffect(() => {
        if (draggingId !== null) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [draggingId]);

    // --- ACTIONS ---

    const handleSave = () => {
        // Подготавливаем данные. Id здесь НУЖЕН для формирования массива,
        // но useAdminMapMutations его вырежет перед отправкой в body.
        const updates: UpdateMapPinPayload[] = pins.map(p => ({
            id: p.id,
            channelId: p.channelId, 
            left: Number(p.left.toFixed(4)),
            top: Number(p.top.toFixed(4))
        }));
        
        updatePositions.mutate(updates);
    };

    const handleDelete = (id: number) => {
        if(confirm("Удалить канал с карты?")) {
            deletePin.mutate(id);
            // Оптимистичное удаление
            setPins(prev => prev.filter(p => p.id !== id));
        }
    };

    const handleAddChannel = (channelId: number) => {
        addPin.mutate({
            channelId,
            left: 50,
            top: 50
        });
        setIsAddModalOpen(false);
    };

    if (mapLoading) return <div className="p-10 text-white">Загрузка карты...</div>;

    return (
        <div className="space-y-6 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <AdminPageTitle title="Редактирование карты" />
                
                <div className="flex gap-3">
                    <AdminButton 
                        onClick={() => setIsAddModalOpen(true)} 
                        className="bg-white text-black hover:bg-gray-200"
                    >
                        <Plus size={18} className="mr-2" />
                        Добавить канал
                    </AdminButton>
                    
                    <AdminButton 
                        onClick={handleSave} 
                        disabled={updatePositions.isPending}
                        className="bg-blue-600 hover:bg-blue-700 text-white min-w-[140px]"
                    >
                        {updatePositions.isPending ? (
                            <Loader2 size={18} className="animate-spin mr-2" />
                        ) : (
                            <Save size={18} className="mr-2" />
                        )}
                        {updatePositions.isPending ? 'Сохранение...' : 'Сохранить'}
                    </AdminButton>
                </div>
            </div>

            <div className="relative w-full bg-[#1A1A1A] rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
                <div 
                    ref={containerRef}
                    className="relative w-full select-none"
                >
                    <Image
                        src="/map.png"
                        alt="Region Map"
                        width={1200} 
                        height={675}
                        priority
                        className="w-full h-auto block pointer-events-none opacity-50"
                        draggable={false}
                    />

                    {pins.map((pin) => (
                        <div
                            key={pin.id}
                            onMouseDown={(e) => handleMouseDown(e, pin.id)}
                            className="absolute z-20 group"
                            style={{
                                top: `${pin.top}%`,
                                left: `${pin.left}%`,
                                transform: 'translate(-50%, -50%)', // Центр пина = координаты
                                cursor: draggingId === pin.id ? 'grabbing' : 'grab'
                            }}
                        >
                            <div className={`
                                relative w-12 h-12 rounded-full overflow-hidden 
                                border-2 transition-all duration-200 ease-out
                                ${draggingId === pin.id 
                                    ? 'border-blue-500 scale-125 shadow-[0_0_20px_rgba(59,130,246,0.5)] z-50' 
                                    : 'border-white/80 hover:scale-110 hover:border-white shadow-lg z-20'}
                            `}>
                                <img 
                                    src={pin.channel?.image || '/placeholder.png'} 
                                    alt={pin.channel?.name || 'Chan'} 
                                    className="w-full h-full object-cover pointer-events-none bg-gray-800" 
                                />

                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(pin.id);
                                        }}
                                        className="text-red-500 hover:text-red-400 p-1 hover:bg-white/10 rounded-full transition-colors"
                                        title="Удалить"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                            
                            <div className={`
                                absolute top-full mt-2 left-1/2 -translate-x-1/2 
                                bg-[#222] text-white text-xs font-medium px-3 py-1.5 rounded-md 
                                whitespace-nowrap shadow-xl border border-white/10 pointer-events-none
                                transition-all duration-200
                                ${draggingId === pin.id ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}
                            `}>
                                {pin.channel?.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isAddModalOpen && (
                <SelectChannelModal 
                    onClose={() => setIsAddModalOpen(false)}
                    onSelect={handleAddChannel}
                    existingChannelIds={pins.map(p => p.channelId)}
                />
            )}
        </div>
    )
}