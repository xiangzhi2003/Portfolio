"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/app/others/layout/Reveal";
import { SectionRail } from "@/app/others/layout/SectionRail";

/*
  Each category scrolls as its own band, all moving the same direction at
  the same pace. The bands pause on hover so the list stays readable, and
  keep moving even under reduced motion — it's a gentle constant drift, not
  the kind of sudden motion that setting exists to prevent.

  A row needs one full pass through its list to be at least as wide as the
  visible column, or the seamless-loop technique below runs out of content
  before the loop point and exposes raw background — Frameworks (4 items)
  and Data (3 items) are nowhere near wide enough on their own. So each row
  measures itself and repeats its list only as many times as its own width
  actually requires, then duplicates that once more — the minimum a -50%
  translate loop needs to be seamless. Wide rows on wide screens may need
  no repeats at all; narrow rows on wide screens may need several.

  Speed is one token: --marquee-speed in globals.css, in pixels per second —
  every row is given a duration that makes it travel at exactly that speed,
  regardless of how wide its content ended up.
*/
interface Group {
    name: string;
    items: string[];
}

const groups: Group[] = [
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

const total = groups.reduce((sum, group) => sum + group.items.length, 0);

/** Repeats a row's list until it's wide enough, then measures the result. */
function Band({ group }: { group: Group }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [copies, setCopies] = useState(1);
    const [duration, setDuration] = useState<number>();

    useEffect(() => {
        const container = containerRef.current;
        const track = trackRef.current;
        if (!container || !track) return;

        // The track holds `copies` runs, duplicated once for the loop — half
        // its rendered width is exactly one run's worth of content.
        const oneRunWidth = track.scrollWidth / 2;

        if (oneRunWidth < container.clientWidth && copies < 10) {
            const frame = requestAnimationFrame(() => setCopies((c) => c + 1));
            return () => cancelAnimationFrame(frame);
        }

        const pxPerSecond =
            parseFloat(
                getComputedStyle(document.documentElement).getPropertyValue(
                    "--marquee-speed",
                ),
            ) || 26;
        const frame = requestAnimationFrame(() => setDuration(oneRunWidth / pxPerSecond));
        return () => cancelAnimationFrame(frame);
    }, [copies]);

    /*
      A resize only needs to change anything here if the row has genuinely
      become too narrow for its current content — this only ever grows the
      row, never resets it back down first. Resetting to recheck from
      scratch briefly shrinks the track, and since the loop's -50% target
      is a percentage of the track's own width, any width change while the
      animation is running visibly snaps its position — that was firing on
      every resize event, including ones that changed nothing meaningful
      (a mobile browser's address bar hiding/showing fires resize too).
    */
    useEffect(() => {
        let frame = 0;

        const onResize = () => {
            if (frame) return;
            frame = requestAnimationFrame(() => {
                frame = 0;
                const container = containerRef.current;
                const track = trackRef.current;
                if (!container || !track) return;

                const oneRunWidth = track.scrollWidth / 2;
                if (oneRunWidth < container.clientWidth) {
                    setCopies((c) => Math.min(c + 1, 10));
                }
            });
        };

        window.addEventListener("resize", onResize, { passive: true });
        return () => {
            if (frame) cancelAnimationFrame(frame);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    const run = Array.from({ length: copies }, () => group.items).flat();
    const track = [...run, ...run];

    return (
        <div ref={containerRef} className="marquee">
            <div
                ref={trackRef}
                className="marquee-track"
                aria-hidden="true"
                style={duration ? { animationDuration: `${duration}s` } : undefined}
            >
                {track.map((name, index) => (
                    <span key={`${name}-${index}`} className="chip">
                        {name}
                    </span>
                ))}
            </div>
        </div>
    );
}

export function TechStack() {
    return (
        <section id="stack" className="section" data-band="alt">
            <div className="shell section-grid">
                <SectionRail label="Stack" meta={`${total} technologies`} alignToText />

                <div>
                    <Reveal>
                        <p className="prose-body">
                            The languages, frameworks, and tools I reach for most —
                            grouped by kind. Hover a row to pause it and read.
                        </p>
                    </Reveal>

                    <div className="mt-10 space-y-5">
                        {groups.map((group, index) => (
                            <Reveal key={group.name} delay={index * 70}>
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
                                    <div className="flex items-baseline gap-2 sm:w-32 sm:shrink-0">
                                        <h3 className="label">{group.name}</h3>
                                        <span className="mono text-[var(--fg-faint)]">
                                            {group.items.length}
                                        </span>
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <Band group={group} />
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    {/* The marquee is decorative motion; this is the accessible copy. */}
                    <ul className="sr-only">
                        {groups.map((group) => (
                            <li key={group.name}>
                                {group.name}: {group.items.join(", ")}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
