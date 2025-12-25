import Link from "next/link";
import { CHANNELS } from "../config/channels";

export const ChannelBadge = ({ item }: { item: typeof CHANNELS[0] }) => (
    <Link 
        href={item.href}
        className="flex items-center gap-2 p-3 rounded-[14px] bg-white border-2 border-[#F3F3F3] mx-1"
    >
        <img 
            src={item.image} 
            alt={item.title} 
            className="w-10 h-10 rounded-full object-cover shrink-0"
        />
        <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium leading-tight">{item.category}</span>
            <span className="text-sm font-bold text-gray-900 leading-tight">{item.title}</span>
        </div>
    </Link>
);