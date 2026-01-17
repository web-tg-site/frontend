import { useRef, useState, ChangeEvent, DragEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash } from "lucide-react"
import { cn } from "@/shared/utils"
import { AdminFileUploadProps } from "../../types/admin-file-upload.props"

export const AdminFileUpload = ({
    className,
    placeholder = "Загрузить файл",
    accept = "image/*",
    variant = 'standard',
    error,
    value,
    onChange,
    name,
    disabled
}: AdminFileUploadProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [internalFile, setInternalFile] = useState<File | string | null>(null)

    const file = value !== undefined ? value : internalFile

    const handleClick = () => {
        if (!disabled) inputRef.current?.click()
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null
        if (selectedFile) {
            onChange?.(selectedFile)
            setInternalFile(selectedFile)
        }
    }

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation()
        onChange?.(null)
        setInternalFile(null)
        if (inputRef.current) inputRef.current.value = ""
    }

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (!disabled) setIsDragging(true)
    }

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragging(false)
        if (disabled) return

        const droppedFile = e.dataTransfer.files?.[0]
        if (droppedFile) {
            if (accept === "image/*" && !droppedFile.type.startsWith("image/")) return
            onChange?.(droppedFile)
            setInternalFile(droppedFile)
        }
    }

    const fileLabel = (() => {
        if (!file) return ""
        if (file instanceof File) return file.name
        try {
            const url = new URL(file)
            const last = url.pathname.split("/").filter(Boolean).pop()
            return last || file
        } catch {
            const parts = file.split("/").filter(Boolean)
            return parts.pop() || file
        }
    })()

    return (
        <div className="w-full flex flex-col">
            <div
                onClick={handleClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                    "relative w-full flex items-center justify-between transition-all duration-300 cursor-pointer outline-none group",
                    "pl-4 py-3 lg:pl-5 lg:py-3.5 pr-4 lg:pr-5",
                    "text-sm lg:text-base font-medium",
                    variant === 'standard' && [
                        "bg-[#282828] border rounded-xl",
                        isDragging ? "border-white/40 bg-[#2F2F2F]" : "border-transparent",
                        !file && "hover:border-white/10 hover:bg-[#2F2F2F]",
                    ],
                    variant === 'alternative' && [
                        "bg-[#1E1E1E] border rounded-[16px]",
                        isDragging ? "border-white/20 bg-[#252525]" : "border-transparent",
                        !file && "hover:bg-[#252525]",
                    ],
                    error && "border-red-500/40 bg-red-900/10 hover:bg-red-900/20",
                    disabled && "opacity-50 cursor-not-allowed pointer-events-none",
                    className
                )}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    className="hidden"
                    onChange={handleFileChange}
                    name={name}
                    disabled={disabled}
                />

                <div className="flex-1 truncate mr-4">
                    {file ? (
                        <span className={cn(
                            "text-white underline decoration-white/30 underline-offset-4",
                            error && "text-red-100"
                        )}>
                            {fileLabel}
                        </span>
                    ) : (
                        <span className={cn(
                            "text-[#656565] transition-colors group-hover:text-[#808080]",
                            error && "text-red-200/60"
                        )}>
                            {placeholder}
                        </span>
                    )}
                </div>

                <div className="flex-shrink-0 text-[#656565]">
                    {file ? (
                        <div
                            onClick={handleRemove}
                            className="flex h-6 w-6 items-center justify-center -mr-1 rounded-md hover:bg-white/5 hover:text-red-400 transition-colors"
                        >
                            <Trash size={20} />
                        </div>
                    ) : (
                        <div className="group-hover:text-white transition-colors">
                            <Plus size={24} />
                        </div>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, y: -5 }}
                        animate={{ height: "auto", opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -5 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30, mass: 1 }}
                        className="overflow-hidden"
                    >
                        <p className="pt-1.5 text-xs text-red-400 font-medium ml-1 px-4">
                            {error}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}