import { useState, useEffect } from "react";

export const useCurrentTime = (initialTime: string = "9:41") => {
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            });
            setTime(timeString);
        };

        updateTime();

        const intervalId = setInterval(updateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return time;
};