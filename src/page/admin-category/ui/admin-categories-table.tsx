import { AdminCategoriesTableProps } from "../types/props";
import { AdminCategoriesRow } from "./admin-categories-row";

export const AdminCategoriesTable = ({ 
    items, 
    isLoading, 
    searchTerm,
    withActions = true,
    onEdit,
    onDelete
}: AdminCategoriesTableProps) => {

    // Та же сетка, что и в Row
    const gridClassName = withActions
        ? "grid grid-cols-[0.5fr_3fr_1fr_1fr_0.8fr] gap-4 items-center"
        : "grid grid-cols-[0.5fr_3.8fr_1fr_1fr] gap-4 items-center";

    return (
        <div className="w-full overflow-x-auto pb-4">
            <div className="min-w-[900px]">
                
                {/* Заголовки */}
                <div className={`${gridClassName} px-5 mb-4 text-sm text-gray-500 font-[14px]`}>
                    <div>Номер</div>
                    <div>Название</div>
                    <div>Иконка</div>
                    <div>Цвет</div>
                    {withActions && <div className="text-right pr-2">Действия</div>}
                </div>

                <div className="flex flex-col gap-2">
                    {isLoading ? (
                        // Скелетон загрузки
                        [...Array(6)].map((_, index) => (
                            <div 
                                key={index} 
                                className={`${gridClassName} bg-card rounded-xl px-5 py-4 animate-pulse`}
                            >
                                <div className="h-4 w-8 bg-white/5 rounded" />   {/* ID */}
                                <div className="h-4 w-32 bg-white/5 rounded" />  {/* Name */}
                                <div className="h-8 w-8 bg-white/5 rounded" />   {/* Icon box */}
                                <div className="flex gap-2 items-center">        {/* Color */}
                                    <div className="h-6 w-6 rounded-full bg-white/5" />
                                    <div className="h-4 w-12 bg-white/5 rounded" />
                                </div>
                                
                                {withActions && (
                                    <div className="flex justify-end gap-2">
                                        <div className="w-8 h-8 rounded-full bg-white/5" />
                                        <div className="w-8 h-8 rounded-full bg-white/5" />
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        items.map((item) => (
                            <AdminCategoriesRow 
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                color={item.color}
                                icon={item.icon}
                                searchTerm={searchTerm}
                                withActions={withActions}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))
                    )}
                </div>

                {!isLoading && items.length === 0 && (
                    <div className="text-center text-gray-500 py-10">
                        {searchTerm ? "Ничего не найдено" : "Список категорий пуст"}
                    </div>
                )}
            </div>
        </div>
    );
};