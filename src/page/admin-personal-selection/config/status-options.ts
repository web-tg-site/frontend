import { AdminSelectOption } from "@/shared/ui/admin/types/admin-select.props";

export const STATUS_OPTIONS: AdminSelectOption[] = [
    {
        value: 'send',
        label: 'Отправлено'
    },
    {
        value: 'draft',
        label: 'Черновик'
    },
    {
        value: 'agreed',
        label: 'Согласовано'
    },
    {
        value: 'archive',
        label: 'Архив'
    }
]