import type { ReactNode } from "react";

interface SectionBarProps {
    /** Two-digit index, e.g. "01". */
    number: string;
    label: string;
    /** Right-hand side: a count, a sort order, or filter controls. */
    children?: ReactNode;
}

/**
 * The header that opens every section: an accent index above the section name
 * set in display type, with any meta or controls aligned to its baseline on the
 * right. Its rule spans the viewport while the content sits in the frame.
 *
 * Purely presentational — no state, no scroll listener, no client boundary.
 */
export function SectionBar({ number, label, children }: SectionBarProps) {
    return (
        <div className="section-head">
            <div className="section-head-inner frame">
                <div className="section-head-title">
                    <span className="section-index">{number}</span>
                    <h2 className="section-title">{label}</h2>
                </div>

                {children && <div className="section-head-meta">{children}</div>}
            </div>
        </div>
    );
}
