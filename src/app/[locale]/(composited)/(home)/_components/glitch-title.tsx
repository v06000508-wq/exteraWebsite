"use client";

import {useEffect, useRef} from "react";

export default function GlitchTitle({children, className}: { children: string; className?: string }) {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

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
    }, []);

    return (
        <span ref={ref} className={`glitch-title ${className ?? ""}`} data-text={children}>
            {children}
        </span>
    );
}
