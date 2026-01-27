"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface CosmicBackgroundProps {
    scrollYProgress: MotionValue<number>;
}

export function CosmicBackground({ scrollYProgress }: CosmicBackgroundProps) {
    const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.0]);

    return (
        <motion.div
            className="fixed inset-0 z-[-1] pointer-events-none"
            style={{
                scale,
                willChange: "transform",
                background: "linear-gradient(180deg, #0a1628 0%, #030712 50%, #000000 100%)",
            }}
        >
            {/* Subtle gradient overlays */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
            radial-gradient(ellipse at 20% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)
          `,
                }}
            />

            {/* Subtle glow */}
            <div
                className="absolute top-[10%] left-[20%] w-[600px] h-[600px] rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%)",
                    filter: "blur(80px)",
                }}
            />

            {/* Vignette effect for depth */}
            <div
                className="absolute inset-0"
                style={{
                    background: "radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.5) 100%)",
                }}
            />
        </motion.div>
    );
}
