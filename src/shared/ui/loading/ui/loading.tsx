import { Loader2 } from "lucide-react"
import { Title } from "../../text"

export const Loading = ({
    title
}: {
    title: string
}) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full gap-4 pt-[106px] text-white">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <Title variant="h1" className="text-lg font-medium text-white/70">{title}</Title>
        </div>
    )
}