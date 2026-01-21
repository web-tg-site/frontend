"use client"

import { useState } from "react"
import { useCollections } from "@/shared/store/use-collections"
import { ModalCollection } from "./modal-collection"

export const GlobalCollectionModal = () => {
    const { 
        isModalOpen, 
        collections, 
        activeChannelId,
        activeChannelImage, // 👈 1. Достаем картинку из стора
        closeModal, 
        createCollection, 
        addChannelToCollection 
    } = useCollections()

    const [error, setError] = useState<string | null>(null)

    const handleClose = () => {
        setError(null)
        closeModal()
    }

    const handleCreate = (name: string) => {
        createCollection(name)
        setError(null)
    }

    const handleSaveToCollection = (collectionId: string) => {
        setError(null)

        if (activeChannelId === null) {
            handleClose()
            return
        }

        const targetCollection = collections.find(c => c.id === collectionId)

        if (targetCollection) {
            if (targetCollection.channelIds.includes(activeChannelId)) {
                setError(`Этот канал уже есть в подборке «${targetCollection.name}»`)
                return 
            }
        }

        // 👇 2. Берем картинку из стора. Если вдруг null — пустую строку.
        const imageToSave = activeChannelImage || ""

        // 👇 3. Передаем её в функцию
        addChannelToCollection(collectionId, activeChannelId, imageToSave)
        
        handleClose()
    }

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
            error={error}
            onClearError={handleClearError}
        />
    )
}