"use client";

import {useEffect, useRef} from "react";

const CHARS = "АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзиклмнопрстуфхцчшщъыьэюя0123456789";

function animateSpans(spans: HTMLSpanElement[]) {
    const cleanups: (() => void)[] = [];

    spans.forEach((span, i) => {
        const original = span.getAttribute("data-char") ?? span.textContent ?? "";
        if (original === " " || original === "") {
            span.style.opacity = "1";
            return;
        }

        const totalFrames = 4 + Math.floor(i * 0.3);
        const delay = i * 28;

        span.style.opacity = "0";
        span.style.transition = "opacity 0.15s ease";

        let frame = 0;
        let timeout: ReturnType<typeof setTimeout>;
        let interval: ReturnType<typeof setInterval>;

        timeout = setTimeout(() => {
            span.style.opacity = "1";
            interval = setInterval(() => {
                if (frame >= totalFrames) {
                    span.textContent = original;
                    clearInterval(interval);
                    return;
                }
                span.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
                frame++;
            }, 40);
        }, delay);

        cleanups.push(() => {
            clearTimeout(timeout);
            clearInterval(interval);
            span.textContent = original;
            span.style.opacity = "1";
        });
    });

    return () => cleanups.forEach(fn => fn());
}

export default function GlitchText({children, className}: { children: string; className?: string }) {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const spans = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-char]"));
        const cleanup = animateSpans(spans);
        return cleanup;
    }, [children]);

    let charIndex = 0;
    const words = children.split(" ");

    return (
        <span ref={ref} className={className} aria-label={children} style={{cursor: "default"}}>
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
