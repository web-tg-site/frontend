export const TopCard = ({
    title,
    desc
}: {
    title: string,
    desc: string
}) => {
    return (
        <div className="border border-white/10 bg-[#F9F9F9]/20 h-[121px] min-w-[150px] rounded-[28px] px-3.5 flex flex-col justify-center items-center text-center">
            <p className="text-white text-[28px] leading-none">
                {title}
            </p>

            <p className="text-white/60 text-[20px] leading-none">
                {desc}
            </p>
        </div>
    )
}