import { create } from 'zustand'

interface CollectionModalStore {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

export const useCollectionModal = create<CollectionModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))