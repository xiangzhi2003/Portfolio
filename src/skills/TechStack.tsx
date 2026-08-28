"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/app/others/layout/Reveal";
import { SectionBar } from "@/app/others/layout/SectionBar";

/*
  The stack reads twice: once as an oversized ticker that gives the section its
  energy, then as a grid where the information actually lives, grouped by kind.

  The ticker duplicates its list exactly once — the minimum a -50% translate
  loop needs to be seamless — and its duration is measured so it travels at
  --marquee-speed pixels per second regardless of how wide the content is.
  It keeps moving under reduced motion by deliberate exception; see globals.css.
*/
const groups = [
    {
        name: "Languages",
        items: ["C#", "Java", "Dart", "Python", "JavaScript", "C++", "R", "SQL"],
    },
    {
        name: "Frameworks",
        items: [".NET", "Flutter", "WinForms", "Node.js"],
    },
    {
        name: "Data",
        items: ["Microsoft SQL Server", "Firebase", "MySQL"],
    },
    {
        name: "Tooling",
        items: [
            "Git",
            "GitHub",
            "Visual Studio",
            "Android Studio",
            "VS Code",
            "NetBeans",
            "PyCharm",
            "Claude Code",
        ],
    },
];

const allTech = groups.flatMap((group) => group.items);
const total = allTech.length;

function Ticker() {
    const trackRef = useRef<HTMLDivElement>(null);
    const [duration, setDuration] = useState<number>();

    useEffect(() => {
        const node = trackRef.current;
        if (!node) return;

        let frame = 0;

        const measure = () => {
            frame = 0;
            const pxPerSecond =
                parseFloat(
                    getComputedStyle(document.documentElement).getPropertyValue(
                        "--marquee-speed",
                    ),
                ) || 26;

            // The track is the doubled copy; one full loop is half its width.
            const loopDistance = node.scrollWidth / 2;
            if (loopDistance > 0) setDuration(loopDistance / pxPerSecond);
        };

        const onResize = () => {
            if (frame) return;
            frame = requestAnimationFrame(measure);
        };

        frame = requestAnimationFrame(measure);
        window.addEventListener("resize", onResize, { passive: true });

        return () => {
            if (frame) cancelAnimationFrame(frame);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    const track = [...allTech, ...allTech];

    return (
        <div className="marquee py-10 md:py-14">
            <div
                ref={trackRef}
                className="marquee-track"
                aria-hidden="true"
                style={duration ? { animationDuration: `${duration}s` } : undefined}
            >
                {track.map((name, index) => (
                    <span key={`${name}-${index}`} className="flex items-center gap-10">
                        <span className="tech">{name}</span>
                        <span className="tech-sep">◆</span>
                    </span>
                ))}
            </div>
        </div>
    );
}

export function TechStack() {
    return (
        <section id="stack" className="section" data-band="alt">
            <SectionBar label="Stack">
                <span className="label">{total} technologies</span>
            </SectionBar>

            <Ticker />

            {/* A lined list: category name in the accent, its technologies beside it. */}
            <div className="stack-list">
                {groups.map((group, index) => (
                    <Reveal key={group.name} delay={Math.min(index, 3) * 60}>
                        <div className="stack-row">
                            <h3 className="stack-name">{group.name}</h3>

                            <ul className="stack-items">
                                {group.items.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
