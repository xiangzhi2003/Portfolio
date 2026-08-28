import type { ReactNode } from "react";

interface SectionBarProps {
    label: string;
    /** Right-hand side: a count, a sort order, or filter controls. */
    children?: ReactNode;
    /**
     * Drop the centred frame so the header lines up with full-width content.
     * Framed by default, matching the rest of the page.
     */
    wide?: boolean;
}

/**
 * The header that opens a section: the name in the accent, with any meta or
 * controls aligned opposite it. Purely presentational — no state, no client
 * boundary.
 */
export function SectionBar({ label, children, wide = false }: SectionBarProps) {
    return (
        <div className="section-head">
            <div className={`section-head-inner ${wide ? "" : "frame"}`}>
                <h2 className="section-title">{label}</h2>

                {children && <div className="section-head-meta">{children}</div>}
            </div>
        </div>
    );
}
