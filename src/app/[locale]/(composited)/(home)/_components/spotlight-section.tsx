"use client";

import {useEffect, useRef, ReactNode} from "react";

export default function SpotlightSection({children, className}: { children: ReactNode; className?: string }) {
    const ref = useRef<HTMLElement>(null);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let targetX = 0, targetY = 0;
        let currentX = 0, currentY = 0;

        function onMouseMove(e: MouseEvent) {
            const rect = el!.getBoundingClientRect();
            targetX = e.clientX - rect.left;
            targetY = e.clientY - rect.top;
        }

        function animate() {
            currentX += (targetX - currentX) * 0.08;
            currentY += (targetY - currentY) * 0.08;

            el!.style.setProperty("--spotlight-x", `${currentX}px`);
            el!.style.setProperty("--spotlight-y", `${currentY}px`);

            rafRef.current = requestAnimationFrame(animate);
        }

        el.addEventListener("mousemove", onMouseMove);
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            el.removeEventListener("mousemove", onMouseMove);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <section
            ref={ref}
            className={`spotlight-section ${className ?? ""}`}
        >
            {children}
        </section>
    );
}
