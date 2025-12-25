import { Numbers, Text } from "@/shared/ui/text";
import { TAGS } from "../../config/tags";
import { WeCard } from "../we-card";

export const Niches = () => (
    <div className="col-span-12 md:col-span-7">
        <WeCard className="relative overflow-hidden flex flex-col justify-end min-h-[340px]">
            <div className="absolute inset-0 w-full h-full">
                {TAGS.map((tag, idx) => (
                    <div
                        key={idx}
                        className={`absolute flex items-center gap-2.5 bg-white px-4 py-2 rounded-full shadow-md border border-gray-100 whitespace-nowrap animate-float ${tag.rotate} ${tag.scale}`}
                        style={{
                            top: tag.top, left: tag.left, zIndex: tag.z,
                            animationDelay: `${idx * 0.5}s`,
                            transform: 'translate(-50%, -50%)' 
                        }}
                    >
                        <div className={`p-1.5 rounded-full ${tag.color}`}>
                            <tag.icon size={14} className="text-white" />
                        </div>
                        <span className="text-sm font-bold text-gray-800">{tag.text}</span>
                    </div>
                ))}
            </div>
            <div className="pb-7.5 px-8 relative z-40 pointer-events-none">
                <Numbers className="text-black">15+</Numbers>
                <Text variant="3" className="text-black/60">Ниш и индустрий</Text>
            </div>
        </WeCard>
    </div>
)