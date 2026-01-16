import { AdminChannelsTableProps } from "../types/admin-channel-table.props";
import { AdminChannelsRow } from "./admin-channels-row";

export const AdminChannelsTable = ({ 
    items, 
    isLoading, 
    searchTerm,
    withActions = true,
    onEdit,   // <-- Принимаем
    onDelete  // <-- Принимаем
}: AdminChannelsTableProps) => {

    const gridClassName = withActions
        ? "grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr_0.8fr] gap-4 items-center"
        : "grid grid-cols-[0.5fr_2.8fr_1fr_1fr_1fr] gap-4 items-center";

    return (
        <div className="w-full overflow-x-auto pb-4">
            <div className="min-w-[900px]">
                
                <div className={`${gridClassName} px-5 mb-4 text-sm text-gray-500 font-[14px]`}>
                    <div>Номер</div>
                    <div>Название</div>
                    <div>Категория</div>
                    <div>Подписчики</div>
                    <div>Стоимость</div>
                    {withActions && <div className="text-right pr-2">Действия</div>}
                </div>

                <div className="flex flex-col gap-2">
                    {isLoading ? (
                        [...Array(6)].map((_, index) => (
                            <div 
                                key={index} 
                                className={`${gridClassName} bg-card rounded-xl px-5 py-4 animate-pulse`}
                            >
                                <div className="h-4 w-8 bg-white/5 rounded" />
                                <div className="h-4 w-32 bg-white/5 rounded" />
                                <div className="h-4 w-20 bg-white/5 rounded" />
                                <div className="h-4 w-16 bg-white/5 rounded" />
                                <div className="h-4 w-20 bg-white/5 rounded" />
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
                            <AdminChannelsRow 
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                category={item.category}
                                subscribers={item.subscribers}
                                price={item.price}
                                searchTerm={searchTerm}
                                withActions={withActions}
                                onEdit={onEdit}     // <-- Передаем дальше в строку
                                onDelete={onDelete} // <-- Передаем дальше в строку
                            />
                        ))
                    )}
                </div>

                {!isLoading && items.length === 0 && (
                    <div className="text-center text-gray-500 py-10">
                        {searchTerm ? "Ничего не найдено" : "Список пуст"}
                    </div>
                )}
            </div>
        </div>
    );
};