import { LucideIcon } from "lucide-react";
import { ElementType } from "react";

// Вынесем тип ролей, чтобы не дублировать
export type UserRole = 'admin' | 'moderator';

export interface Navigation {
    icon: LucideIcon | ElementType;
    name: string;
    href: string;
    roles?: UserRole[]; 
    additionalHrefs?: string[];
}