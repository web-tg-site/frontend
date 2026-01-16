import Link from "next/link";
import { cn } from "@/shared/utils";
import { NavigationProps } from "../types/navigation.props";

export const Navigation = ({
    icon: Icon,
    name,
    href,
    active
}: NavigationProps) => {
    return (
        <Link 
            href={href}
            className={cn(
                "group rounded-full p-1 transition duration-300 ease-in-out w-full flex items-center gap-2.5", 
                active ? 'bg-white' : 'bg-white/8 hover:bg-white'
            )}
        >
            <div className={cn(
                "w-9.5 h-9.5 rounded-full flex items-center justify-center transition-colors duration-300", 
                active ? 'bg-[#151515]' : 'bg-white group-hover:bg-[#151515]'
            )}>
                <Icon 
                    className={cn(
                        "w-5 h-5 transition-colors duration-300",
                        active ? 'text-white' : 'text-[#151515] group-hover:text-white'
                    )} 
                />
            </div>

            <span
                className={cn(
                    "leading-none transition-colors duration-300 font-medium",
                    active ? "text-[#151515]" : 'text-white group-hover:text-[#151515]'
                )}
            >
                {name}
            </span>
        </Link>
    )
}