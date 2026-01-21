'use client'

import { useState } from "react"
import { Search } from "lucide-react"

// UI
import { AdminPageTitle } from "@/shared/ui/admin/ui/admin-page-title"
import { AdminBackButton } from "@/shared/ui/admin/ui/admin-back-button"
import { AdminInput } from "@/shared/ui/admin/ui/form/admin-input"
import { AdminSelect } from "@/shared/ui/admin/ui/form/admin-select"

// Entities & Types
import { ChannelCard } from "@/entities/channel"
import { AddChannelPageProps } from "../types/add-channel-page.props"

// Configs & Hooks
import { SUBSCRIBERS } from "@/page/admin-channels/config/subscribers"
import { useAdminCategories } from "@/page/admin-channels/api/use-admin-category"

export const AddChannelPage = ({
    onBack,
    channels,
    channelLoading,
    onAdd,
    onRemove,
    selectedChannels
}: AddChannelPageProps) => {
    
    // --- STATE ---
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | number | null>(null);
    const [selectedSubscribers, setSelectedSubscribers] = useState<string | number | null>(null);

    // --- DATA ---
    const { data: categoryData, isLoading: categoryLoading } = useAdminCategories();
    const categories = categoryData || [];

    // --- LOGIC: FILTERING ---
    const filteredChannels = channels.filter(channel => {
        // 1. Поиск по имени
        const matchesSearch = channel.name.toLowerCase().includes(searchTerm.toLowerCase());

        // 2. Фильтр по категории
        let matchesCategory = true;
        if (selectedCategory) {
            const categoryObj = categories.find(cat => cat.value === selectedCategory);
            if (categoryObj) {
                matchesCategory = channel.category.name === categoryObj.label;
            }
        }

        // 3. Фильтр по подписчикам
        let matchesSubscribers = true;
        if (selectedSubscribers) {
            // Удаляем нецифровые символы и преобразуем в число
            const rawCount = String(channel.subscribers).replace(/\D/g, ''); 
            const count = Number(rawCount) || 0; 
            
            const range = selectedSubscribers as string;

            switch (range) {
                case '1k-5k': matchesSubscribers = count >= 1000 && count <= 5000; break;
                case '5k-10k': matchesSubscribers = count >= 5000 && count <= 10000; break;
                case '10k-50k': matchesSubscribers = count >= 10000 && count <= 50000; break;
                case '50k-100k': matchesSubscribers = count >= 50000 && count <= 100000; break;
                case '100k-500k': matchesSubscribers = count >= 100000 && count <= 500000; break;
                case '500k-1m': matchesSubscribers = count >= 500000 && count <= 1000000; break;
                case '1m+': matchesSubscribers = count >= 1000000; break;
                default: matchesSubscribers = true;
            }
        }

        return matchesSearch && matchesCategory && matchesSubscribers;
    });

    // --- LOGIC: TOGGLE SELECTION ---
    const handleToggle = (id: number) => {
        if (selectedChannels.includes(id)) {
            onRemove(id);
            return;
        }
        onAdd(id);
    };

    return (
        <div>
            <AdminPageTitle title="Выбор каналов" />

            <AdminBackButton onClick={() => onBack()} className="mb-6.5"><></></AdminBackButton>

            {/* --- ФИЛЬТРЫ --- */}
            <div className="grid grid-cols-4 gap-1.5 mb-7.5">
                {/* Поиск (2 колонки) */}
                <div className="col-span-2">
                    <AdminInput 
                        placeholder="Поиск" 
                        icon={<Search size={16} className="text-white"/>}
                        variant="alternative"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Категория (1 колонка) */}
                <div className="col-span-1">
                    <AdminSelect 
                        variant="alternative"
                        placeholder="Выбрать категорию"
                        options={categories}
                        value={selectedCategory}
                        onChange={(val) => setSelectedCategory(val)}
                        isLoading={categoryLoading}
                        isSearchable={true}
                    />
                </div>
                
                {/* Подписчики (1 колонка) */}
                <div className="col-span-1">
                    <AdminSelect 
                        variant="alternative"
                        placeholder="Выбрать кол-во подписчиков"
                        options={SUBSCRIBERS}
                        value={selectedSubscribers}
                        onChange={(val) => setSelectedSubscribers(val)}
                    />
                </div>
            </div>

            {/* --- СЕТКА КАНАЛОВ --- */}
            <div className="grid grid-cols-3 gap-3">
                {channelLoading ? (
                    Array.from({ length: 6 }).map((_, idx) => (
                        <ChannelCard 
                            key={idx}
                            {...({} as any)}
                            loading
                            type="admin"
                        />
                    ))
                ) : (
                    filteredChannels.length > 0 ? (
                        filteredChannels.map((c) => (
                            <ChannelCard
                                key={c.id} 
                                {...c}
                                type="admin"
                                isSelected={selectedChannels.includes(c.id)}
                                onAdminClick={(id) => handleToggle(id as number)}
                            />
                        ))
                    ) : (
                        <div className="col-span-3 text-center text-gray-500 py-10">
                            Каналы не найдены
                        </div>
                    )
                )}
            </div>
        </div>
    )
}