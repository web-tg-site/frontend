"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Text } from "@/shared/ui/text";
import { cn } from "@/shared/utils";

const CONSENT_KEY = "sway_cookie_consent";

async function sendConsentStat(accepted: boolean) {
    try {
        await fetch("/api/cookie-consent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ consent: accepted }),
        });
    } catch (e) {
        console.error("Cookie consent stat error:", e);
    }
}

export const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem(CONSENT_KEY);
        if (consent === "true") {
            setIsVisible(false);
        }
        setIsMounted(true);
    }, []);

    const handleAccept = () => {
        localStorage.setItem(CONSENT_KEY, "true");
        sendConsentStat(true);
        setIsVisible(false);
    };

    const handleDecline = () => {
        sendConsentStat(false);
        setIsVisible(false);
    };

    if (!isMounted) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={cn(
                        "fixed z-50",
                        "min-[600px]:left-4 min-[600px]:bottom-2.5 min-[600px]:max-w-[500px] min-[600px]:rounded-2xl",
                        "left-0 bottom-0 w-full rounded-t-2xl",
                        "bg-secondary p-5",
                        "border border-white/10"
                    )}
                >
                    <h3 className="text-white font-semibold text-lg mb-2">
                        Использование файлов cookie
                    </h3>

                    <Text variant="3" className="text-white/90 mb-5">
                        Мы используем cookie для улучшения удобства сайта.
                        Продолжая использовать сайт, вы соглашаетесь с нашей{" "}
                        <Link
                            href="/cookie-consent"
                            target="_blank"
                            className="text-white no-underline hover:underline underline-offset-2 transition-colors"
                        >
                            политикой в отношении файлов cookie
                        </Link>
                    </Text>

                    <div className="grid min-[400px]:grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={handleDecline}
                            className={cn(
                                "min-h-[44px] rounded-full px-5 font-medium text-[16px]",
                                "border border-white/30 text-white",
                                "hover:bg-white/10 hover:border-white/50 transition-colors"
                            )}
                        >
                            Отклонить
                        </button>
                        <button
                            type="button"
                            onClick={handleAccept}
                            className={cn(
                                "min-h-[44px] rounded-full px-5 font-medium text-[16px]",
                                "bg-primary text-white",
                                "hover:opacity-90 transition-opacity"
                            )}
                        >
                            Принять
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
