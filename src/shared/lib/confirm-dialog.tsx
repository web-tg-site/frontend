"use client"

import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { isAxiosError } from "axios"; // 👈 Если axios установлен, лучше импортировать

interface ConfirmOptions {
    title: ReactNode;
    description?: ReactNode;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void | Promise<void>;
}

interface ConfirmContextType {
    confirm: (options: ConfirmOptions) => void;
    close: () => void;
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export const useConfirm = () => {
    const context = useContext(ConfirmContext);
    if (!context) {
        throw new Error("useConfirm must be used within a ConfirmProvider");
    }
    return context;
};

export const ConfirmProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState<ConfirmOptions>({
        title: "",
        onConfirm: () => {},
    });
    const [isLoading, setIsLoading] = useState(false);
    
    // 1. Состояние для ошибки
    const [error, setError] = useState<string | null>(null);

    const confirm = useCallback((opts: ConfirmOptions) => {
        setOptions(opts);
        setError(null); // Сбрасываем старые ошибки при открытии
        setIsOpen(true);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
        setIsLoading(false);
        setError(null); // Сбрасываем ошибки при закрытии
    }, []);

    const handleConfirm = async () => {
        setIsLoading(true);
        setError(null); // Сбрасываем перед новой попыткой
        
        try {
            await options.onConfirm();
            close();
        } catch (e: any) {
            console.error(e);
            setIsLoading(false);

            // 2. Обработка ошибки
            let errorMessage = "Произошла неизвестная ошибка";

            if (isAxiosError(e) && e.response?.data) {
                // Обработка ошибок NestJS (message может быть строкой или массивом)
                const msg = e.response.data.message;
                errorMessage = Array.isArray(msg) ? msg.join(', ') : msg;
            } else if (e instanceof Error) {
                errorMessage = e.message;
            } else if (typeof e === 'string') {
                errorMessage = e;
            }

            setError(errorMessage);
        }
    };

    // Закрытие по нажатию Esc
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (isOpen && event.key === "Escape") {
                close();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, close]);

    return (
        <ConfirmContext.Provider value={{ confirm, close }}>
            {children}
            
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={close}
                            className="absolute inset-0 bg-black/60 cursor-pointer"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="relative bg-white w-full max-w-[440px] rounded-3xl p-8 text-center shadow-2xl overflow-hidden cursor-default"
                        >
                            <div className="mb-8 flex flex-col gap-2">
                                <h3 className="text-[22px] leading-tight font-bold text-[#1A1B1E]">
                                    {options.title}
                                </h3>
                                {options.description && (
                                    <div className="text-[#656565] text-lg font-medium">
                                        {options.description}
                                    </div>
                                )}
                            </div>

                            {/* 3. Вывод ошибки */}
                            {error && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mb-6 bg-red-50 text-red-500 px-4 py-3 rounded-xl text-sm font-medium border border-red-100"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={handleConfirm}
                                    disabled={isLoading}
                                    className="
                                        h-[52px] rounded-full border-[1.5px] border-[#1A1B1E] 
                                        text-[#1A1B1E] font-bold text-base 
                                        transition-all duration-200
                                        hover:bg-gray-100 active:scale-95
                                        disabled:opacity-50 disabled:cursor-not-allowed
                                        cursor-pointer
                                    "
                                >
                                    {isLoading ? "..." : (options.confirmText || "Удалить")}
                                </button>
                                <button
                                    onClick={close}
                                    disabled={isLoading}
                                    className="
                                        h-[52px] rounded-full bg-[#1A1B1E] 
                                        text-white font-bold text-base 
                                        transition-all duration-200
                                        hover:bg-[#333333] active:scale-95
                                        disabled:opacity-50 disabled:cursor-not-allowed
                                        cursor-pointer
                                    "
                                >
                                    {options.cancelText || "Отменить"}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </ConfirmContext.Provider>
    );
};