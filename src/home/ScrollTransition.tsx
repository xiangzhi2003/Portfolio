"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { CosmicBackground } from "./CosmicBackground";
import { ParallaxHero } from "./ParallaxHero";
import { AboutPreview } from "@/about/AboutPreview";

export function ScrollTransition() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <>
            {/* Anchor for Home section */}
            <div id="home" className="absolute top-0" />

            <div ref={containerRef} className="h-[200vh] relative">
                <div className="sticky top-0 h-screen overflow-hidden">
                    <CosmicBackground scrollYProgress={scrollYProgress} />
                    <ParallaxHero scrollYProgress={scrollYProgress} />
                    <AboutPreview scrollYProgress={scrollYProgress} />
                </div>
            </div>

            {/* Anchor for About section - positioned at scroll midpoint */}
            <div id="about" className="absolute" style={{ top: "100vh" }} />
        </>
    );
}
