"use client"

import { useState } from "react"
import { useCollections } from "@/shared/store/use-collections"
import { CHANNEL_MOCK } from "@/page/catalog-page/config/channel-mock"
import { ModalCollection } from "./modal-collection"

export const GlobalCollectionModal = () => {
    const { 
        isModalOpen, 
        collections, 
        activeChannelId,
        closeModal, 
        createCollection, 
        addChannelToCollection 
    } = useCollections()

    // Локальное состояние ошибки
    const [error, setError] = useState<string | null>(null)

    // Сбрасываем ошибку при закрытии
    const handleClose = () => {
        setError(null)
        closeModal()
    }

    const handleCreate = (name: string) => {
        createCollection(name)
        setError(null)
    }

    const handleSaveToCollection = (collectionId: string) => {
        // Сбрасываем ошибку перед новой попыткой
        setError(null)

        if (activeChannelId === null) {
            handleClose()
            return
        }

        const targetCollection = collections.find(c => c.id === collectionId)

        if (targetCollection) {
            // 1. ПРОВЕРКА НА ДУБЛИКАТ
            if (targetCollection.channelIds.includes(activeChannelId)) {
                setError(`Этот канал уже есть в подборке «${targetCollection.name}»`)
                return // Не закрываем модалку, показываем ошибку
            }
        }

        // 2. Если всё ок — сохраняем
        const channel = CHANNEL_MOCK.find(c => c.id === activeChannelId)
        const channelImage = channel?.image || ""

        addChannelToCollection(collectionId, activeChannelId, channelImage)
        handleClose()
    }

    // Хелпер, чтобы сбрасывать ошибку, когда пользователь меняет выбор
    const handleClearError = () => {
        if (error) setError(null)
    }

    return (
        <ModalCollection 
            isOpen={isModalOpen}
            onClose={handleClose}
            onCreate={handleCreate}
            onSaveToCollection={handleSaveToCollection}
            collections={collections}
            // Передаем ошибку и функцию её очистки
            error={error}
            onClearError={handleClearError}
        />
    )
}