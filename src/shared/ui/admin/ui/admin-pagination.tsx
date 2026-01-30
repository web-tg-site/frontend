'use client'

import { cn } from '@/shared/utils'

const DEFAULT_PAGE_SIZE = 9

export type AdminPaginationProps = {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    className?: string
}

/**
 * Формирует массив номеров страниц: 1 2 3 ... 8 9 10 или 1 ... 4 5 6 ... 10
 */
function getPageNumbers(currentPage: number, totalPages: number): (number | 'ellipsis')[] {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    const pages: (number | 'ellipsis')[] = []
    const left = Math.max(2, currentPage - 1)
    const right = Math.min(totalPages - 1, currentPage + 1)

    pages.push(1)
    if (left > 2) pages.push('ellipsis')
    for (let i = left; i <= right; i++) {
        if (i !== 1 && i !== totalPages) pages.push(i)
    }
    if (right < totalPages - 1) pages.push('ellipsis')
    if (totalPages > 1) pages.push(totalPages)
    return pages
}

export const AdminPagination = ({
    currentPage,
    totalPages,
    onPageChange,
    className
}: AdminPaginationProps) => {
    if (totalPages <= 1) return null

    const pageNumbers = getPageNumbers(currentPage, totalPages)

    return (
        <div className={cn('flex items-center justify-center gap-1.5 pt-6 pb-2', className)}>
            {pageNumbers.map((page, index) =>
                page === 'ellipsis' ? (
                    <span
                        key={`ellipsis-${index}`}
                        className="px-2 text-gray-500 select-none"
                    >
                        ...
                    </span>
                ) : (
                    <button
                        key={page}
                        type="button"
                        onClick={() => onPageChange(page)}
                        className={cn(
                            'min-w-[36px] h-9 px-2 rounded-lg text-sm font-medium transition-colors',
                            'border border-white/10',
                            currentPage === page
                                ? 'bg-white text-black'
                                : 'bg-card text-white hover:bg-white/10'
                        )}
                    >
                        {page}
                    </button>
                )
            )}
        </div>
    )
}

export { DEFAULT_PAGE_SIZE as ADMIN_PAGINATION_PAGE_SIZE }
