"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function SpotlightCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.body.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <motion.div
            className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden md:block"
            animate={{
                opacity: isVisible ? 1 : 0,
            }}
        >
            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full"
                animate={{
                    x: mousePosition.x - 300,
                    y: mousePosition.y - 300,
                }}
                transition={{
                    type: "spring",
                    damping: 30,
                    stiffness: 200,
                }}
                style={{
                    background:
                        "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)",
                }}
            />
        </motion.div>
    );
}
