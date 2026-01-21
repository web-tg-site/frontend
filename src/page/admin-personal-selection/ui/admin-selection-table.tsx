import { AdminSelectionTableProps } from "../types/perosnal-selection.types";
import { AdminSelectionRow } from "./admin-selection-row";

export const AdminSelectionTable = ({ 
    items, 
    isLoading, 
    searchTerm,
    onEdit,
    onCopyLink
}: AdminSelectionTableProps) => {

    // Сетка должна совпадать с Row
    const gridClassName = "grid grid-cols-[1fr_2.5fr_1fr_1.2fr_0.8fr] gap-4 items-center";

    return (
        <div className="w-full overflow-x-auto pb-4">
            <div className="min-w-[900px]">
                
                <div className={`${gridClassName} px-5 mb-4 text-sm text-gray-500 font-[14px]`}>
                    <div>ID</div>
                    <div>Название компании</div>
                    <div>Итоговая цена</div>
                    <div>Статус</div>
                    <div className="text-right pr-2">Действия</div>
                </div>

                <div className="flex flex-col gap-2">
                    {isLoading ? (
                        [...Array(6)].map((_, index) => (
                            <div 
                                key={index} 
                                className={`${gridClassName} bg-card rounded-xl px-5 py-4 animate-pulse`}
                            >
                                <div className="h-4 w-20 bg-white/5 rounded" /> {/* ID шире */}
                                <div className="h-4 w-32 bg-white/5 rounded" />
                                <div className="h-4 w-20 bg-white/5 rounded" />
                                <div className="h-8 w-28 bg-white/5 rounded-full" />
                                <div className="flex justify-end gap-2">
                                    <div className="w-8 h-8 rounded-full bg-white/5" />
                                    <div className="w-8 h-8 rounded-full bg-white/5" />
                                </div>
                            </div>
                        ))
                    ) : (
                        items.map((item) => (
                            <AdminSelectionRow 
                                key={item.id}
                                {...item}
                                searchTerm={searchTerm}
                                onEdit={onEdit}
                                onCopyLink={onCopyLink}
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