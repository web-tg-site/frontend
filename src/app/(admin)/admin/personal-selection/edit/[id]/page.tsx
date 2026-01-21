import { SelectionForm } from '@/features/selection-form';
import { getSelectionName } from '@/features/selection-form/api/get-selection-name';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;

    // 2. Получаем имя с бэкенда (функция сама прокинет куки)
    const name = await getSelectionName(id);

    return {
        title: `Редактирование: ${name}`
    }
}

export default async function Page({ params }: Props) {
    const { id } = await params;

    return (
        <SelectionForm type='edit' id={id} />
    )
}