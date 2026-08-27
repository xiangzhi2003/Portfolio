"use client";

import { useEffect, useState } from "react";

/** A 2px brass bar across the top, showing progress through the page. */
export function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let frame = 0;

        const measure = () => {
            frame = 0;
            const scrollable =
                document.documentElement.scrollHeight - window.innerHeight;
            setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
        };

        const onScroll = () => {
            if (frame) return;
            frame = requestAnimationFrame(measure);
        };

        measure();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });

        return () => {
            if (frame) cancelAnimationFrame(frame);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    return (
        <div
            className="scroll-progress"
            style={{ transform: `scaleX(${progress})` }}
            aria-hidden="true"
        />
    );
}
