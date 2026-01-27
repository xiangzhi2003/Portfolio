"use client";

import { motion, useTransform, useSpring, MotionValue } from "framer-motion";
import { aboutParagraphs } from "@/about/content";

interface AboutPreviewProps {
    scrollYProgress: MotionValue<number>;
}

export function AboutPreview({ scrollYProgress }: AboutPreviewProps) {
    const aboutOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);
    const aboutY = useTransform(scrollYProgress, [0.5, 1], [100, 0]);

    const aboutYSpring = useSpring(aboutY, { stiffness: 100, damping: 30 });
    const aboutOpacitySpring = useSpring(aboutOpacity, { stiffness: 100, damping: 30 });

    return (
        <div className="absolute inset-0 pointer-events-none">
            <motion.div
                className="absolute inset-0 flex items-center justify-center z-20"
                style={{
                    opacity: aboutOpacitySpring,
                    y: aboutYSpring,
                    willChange: "transform, opacity",
                }}
            >
                <div className="glass-card-cosmic-light rounded-2xl p-8 md:p-12 max-w-4xl mx-6 shadow-2xl border border-purple-500/20">
                    {/* Section Label */}
                    <p className="text-sm font-medium uppercase tracking-[0.3em] text-purple-300 mb-6 text-center" style={{ textShadow: "0 0 10px rgba(168, 85, 247, 0.5)" }}>
                        About Me
                    </p>

                    {/* Main Heading */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-10 tracking-tight text-glow-strong">
                        Hello there!
                    </h2>

                    {/* Paragraphs */}
                    <div className="space-y-6">
                        {aboutParagraphs.map((text, index) => (
                            <p
                                key={index}
                                className="text-base md:text-lg text-slate-100 leading-relaxed text-center"
                                style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)" }}
                            >
                                {text}
                            </p>
                        ))}
                    </div>

                    {/* Decorative line */}
                    <div className="mt-10 divider-gradient" />
                </div>
            </motion.div>
        </div>
    );
}
