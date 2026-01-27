"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface GSAPSectionProps {
    children: ReactNode;
    id: string;
    className?: string;
    pin?: boolean;
    scrub?: boolean | number;
    revealType?: "fade-scale" | "fade-slide" | "stagger" | "none";
    parallaxSpeed?: number;
    reverseOnExit?: boolean;
    triggerStart?: string;
    triggerEnd?: string;
}

export function GSAPSection({
    children,
    id,
    className = "",
    pin = false,
    scrub = 1,
    revealType = "fade-scale",
    parallaxSpeed = 0,
    reverseOnExit = true,
    triggerStart = "top 80%",
    triggerEnd = "bottom 20%",
}: GSAPSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const section = sectionRef.current;
            const content = contentRef.current;
            if (!section || !content) return;

            if (revealType !== "none") {
                const revealConfig = getRevealConfig(revealType);

                gsap.fromTo(
                    content,
                    revealConfig.from,
                    {
                        ...revealConfig.to,
                        scrollTrigger: {
                            trigger: section,
                            start: triggerStart,
                            end: triggerEnd,
                            scrub: scrub,
                            toggleActions: reverseOnExit
                                ? "play reverse play reverse"
                                : "play none none reverse",
                        },
                    }
                );
            }

            if (revealType === "stagger") {
                const children = content.querySelectorAll(".gsap-stagger-item");
                if (children.length > 0) {
                    gsap.fromTo(
                        children,
                        {
                            opacity: 0,
                            y: 40,
                            scale: 0.95,
                        },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            stagger: 0.1,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: section,
                                start: "top 70%",
                                end: "top 30%",
                                scrub: scrub,
                            },
                        }
                    );
                }
            }

            if (parallaxSpeed !== 0) {
                gsap.to(content, {
                    yPercent: parallaxSpeed * -50,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            }

            if (pin) {
                ScrollTrigger.create({
                    trigger: section,
                    start: "top top",
                    end: "+=100%",
                    pin: true,
                    pinSpacing: true,
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [pin, scrub, revealType, parallaxSpeed, reverseOnExit, triggerStart, triggerEnd]);

    return (
        <section ref={sectionRef} id={id} className={`gsap-section ${className}`}>
            <div ref={contentRef} className="gsap-section-content will-change-transform">
                {children}
            </div>
        </section>
    );
}

function getRevealConfig(type: string) {
    switch (type) {
        case "fade-scale":
            return {
                from: { opacity: 0.4, scale: 0.98, y: 40 },
                to: { opacity: 1, scale: 1, y: 0, ease: "power2.out" },
            };
        case "fade-slide":
            return {
                from: { opacity: 0, y: 80 },
                to: { opacity: 1, y: 0, ease: "power2.out" },
            };
        case "stagger":
            return {
                from: { opacity: 0, y: 40 },
                to: { opacity: 1, y: 0, ease: "power2.out" },
            };
        default:
            return {
                from: { opacity: 1 },
                to: { opacity: 1 },
            };
    }
}

export function GSAPStaggerItem({
    children,
    className = "",
}: {
    children: ReactNode;
    className?: string;
}) {
    return <div className={`gsap-stagger-item ${className}`}>{children}</div>;
}
