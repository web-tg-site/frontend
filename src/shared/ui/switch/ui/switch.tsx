"use client";

import { motion } from "framer-motion";
import { cn } from "@/shared/utils";
import { SwitchProps } from "../props";
import { TRACK_W, TRACK_H, THUMB_X_ON, THUMB_X_OFF } from "../config";
import { transition } from "../config/animation";

export const Switch = ({
    checked,
    onClick,
    placeholder,
    className,
}: SwitchProps) => {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            className={cn(
                "inline-flex items-center gap-2 rounded-md p-2 text-left cursor-pointer",
                className,
            )}
            onClick={() => onClick(!checked)}
        >
            <span className="text-[16px] text-white">{placeholder}</span>
            <motion.span
                className="relative shrink-0 overflow-hidden rounded-full"
                style={{ width: TRACK_W, height: TRACK_H }}
                initial={false}
                animate={{
                    backgroundColor: checked ? "#0088FF" : "#39393D",
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            >
                <span className="pointer-events-none absolute inset-0 flex items-center">
                    <motion.span
                        aria-hidden
                        className="block h-[20px] w-[20px] shrink-0 rounded-full bg-white"
                        initial={false}
                        animate={{
                            x: checked ? THUMB_X_ON : THUMB_X_OFF,
                        }}
                        transition={transition}
                    />
                </span>
            </motion.span>
        </button>
    );
};
