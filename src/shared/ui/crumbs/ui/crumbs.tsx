import Link from "next/link"
import { CrumbsProps } from "../types/crumbs.props"

const ChevronRight = () => (
    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

export const Crumbs = ({ items, className = "" }: CrumbsProps) => {
    return (
        <nav className={`flex items-center flex-wrap gap-y-2 ${className}`}>
            {items.map((item, index) => {
                const isLast = index === items.length - 1

                // Последний элемент — просто текст (текущая страница)
                if (isLast) {
                    return (
                        <span 
                            key={index} 
                            className="text-[#9D9D9D] text-[14px] leading-none cursor-default"
                        >
                            {item.label}
                        </span>
                    )
                }

                // Ссылки (промежуточные шаги)
                // Вкладываем иконку внутрь Link, чтобы при ховере они белели вместе (как на скрине)
                return (
                    <Link
                        key={index}
                        href={item.href || "#"}
                        className="flex items-center gap-2 text-[#9D9D9D] hover:text-white transition-colors duration-200 text-[14px] leading-none mr-2"
                    >
                        {item.label}
                        <ChevronRight />
                    </Link>
                )
            })}
        </nav>
    )
}