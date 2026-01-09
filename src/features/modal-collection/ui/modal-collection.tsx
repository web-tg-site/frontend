"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, AlertCircle } from "lucide-react"
import { Input } from "@/shared/ui"
import { cn } from "@/shared/utils"

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

import { Collection } from "@/shared/store/use-collections";

const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) setMatches(media.matches);
        const listener = () => setMatches(media.matches);
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [matches, query]);
    return matches;
};

interface ModalCollectionProps {
    isOpen: boolean
    onClose: () => void
    onCreate: (name: string) => void
    onSaveToCollection: (collectionId: string) => void
    collections: Collection[]
    error: string | null
    onClearError: () => void
}

export const ModalCollection = ({ 
    isOpen, 
    onClose, 
    onCreate, 
    onSaveToCollection,
    collections,
    error,
    onClearError
}: ModalCollectionProps) => {
    const [view, setView] = useState<'create' | 'select'>('create');
    const [name, setName] = useState("");
    const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);
    const isMobile = useMediaQuery("(max-width: 500px)");

    useEffect(() => {
        if (isOpen) {
            if (collections.length > 0) {
                setView('select');
                setSelectedCollectionId(null); 
            } else {
                setView('create');
            }
            setName("");
            onClearError();
        }
    }, [isOpen, collections.length]);

    const handleSelectCollection = (id: string) => {
        setSelectedCollectionId(id);
        onClearError();
    };

    const handleCreate = () => {
        if (name.trim()) {
            onCreate(name);
            setName(""); 
        }
    }

    const handleSave = () => {
        if (selectedCollectionId) {
            onSaveToCollection(selectedCollectionId);
        }
    }

    const desktopVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 10 },
        visible: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, y: 10 }
    };

    const mobileVariants = {
        hidden: { y: "100%" },
        visible: { y: 0 },
        exit: { y: "100%" }
    };

    const contentVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className={cn(
                    "fixed inset-0 z-[999] flex isolate",
                    "items-center justify-center max-[500px]:items-end"
                )}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
                    />

                    {/* 
                      НОВОЕ: 
                      1. Добавлен `layout-root`, чтобы Framer Motion отслеживал изменения размеров внутри.
                      2. Добавлен `layout` и `layout-transition` для плавной анимации размеров.
                    */}
                    <motion.div
                        layout
                        layout-root
                        layout-transition={{ 
                            type: "spring", // Тип анимации
                            stiffness: 200, // Жесткость пружины
                            damping: 25,    // Демпфирование (трение)
                            mass: 1         // Масса элемента
                        }}
                        variants={isMobile ? mobileVariants : desktopVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                        className={cn(
                            "relative bg-[#6155F5] flex flex-col items-center shadow-2xl z-10 overflow-hidden",
                            "w-[540px] rounded-[32px] p-8",
                            "max-[500px]:w-full max-[500px]:rounded-t-[32px] max-[500px]:rounded-b-none max-[500px]:p-6 max-[500px]:pb-8"
                        )}
                    >
                        <button 
                            onClick={onClose}
                            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-20"
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-white text-[28px] font-semibold mb-8 text-center leading-tight mt-2">
                            {view === 'create' ? "Создайте подборку" : "Добавить в подборку"}
                        </h2>

                        <AnimatePresence mode="wait">
                            {view === 'select' ? (
                                <motion.div 
                                    key="select"
                                    variants={contentVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    transition={{ duration: 0.2 }}
                                    className="w-full mb-8"
                                >
                                    <Swiper
                                        modules={[FreeMode]}
                                        slidesPerView={isMobile ? 2.1 : 2.2}
                                        spaceBetween={16}
                                        freeMode={true}
                                        className="w-full !overflow-visible"
                                    >
                                        {collections.map((col) => {
                                            const isSelected = selectedCollectionId === col.id;
                                            return (
                                                <SwiperSlide key={col.id} className="h-auto">
                                                    <button
                                                        onClick={() => handleSelectCollection(col.id)}
                                                        className={cn(
                                                            "relative w-full aspect-square rounded-3xl overflow-hidden text-left flex flex-col justify-end p-4 transition-all duration-200 border-4",
                                                            isSelected 
                                                                ? "border-white scale-[1.02] shadow-xl" 
                                                                : "border-transparent hover:border-white/30"
                                                        )}
                                                    >
                                                        <div className="absolute inset-0 bg-gray-800 z-0">
                                                            {col.image ? (
                                                                <img src={col.image} alt={col.name} className="w-full h-full object-cover opacity-80" />
                                                            ) : (
                                                                <div className="w-full h-full bg-gradient-to-br from-[#8B5CF6] to-[#6155F5] opacity-50" />
                                                            )}
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                                        </div>
                                                        
                                                        <div className="relative z-10">
                                                            <p className="text-white font-semibold text-lg leading-tight mb-1 truncate w-full">
                                                                {col.name}
                                                            </p>
                                                            <p className="text-white/60 text-sm">
                                                                Сохранено: {col.channelIds.length}
                                                            </p>
                                                        </div>

                                                        {isSelected && (
                                                            <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#6155F5]">
                                                                <Check size={14} strokeWidth={3} />
                                                            </div>
                                                        )}
                                                    </button>
                                                </SwiperSlide>
                                            )
                                        })}
                                    </Swiper>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="create"
                                    variants={contentVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    transition={{ duration: 0.2 }}
                                    className="w-full mb-8"
                                >
                                    <Input
                                        autoFocus
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Название"
                                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white focus:bg-white/20"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: "auto" }}
                                    exit={{ opacity: 0, y: 10, height: 0 }}
                                    className="w-full flex items-center justify-center gap-2 mb-4 text-[#FFCaca] bg-red-500/20 py-3 px-4 rounded-xl"
                                >
                                    <AlertCircle size={18} />
                                    <span className="text-sm font-medium">{error}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex gap-3 w-full max-[500px]:flex-col-reverse">
                            {view === 'select' ? (
                                <>
                                    <button
                                        onClick={() => {
                                            setView('create');
                                            onClearError();
                                        }}
                                        className={cn(
                                            "flex-1 h-14 rounded-full border border-white/40 text-white font-medium text-lg hover:bg-white/10 transition-colors",
                                            "max-[500px]:h-auto max-[500px]:py-4"
                                        )}
                                    >
                                        Создать новую
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={!selectedCollectionId || !!error}
                                        className={cn(
                                            "flex-1 h-14 rounded-full bg-white text-[#6155F5] font-medium text-lg hover:bg-white/90 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg",
                                            "max-[500px]:h-auto max-[500px]:py-4"
                                        )}
                                    >
                                        Сохранить
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => {
                                            if (collections.length > 0) {
                                                setView('select');
                                                onClearError();
                                            } else {
                                                onClose();
                                            }
                                        }}
                                        className={cn(
                                            "flex-1 h-14 rounded-full border border-white/40 text-white font-medium text-lg hover:bg-white/10 transition-colors",
                                            "max-[500px]:h-auto max-[500px]:py-4"
                                        )}
                                    >
                                        Отменить
                                    </button>
                                    <button
                                        onClick={handleCreate}
                                        disabled={!name.trim()}
                                        className={cn(
                                            "flex-1 h-14 rounded-full bg-white text-[#6155F5] font-medium text-lg hover:bg-white/90 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg",
                                            "max-[500px]:h-auto max-[500px]:py-4"
                                        )}
                                    >
                                        Создать
                                    </button>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}