import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface Collection {
    id: string
    name: string
    createdAt: number
    channelIds: number[]
    image: string | null
}

interface CollectionsStore {
    collections: Collection[]
    
    // Состояние модалки
    isModalOpen: boolean
    activeChannelId: number | null
    activeChannelImage: string | null // 👈 Добавили хранение картинки

    openModal: (channelId: number, image?: string) => void 
    closeModal: () => void
    
    createCollection: (name: string) => void
    deleteCollection: (id: string) => void
    
    addChannelToCollection: (collectionId: string, channelId: number, channelImage: string) => void
    removeChannelFromCollection: (collectionId: string, channelId: number) => void
}

export const useCollections = create<CollectionsStore>()(
    persist(
        (set, get) => ({
            collections: [],
            isModalOpen: false,
            activeChannelId: null,
            activeChannelImage: null,

            // 👇 1. При открытии запоминаем ID и Image
            openModal: (channelId, image = "") => set({ 
                isModalOpen: true, 
                activeChannelId: channelId,
                activeChannelImage: image 
            }),
            
            // 👇 При закрытии очищаем всё
            closeModal: () => set({ 
                isModalOpen: false, 
                activeChannelId: null,
                activeChannelImage: null
            }),

            createCollection: (name) => {
                const newCollection: Collection = {
                    id: crypto.randomUUID(),
                    name,
                    createdAt: Date.now(),
                    channelIds: [],
                    image: null
                }
                set((state) => ({
                    collections: [newCollection, ...state.collections]
                }))
            },

            deleteCollection: (id) => {
                set((state) => ({
                    collections: state.collections.filter((c) => c.id !== id)
                }))
            },

            addChannelToCollection: (collectionId, channelId, channelImage) => {
                set((state) => ({
                    collections: state.collections.map((col) => {
                        if (col.id === collectionId) {
                            // Если канал уже есть — возвращаем как есть
                            if (col.channelIds.includes(channelId)) return col

                            return { 
                                ...col, 
                                channelIds: [...col.channelIds, channelId],
                                // 👇 2. Если обложки нет — ставим channelImage. Если есть — оставляем старую.
                                image: col.image ? col.image : channelImage
                            }
                        }
                        return col
                    })
                }))
            },

            removeChannelFromCollection: (collectionId, channelId) => {
                set((state) => ({
                    collections: state.collections.map((col) => {
                        if (col.id === collectionId) {
                            const newIds = col.channelIds.filter(id => id !== channelId)
                            // Опционально: можно сбрасывать обложку, если каналов стало 0
                            // const newImage = newIds.length === 0 ? null : col.image;
                            return { ...col, channelIds: newIds }
                        }
                        return col
                    })
                }))
            }
        }),
        {
            name: 'sway-user-collections',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ collections: state.collections }),
        }
    )
)