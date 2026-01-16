export interface ProfileCardProps {
    name: string;
    type: 'admin' | 'moderator',
    loading: boolean,
    className?: string
}