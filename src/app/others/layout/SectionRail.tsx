"use client";

import { useEffect, useRef, useState } from "react";

interface SectionRailProps {
    label: string;
    /** Small mono line under the label — a count, a sort order. */
    meta?: string;
    /** Nudges the label onto the baseline of adjacent body copy. */
    alignToText?: boolean;
}

/**
 * The sticky label at the left of every section, plus a track showing how far
 * through that section you've scrolled. The progress is information rather
 * than decoration, which is why it earns the only continuous motion on the page.
 */
export function SectionRail({ label, meta, alignToText = false }: SectionRailProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const section = ref.current?.closest("section");
        if (!section) return;

        let frame = 0;

        const measure = () => {
            frame = 0;
            const rect = section.getBoundingClientRect();
            if (rect.height === 0) return;

            /*
              Fill as the section is read: 0 when its top touches the bottom of
              the viewport, 1 once its bottom reaches the bottom of the viewport.
              Measuring against the section's own height (rather than height +
              viewport) matters for the last section — the page runs out of
              scroll before it can travel a full viewport, so the old formula
              stranded the final rail at roughly half.
            */
            const travelled = window.innerHeight - rect.top;
            setProgress(Math.min(1, Math.max(0, travelled / rect.height)));
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
            ref={ref}
            className="section-rail"
            data-align={alignToText ? "text" : undefined}
        >
            <p className="label">{label}</p>
            {meta && <p className="mono mt-2 text-[var(--fg-faint)]">{meta}</p>}

            <div className="rail-track" aria-hidden="true">
                <div className="rail-fill" style={{ transform: `scaleY(${progress})` }} />
            </div>
        </div>
    );
}
