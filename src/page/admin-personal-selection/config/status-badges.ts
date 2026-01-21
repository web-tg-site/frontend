import { PersonalSelectionStatus } from "../types/perosnal-selection.types";

export const STATUS_BADGES: Record<PersonalSelectionStatus, { label: string; color: string; dot: string }> = {
    [PersonalSelectionStatus.send]: { 
        label: "Отправлено", 
        color: "bg-yellow-500/10 text-yellow-500", 
        dot: "bg-yellow-500" 
    },
    [PersonalSelectionStatus.draft]: { 
        label: "Черновик", 
        color: "bg-[#383838] text-gray-400", 
        dot: "bg-gray-500" 
    },
    [PersonalSelectionStatus.agreed]: { 
        label: "Согласовано", 
        color: "bg-green-500/10 text-green-500", 
        dot: "bg-green-500" 
    },
    [PersonalSelectionStatus.archive]: { 
        label: "Архив", 
        color: "bg-white/5 text-gray-500", 
        dot: "bg-gray-500" 
    }
};