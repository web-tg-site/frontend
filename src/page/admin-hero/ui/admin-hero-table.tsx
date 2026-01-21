import { AdminHeroTableProps } from "../types/admin-hero";
import { AdminHeroRow } from "./admin-hero-row";

export const AdminHeroTable = ({ 
    items, 
    isLoading, 
    searchTerm,
    onDelete,
    onEdit
}: AdminHeroTableProps) => {

    const gridClassName = "grid grid-cols-[0.5fr_1fr_3fr_1fr_1fr_0.5fr] gap-4 items-center";

    return (
        <div className="w-full overflow-x-auto pb-4">
            <div className="min-w-[900px]">
                
                <div className={`${gridClassName} px-5 mb-4 text-gray-500 text-[14px]`}>
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
                        items.map((item) => (
                            <AdminHeroRow 
                                key={item.id}
                                {...item}
                                searchTerm={searchTerm}
                                onDelete={onDelete}
                                onEdit={onEdit}
                            />
                        ))
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