import { AdminHeroTableProps } from "../types/admin-hero";
import { AdminHeroRow } from "./admin-hero-row";

// DND Imports
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

export const AdminHeroTable = ({ 
    items, 
    isLoading, 
    searchTerm,
    onDelete,
    onEdit,
    onReorder
}: AdminHeroTableProps) => {

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        // Если перетащили на другую позицию
        if (over && active.id !== over.id) {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);
            
            // Вычисляем новый порядок
            const newItems = arrayMove(items, oldIndex, newIndex);
            
            // Вызываем функцию родителя (если она передана)
            if (onReorder) {
                onReorder(newItems);
            }
        }
    };

    // Сетка с местом под бургер (auto в начале)
    const gridClassName = "grid grid-cols-[auto_0.5fr_1fr_3fr_1fr_1fr_0.5fr] gap-4 items-center";

    return (
        <div className="w-full">
            <div className="min-w-[900px]">
                
                {/* Заголовок таблицы */}
                <div className={`${gridClassName} px-5 mb-4 text-gray-500 text-[14px]`}>
                    <div className="w-[18px]"></div> {/* Плейсхолдер над бургером */}
                    <div>Номер</div>
                    <div>ID Канала</div>
                    <div>Сообщение</div>
                    <div>Время</div>
                    <div>Статус</div>
                    <div className="text-right pr-2">Действия</div>
                </div>

                <div className="flex flex-col gap-2">
                    {isLoading ? (
                        [...Array(4)].map((_, index) => (
                            <div key={index} className={`${gridClassName} bg-card rounded-xl px-5 py-4 animate-pulse h-[60px]`}>
                                <div className="h-4 w-4 bg-white/5 rounded" />
                                <div className="h-3 w-8 bg-white/5 rounded" />
                                <div className="h-3 w-20 bg-white/5 rounded" />
                                <div className="h-3 w-32 bg-white/5 rounded" />
                                <div className="h-3 w-16 bg-white/5 rounded" />
                                <div className="flex gap-2">
                                    <div className="w-6 h-6 rounded bg-white/5" />
                                    <div className="w-6 h-6 rounded bg-white/5" />
                                </div>
                                <div className="flex justify-end gap-2">
                                    <div className="w-8 h-8 rounded-full bg-white/5" />
                                    <div className="w-8 h-8 rounded-full bg-white/5" />
                                </div>
                            </div>
                        ))
                    ) : (
                        <DndContext 
                            sensors={sensors} 
                            collisionDetection={closestCenter} 
                            onDragEnd={handleDragEnd}
                            modifiers={[restrictToVerticalAxis]} // Запрет движения влево-вправо
                        >
                            <SortableContext 
                                items={items.map(i => i.id)} 
                                strategy={verticalListSortingStrategy}
                                disabled={!!searchTerm} // Отключаем драг при поиске
                            >
                                {items.map((item) => (
                                    <AdminHeroRow 
                                        key={item.id}
                                        {...item}
                                        searchTerm={searchTerm}
                                        onDelete={onDelete}
                                        onEdit={onEdit}
                                    />
                                ))}
                            </SortableContext>
                        </DndContext>
                    )}
                </div>

                {!isLoading && items.length === 0 && (
                    <div className="text-center text-gray-500 py-10 text-[14px]">
                        {searchTerm ? "Ничего не найдено" : "Список пуст"}
                    </div>
                )}
            </div>
        </div>
    );
};