"use client";

export function SpaceBackgroundGlobal() {
    return (
        <div className="fixed inset-0 z-[-2] pointer-events-none overflow-hidden">
            {/* Clean dark gradient base */}
            <div
                className="absolute inset-0"
                style={{
                    background: "linear-gradient(180deg, #0a1628 0%, #030712 50%, #000000 100%)",
                }}
            />

            {/* Subtle blue glow */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
            radial-gradient(ellipse at 30% 20%, rgba(59, 130, 246, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(59, 130, 246, 0.04) 0%, transparent 50%)
          `,
                }}
            />

            {/* Vignette for depth */}
            <div
                className="absolute inset-0"
                style={{
                    background: "radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)",
                }}
            />
        </div>
    );
}
