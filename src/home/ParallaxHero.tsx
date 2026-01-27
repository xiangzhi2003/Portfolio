"use client";

import { motion, useTransform, useSpring, MotionValue, useMotionValueEvent } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface ParallaxHeroProps {
    scrollYProgress: MotionValue<number>;
}

export function ParallaxHero({ scrollYProgress }: ParallaxHeroProps) {
    const [isHidden, setIsHidden] = useState(false);

    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

    const heroScaleSpring = useSpring(heroScale, { stiffness: 100, damping: 30 });
    const heroOpacitySpring = useSpring(heroOpacity, { stiffness: 100, damping: 30 });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setIsHidden(latest > 0.9);
    });

    if (isHidden) {
        return null;
    }

    return (
        <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 z-10 pointer-events-none"
            style={{
                opacity: heroOpacitySpring,
                scale: heroScaleSpring,
                willChange: "transform, opacity",
            }}
        >
            {/* Profile Picture */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
            >
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="relative group pointer-events-auto"
                >
                    {/* Gradient border ring */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 rounded-full opacity-75 group-hover:opacity-100 blur-sm group-hover:blur-md transition-all duration-300" />
                    {/* Glow effect */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/20 via-amber-400/20 to-orange-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    {/* Image container */}
                    <div className="relative w-[150px] h-[150px] md:w-[180px] md:h-[180px] rounded-full overflow-hidden border-2 border-slate-800">
                        <Image
                            src="/profile.jpg"
                            alt="Xiang Zhi"
                            fill
                            sizes="(max-width: 768px) 150px, 180px"
                            className="object-cover"
                            priority
                        />
                    </div>
                </motion.div>
            </motion.div>

            {/* "Hi I am" with horizontal lines on both sides */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-4 mb-6"
            >
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    className="h-[1px] bg-slate-600 w-16 md:w-24"
                />
                <span className="text-slate-400 text-base md:text-lg tracking-[0.3em] uppercase font-light whitespace-nowrap">
                    Hi, I&apos;m
                </span>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    className="h-[1px] bg-slate-600 w-16 md:w-24"
                />
            </motion.div>

            {/* Name - Large and Bold */}
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.95] text-white mb-6 md:mb-8"
            >
                Xiang Zhi
            </motion.h1>

            {/* Subtitle */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-lg md:text-xl lg:text-2xl font-semibold tracking-[0.15em] md:tracking-[0.2em] uppercase text-blue-400"
            >
                Software Engineer
            </motion.p>

            {/* Social Icons - Below subtitle */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex gap-6 mt-10 relative z-30"
            >
                <motion.a
                    href="https://github.com/xiangzhi2003"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="p-3 rounded-full border border-slate-600 bg-slate-800/50 text-slate-400 hover:text-white hover:border-blue-500 hover:bg-slate-700/50 transition-all duration-300 pointer-events-auto cursor-pointer"
                    aria-label="GitHub"
                >
                    <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                    href="https://www.linkedin.com/in/xiang-zhi-chiang-6723a9299/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="p-3 rounded-full border border-slate-600 bg-slate-800/50 text-slate-400 hover:text-white hover:border-blue-500 hover:bg-slate-700/50 transition-all duration-300 pointer-events-auto cursor-pointer"
                    aria-label="LinkedIn"
                >
                    <Linkedin className="w-5 h-5" />
                </motion.a>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <div className="flex flex-col items-center gap-2 text-slate-500">
                    <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-5 h-8 border-2 border-slate-600 rounded-full flex justify-center pt-1.5"
                    >
                        <div className="w-1 h-2 bg-slate-500 rounded-full" />
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}
