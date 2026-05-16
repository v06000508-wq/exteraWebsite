"use client";

import {useEffect, useRef, useState} from "react";
import {useTheme} from "next-themes";

export default function GlitchTitle({children, className}: { children: string; className?: string }) {
    const ref = useRef<HTMLSpanElement>(null);

    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const el = ref.current;
        if (!el) return;

        if (theme === 'dark') {
            el.setAttribute("data-glitch", "true");
            return;
        }

        let timeout: ReturnType<typeof setTimeout>;
        function scheduleGlitch() {
            const delay = Math.random() * 3000;
            timeout = setTimeout(() => {
                el!.setAttribute("data-glitch", "true");
                const dur = 400 + Math.random() * 300;
                setTimeout(() => {
                    el!.removeAttribute("data-glitch");
                    scheduleGlitch();
                }, dur);
            }, delay);
        }

        scheduleGlitch();
        return () => clearTimeout(timeout);
    }, [theme]);

    return (
        <span ref={ref} className={`glitch-title ${className ?? ""}`} data-text={children}>
            {children}
        </span>
    );
}
