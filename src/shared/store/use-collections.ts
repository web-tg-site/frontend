import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface Collection {
    id: string
    name: string
    createdAt: number
    channelIds: number[]
    image: string | null // 👇 1. Добавили поле для обложки
}

interface CollectionsStore {
    collections: Collection[]
    isModalOpen: boolean
    activeChannelId: number | null

    openModal: (channelId: number) => void 
    closeModal: () => void
    
    createCollection: (name: string) => void
    deleteCollection: (id: string) => void
    
    // 👇 2. Обновили сигнатуру метода: теперь ждем image
    addChannelToCollection: (collectionId: string, channelId: number, channelImage: string) => void
    removeChannelFromCollection: (collectionId: string, channelId: number) => void
}

export const useCollections = create<CollectionsStore>()(
    persist(
        (set, get) => ({
            collections: [],
            isModalOpen: false,
            activeChannelId: null,

            openModal: (channelId) => set({ isModalOpen: true, activeChannelId: channelId }),
            closeModal: () => set({ isModalOpen: false, activeChannelId: null }),

            createCollection: (name) => {
                const newCollection: Collection = {
                    id: crypto.randomUUID(),
                    name,
                    createdAt: Date.now(),
                    channelIds: [],
                    image: null // Изначально обложки нет
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

            // 👇 3. Логика сохранения обложки
            addChannelToCollection: (collectionId, channelId, channelImage) => {
                set((state) => ({
                    collections: state.collections.map((col) => {
                        if (col.id === collectionId) {
                            // Проверка на дубликаты ID
                            if (col.channelIds.includes(channelId)) return col

                            return { 
                                ...col, 
                                channelIds: [...col.channelIds, channelId],
                                // ЕСЛИ картинки нет — ставим текущую.
                                // ЕСЛИ картинка есть — оставляем старую (ведь это обложка ПЕРВОГО канала).
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
                            // Опционально: Если удалили все каналы, можно сбросить обложку
                            // image: newIds.length === 0 ? null : col.image 
                            return { 
                                ...col, 
                                channelIds: newIds
                            }
                        }
                        return col
                    })
                }))
            }
        }),
        {
            name: 'sway-user-collections',
            storage: createJSONStorage(() => localStorage),
        }
    )
)