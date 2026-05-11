"use client";

import {useRef, useEffect} from "react";
import Image, {ImageProps} from "next/image";

type HoverImageProps = ImageProps & {
    containerClassName?: string;
};

export default function HoverImage({containerClassName, className, ...props}: HoverImageProps) {
    const ref = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number>(0);
    const hoverRef = useRef(0);
    const targetHoverRef = useRef(0);
    const mouseRef = useRef({x: 0.5, y: 0.5});

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const img = el.querySelector("img");
        if (!img) return;

        function onMouseEnter() {
            targetHoverRef.current = 1;
        }
        function onMouseLeave() {
            targetHoverRef.current = 0;
        }
        function onMouseMove(e: MouseEvent) {
            const rect = el!.getBoundingClientRect();
            mouseRef.current = {
                x: (e.clientX - rect.left) / rect.width,
                y: (e.clientY - rect.top) / rect.height,
            };
        }

        function lerp(a: number, b: number, t: number) {
            return a + (b - a) * t;
        }

        function animate() {
            hoverRef.current = lerp(hoverRef.current, targetHoverRef.current, 0.06);
            const h = hoverRef.current;

            const zoom = 1 + h * 0.06;
            const rotX = (mouseRef.current.y - 0.5) * -12 * h;
            const rotY = (mouseRef.current.x - 0.5) * 12 * h;

            const rgbShift = h * 4;

            img!.style.transform = `scale(${zoom}) perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
            img!.style.filter = h > 0.01
                ? `drop-shadow(${rgbShift}px 0 0 rgba(255,0,60,0.5)) drop-shadow(-${rgbShift}px 0 0 rgba(0,240,255,0.5))`
                : "";

            rafRef.current = requestAnimationFrame(animate);
        }

        el.addEventListener("mouseenter", onMouseEnter);
        el.addEventListener("mouseleave", onMouseLeave);
        el.addEventListener("mousemove", onMouseMove);
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            el.removeEventListener("mouseenter", onMouseEnter);
            el.removeEventListener("mouseleave", onMouseLeave);
            el.removeEventListener("mousemove", onMouseMove);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <div ref={ref} className={`overflow-hidden ${containerClassName ?? ""}`} style={{willChange: "transform"}}>
            <Image
                {...props}
                className={`transition-none ${className ?? ""}`}
                style={{transformOrigin: "center center", willChange: "transform, filter"}}
            />
        </div>
    );
}
