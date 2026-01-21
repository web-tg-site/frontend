import { AdminSelectOption } from "@/shared/ui/admin/types/admin-select.props";

export const ROLES_OPTION: AdminSelectOption[] = [
    {
        value: 'moderator',
        label: 'Менеджер'
    },
    {
        value: 'admin',
        label: 'Суперадмин'
    }
]