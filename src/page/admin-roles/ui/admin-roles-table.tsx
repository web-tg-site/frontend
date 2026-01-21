import { AdminRolesTableProps } from "../types/admin-roles";
import { AdminRolesRow } from "./admin-roles-row";

export const AdminRolesTable = ({ 
    items, 
    isLoading, 
    onDelete,
    searchTerm,
    onRoleChange,
}: AdminRolesTableProps) => {

    const gridClassName = "grid grid-cols-[0.5fr_3fr_1.5fr_0.5fr] gap-4 items-center";

    return (
        <div className="w-full overflow-x-auto pb-4">
            <div className="min-w-[700px]">
                <div className={`${gridClassName} px-5 mb-4 text-sm text-gray-500 font-[14px]`}>
                    <div>Номер</div>
                    <div>Имя участника</div>
                    <div>Роль</div>
                    <div className="text-right pr-2">Действия</div>
                </div>

                <div className="flex flex-col gap-2">
                    {isLoading ? (
                        [...Array(5)].map((_, index) => (
                            <div key={index} className={`${gridClassName} bg-card rounded-xl px-5 py-4 animate-pulse`}>
                                <div className="h-4 w-8 bg-white/5 rounded" />
                                <div className="h-4 w-32 bg-white/5 rounded" />
                                <div className="h-10 w-32 bg-white/5 rounded-lg" />
                                <div className="flex justify-end"><div className="w-8 h-8 rounded-full bg-white/5" /></div>
                            </div>
                        ))
                    ) : (
                        items.map((item) => (
                            <AdminRolesRow 
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                role={item.role}
                                searchTerm={searchTerm}
                                onDelete={onDelete}
                                onRoleChange={onRoleChange}
                            />
                        ))
                    )}
                </div>

                {!isLoading && items.length === 0 && (
                    <div className="text-center text-gray-500 py-10">
                        {searchTerm ? "Ничего не найдено" : "Список участников пуст"}
                    </div>
                )}
            </div>
        </div>
    );
};