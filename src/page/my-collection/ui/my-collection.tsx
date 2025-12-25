"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation" // 👈 1. Импортируем функцию
import { Headline } from "@/shared/ui"
import { useCollections } from "@/shared/store/use-collections"

export const MyCollection = () => {
    const collections = useCollections((state) => state.collections)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    // Если еще не смонтировались — ничего не рендерим (ждем клиента)
    if (!isMounted) return null

    // 👇 2. Логика проверки:
    // Если мы уже на клиенте (isMounted) и массив пуст — кидаем 404
    if (collections.length === 0) {
        notFound() // Это прервет рендер и покажет closest not-found.tsx
    }

    return (
        <section className="mt-[106px] mb-[180px] px-[15px]">
            <Headline className="mb-12">
                Мои подборки
            </Headline>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
                {collections.map((collection) => (
                    <Link 
                        key={collection.id} 
                        href={`/my-collections/${collection.id}`}
                        className="group cursor-pointer block"
                    >
                        <div className="relative aspect-square h-[322px] overflow-hidden rounded-[20px] bg-[#1E1E1E]">
                            {collection.image ? (
                                <Image 
                                    src={collection.image} 
                                    alt={collection.name}
                                    fill
                                    unoptimized
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-[#2A2A2A]">
                                    <span className="text-4xl">📁</span>
                                </div>
                            )}
                        </div>

                        <div className="mt-5">
                            <h3 className="text-[36px] leading-[110%] font-medium text-white truncate">
                                {collection.name}
                            </h3>
                            <p className="mt-2.5 text-[20px] text-white/70">
                                Сохранено: {collection.channelIds.length}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}