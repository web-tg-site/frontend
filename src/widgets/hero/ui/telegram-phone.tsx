"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/shared/utils";
import { TelegramPhoneProps } from "../types";
import { useCurrentTime } from "../hooks";

export const TelegramPhone: React.FC<TelegramPhoneProps> = ({ items, className }) => {
    const currentTime = useCurrentTime();

    return (
        <div
            className={cn(
                // --- ГЕОМЕТРИЯ ---
                "relative w-[440px] h-[850px] bg-black rounded-[60px] p-[5px] border-4 border-zinc-800 shadow-2xl",
                // --- АНИМАЦИЯ ---
                "transform transition-transform duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] translate-y-[60%] hover:translate-y-[5%]",
                // --- КУРСОР ---
                "cursor-default pointer-events-auto",
                className
            )}
            style={{ 
                boxShadow: "0 0 0 1px #27272a, 0 30px 60px -12px rgba(0, 0, 0, 0.6)" 
            }}
        >
            {/* Кнопки корпуса (Слева) */}
            <div className="absolute -left-1.5 top-40 w-[3px] h-8 bg-zinc-700 rounded-l-md" />
            <div className="absolute -left-1.5 top-[210px] w-[3px] h-[65px] bg-zinc-700 rounded-l-md" />
            
            {/* Кнопка питания (Справа) */}
            <div className="absolute -right-1.5 top-[210px] w-[3px] h-[95px] bg-zinc-700 rounded-r-md" />

            {/* --- ЭКРАН --- */}
            <div className="w-full h-full bg-white rounded-[53px] overflow-hidden relative flex flex-col font-sans antialiased">
                
                {/* Dynamic Island */}
                <div className="absolute top-[11px] left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-full z-40 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-[#101010] ml-20 blur-[0.4px]" />
                </div>

                {/* Status Bar */}
                <div className="h-[54px] w-full flex justify-between items-end px-8 pb-3 text-black text-[16px] font-semibold z-30 select-none">
                    {/* Используем значение из хука */}
                    <span className="ml-1 tracking-wide tabular-nums">
                        {currentTime}
                    </span>
                    
                    <div className="flex items-center gap-1.5 mr-1">
                        <svg className="w-[19px] h-[19px]" viewBox="0 0 24 24" fill="currentColor"><path d="M10 16H6v4h4v-4zm6-9h-4v13h4V7zm6-5h-4v18h4V2z"/></svg>
                        <svg className="w-[19px] h-[19px]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.3 0-8.3 1.5-11.5 4.2l1.4 1.7c2.8-2.3 6.3-3.7 10.1-3.7 3.8 0 7.3 1.4 10.1 3.7l1.4-1.7C20.3 4.5 16.3 3 12 3zm0 5.4c-2.9 0-5.6.9-7.9 2.6l1.4 1.7c1.9-1.4 4.1-2.1 6.5-2.1 2.4 0 4.6.8 6.5 2.1l1.4-1.7c-2.3-1.6-5-2.6-7.9-2.6zM12 13.7c-1.3 0-2.5.4-3.5 1l3.5 4.3 3.5-4.3c-1-.6-2.2-1-3.5-1z"/></svg>
                        <div className="w-7 h-[13px] border-[1.5px] border-[#444] rounded-sm relative bg-[#f2f2f2] ml-1 opacity-80">
                            <div className="absolute left-0.5 top-0.5 bottom-0.5 w-4 bg-black rounded-[1px]" />
                            <div className="absolute -right-[4.5px] top-1/2 -translate-y-1/2 w-[2.5px] h-[5px] bg-[#444] rounded-r-[1px]" />
                        </div>
                    </div>
                </div>

                {/* App Header */}
                <div className="flex justify-between items-center px-5 pt-1 pb-2 z-20 bg-white">
                    <button className="text-[#007AFF] text-[17px] hover:opacity-70 transition-opacity">Edit</button>
                    <span className="text-[17px] font-semibold">Chats</span>
                    <button className="text-[#007AFF] hover:opacity-70 transition-opacity">
                        <svg className="w-[26px] h-[26px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                </div>

                {/* Search Bar */}
                <div className="px-5 pb-3 bg-white">
                    <div className="bg-[#efeff0] h-[38px] rounded-xl flex items-center px-2.5 gap-2 text-[#8e8e93] cursor-text">
                        <svg className="w-[18px] h-[18px] opacity-70" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                        <span className="text-[17px] leading-none -mt-0.5 tracking-tight">Search for messages or users</span>
                    </div>
                </div>

                {/* Channel List */}
                <div className="flex-1 overflow-y-auto pb-10 bg-white no-scrollbar">
                    {items.map((item) => (
                        <Link 
                            key={item.id} 
                            href={item.href}
                            className="group flex items-center gap-3.5 px-4 py-[9px] hover:bg-[#f3f3f3] transition-colors active:bg-[#e9e9e9]"
                        >
                            <div className="w-[60px] h-[60px] rounded-full shrink-0 bg-linear-to-br from-blue-400 to-blue-600 overflow-hidden text-white flex items-center justify-center text-2xl font-bold shadow-sm">
                                {item.avatarUrl ? (
                                    <img src={item.avatarUrl} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    item.title.charAt(0)
                                )}
                            </div>

                            <div className="flex-1 min-w-0 h-full flex flex-col justify-center border-b border-[#c6c6c8]/40 pb-3 pt-1 group-last:border-none">
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <div className="flex items-center gap-1 overflow-hidden pr-2">
                                        <h3 className="text-[17px] font-semibold text-black truncate leading-tight">
                                            {item.title}
                                        </h3>
                                        {item.isVerified && (
                                            <svg className="w-4 h-4 text-[#007AFF] shrink-0 translate-y-px" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2ZM10 17L5 12L6.4 10.6L10 14.2L17.6 6.6L19 8L10 17Z"/></svg>
                                        )}
                                    </div>
                                    <span className="text-[15px] text-[#8e8e93] font-normal shrink-0">
                                        {item.time}
                                    </span>
                                </div>
                                <div className="flex justify-between items-start">
                                    <p className="text-[16px] text-[#8e8e93] truncate pr-8 leading-5 w-full">
                                        {item.message}
                                    </p>
                                    {item.isPinned && (
                                        <svg className="w-[15px] h-[15px] text-[#aeb0b6] shrink-0 -rotate-45 -ml-6 mt-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M16 12V4H17V2H7V4H8V12L6 14V16H11V22H13V16H18V14L16 12Z" /></svg>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[140px] h-[5px] bg-black rounded-full z-40" />
            </div>
        </div>
    );
};