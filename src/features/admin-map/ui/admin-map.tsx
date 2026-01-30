'use client'

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Plus, Save, Loader2, X } from "lucide-react"; 

import { AdminPageTitle } from "@/shared/ui/admin/ui/admin-page-title";
import { AdminButton } from "@/shared/ui/admin/ui/admin-button";
import { MapResponse } from "@/shared/types"; 
import { useConfirm } from "@/shared/lib/confirm-dialog";

import { useAdminMapMutations, useGetAdminMap } from "../api/use-get-admin-map";
import { SelectChannelModal } from "./select-channel-modal";
import { UpdateMapPinPayload } from "../types";

export const AdminMap = () => {
    const { confirm } = useConfirm();
    const { data: serverMap, isLoading: mapLoading } = useGetAdminMap();
    const { updatePositions, deletePin, addPin } = useAdminMapMutations();

    const [pins, setPins] = useState<MapResponse[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    
    // Drag & Drop
    const [draggingId, setDraggingId] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Загрузка данных
    useEffect(() => {
        if (serverMap) {
            setPins(serverMap);
        }
    }, [serverMap]);

    // --- Drag Logic ---
    const handleMouseDown = (e: React.MouseEvent, id: number) => {
        if ((e.target as HTMLElement).closest('button')) return;
        
        e.stopPropagation();
        e.preventDefault();
        setDraggingId(id);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (draggingId === null || !containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        let x = e.clientX - containerRect.left;
        let y = e.clientY - containerRect.top;

        // Clamp
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

    // --- Actions ---

    const handleSave = () => {
        const updates: UpdateMapPinPayload[] = pins.map(p => ({
            id: p.id,
            channelId: p.channelId,
            left: Number(p.left.toFixed(4)),
            top: Number(p.top.toFixed(4))
        }));
        updatePositions.mutate(updates);
    };

     const handleDelete = (id: number) => {
        const pinToDelete = pins.find(p => p.id === id);
        const channelName = pinToDelete?.channel?.name || "этот канал";

        confirm({
            title: "Убрать канал с карты?",
            description: `“${channelName}”`,
            confirmText: "Удалить",
            cancelText: "Отменить",
            onConfirm: () => {
                deletePin.mutate(id);
                setPins(prev => prev.filter(p => p.id !== id));
            }
        });
    };

    const handleAddChannel = async (channel: any) => {
        setIsAddModalOpen(false);

        try {
            const newMapItem = await addPin.mutateAsync({
                channelId: channel.id,
                left: 50,
                top: 50
            });

            const newPinLocal: MapResponse = {
                ...newMapItem,
                channel: newMapItem.channel || channel 
            };

            setPins(prev => [...prev, newPinLocal]);
        } catch (error) {
            console.error("Ошибка при добавлении", error);
        }
    };

    if (mapLoading && pins.length === 0) return <div className="p-10 text-white">Загрузка карты...</div>;

    return (
        <div className="space-y-6 w-full">
            <div className="flex items-center justify-between">
                <AdminPageTitle title="Редактирование карты" className="mb-0!" />
                
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
                        className={`
                            text-white min-w-[150px] transition-all duration-300 border-none
                            ${updatePositions.isPending 
                                ? "bg-blue-500/70 cursor-wait shadow-inner" 
                                : "bg-blue-600 hover:bg-blue-700 shadow-md"
                            }
                        `}
                    >
                        {updatePositions.isPending ? (
                            <>
                                <Loader2 size={18} className="animate-spin mr-2" />
                                <span className="animate-pulse">Сохраняем...</span>
                            </>
                        ) : (
                            <>
                                <Save size={18} className="mr-2" />
                                <span>Сохранить</span>
                            </>
                        )}
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
                                // --- FIX POSITION ---
                                // translate(-50%) центрирует по горизонтали (убирает сдвиг вправо/влево)
                                // translate(-95%) поднимает пин так, что курсор оказывается на его острие
                                transform: 'translate(-50%, -95%)', 
                                cursor: draggingId === pin.id ? 'grabbing' : 'grab'
                            }}
                        >
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(pin.id);
                                }}
                                className="absolute -top-3 -right-3 z-50 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md transform scale-75 group-hover:scale-100"
                                title="Удалить"
                            >
                                <X size={14} />
                            </button>

                            <div className={`
                                relative w-12 h-12 sm:w-16 sm:h-16 
                                rotate-45 rounded-full rounded-br-none 
                                border-[3px] shadow-xl overflow-hidden
                                transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                                bg-[#3B82F6]
                                ${draggingId === pin.id 
                                    ? 'scale-110 border-white z-40 shadow-2xl' 
                                    : 'scale-75 hover:scale-100 border-white/20 hover:border-white z-20'}
                            `}>
                                <div className="w-full h-full -rotate-45 overflow-hidden rounded-full bg-white shadow-inner">
                                    <img 
                                        src={pin.channel?.image || '/placeholder.png'} 
                                        alt={pin.channel?.name || 'CH'} 
                                        className="w-full h-full object-cover pointer-events-none" 
                                    />
                                </div>
                            </div>
                            
                            <div className={`
                                absolute top-[120%] left-1/2 -translate-x-1/2 
                                bg-black/80 text-white text-[10px] sm:text-xs font-medium px-2 py-1 rounded-md 
                                whitespace-nowrap shadow-lg backdrop-blur-sm pointer-events-none
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