import { ChannelForm } from '@/features/channel-form';
import { getChannelName } from '@/features/channel-form/api/get-name';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    // 1. Ждем параметры (Next.js 15)
    const { id } = await params;

    // 2. Получаем имя с бэкенда (функция сама прокинет куки)
    const name = await getChannelName(id);

    return {
        title: `Редактирование: ${name}`
    }
}

export default async function Page({ params }: Props) {
    const { id } = await params;

    return (
        <ChannelForm type='edit' id={Number(id)} />
    )
}