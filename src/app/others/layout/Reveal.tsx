"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

interface RevealProps {
    children: ReactNode;
    /** Stagger offset in ms, for sibling entries in a list. */
    delay?: number;
    className?: string;
}

/**
 * The page's only scroll animation: a 12px settle, once, on first view.
 * IntersectionObserver plus a CSS transition — no scrub, no parallax, no
 * library. Reduced motion is handled in globals.css so the content stays
 * visible even if this never runs.
 */
export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [shown, setShown] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShown(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            data-shown={shown}
            className={`reveal ${className}`}
            style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
        >
            {children}
        </div>
    );
}
