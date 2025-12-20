export const Background = () => {
    return (
        <div className="w-full h-full top-0 left-0 -z-10 grid grid-cols-7 gap-1.5">
            {[...Array(21)].map((_, idx) => (
                <div key={idx} className="bg-secondary rounded-lg" />
            ))}
        </div>
    )
}