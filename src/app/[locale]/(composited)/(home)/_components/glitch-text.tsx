"use client";

import {useEffect, useRef} from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export default function GlitchText({children, className}: { children: string; className?: string }) {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const spans = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-char]"));

        spans.forEach((span, i) => {
            const original = span.getAttribute("data-char") ?? span.textContent ?? "";
            let frame = 0;
            const totalFrames = 6 + Math.floor(i * 0.55 * 4);
            const delay = i * 40;

            let timeout: ReturnType<typeof setTimeout>;
            let interval: ReturnType<typeof setInterval>;

            timeout = setTimeout(() => {
                interval = setInterval(() => {
                    if (frame >= totalFrames) {
                        span.textContent = original;
                        clearInterval(interval);
                        return;
                    }
                    span.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
                    frame++;
                }, 50);
            }, delay);

            return () => {
                clearTimeout(timeout);
                clearInterval(interval);
            };
        });
    }, [children]);

    let charIndex = 0;
    const words = children.split(" ");

    return (
        <span ref={ref} className={className} aria-label={children}>
            {words.map((word, wi) => (
                <span key={wi} style={{display: "inline", whiteSpace: "normal"}}>
                    {wi > 0 && " "}
                    {word.split("").map((char) => {
                        const idx = charIndex++;
                        return (
                            <span key={idx} data-char={char} style={{"--char-index": idx} as React.CSSProperties}>
                                {char}
                            </span>
                        );
                    })}
                </span>
            ))}
        </span>
    );
}
