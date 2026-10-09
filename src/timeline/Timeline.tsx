"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Reveal } from "@/app/others/layout/Reveal";
import { SectionBar } from "@/app/others/layout/SectionBar";

/*
  A log, newest first. The period and kind live in a left column so the dates
  are scannable on their own, and the kind is a word rather than a coloured
  icon. Badge wording matches the filter tabs exactly, so a badge and the
  control that filters for it read as the same thing.
*/
type Kind = "Work" | "Education" | "Award" | "Activity";

interface Entry {
    kind: Kind;
    period: string;
    title: string;
    organization: string;
    location?: string;
    description: string;
    /** Fills the badge brass. Set this on your role once you start one. */
    current?: boolean;
}

const entries: Entry[] = [
    {
        kind: "Award",
        period: "Sep 2026",
        title: "HackMY IoT 2026 — Track 2",
        organization: "Monash University Malaysia",
        description:
            "Entered the Industrial & Asset IoT track with \"Next-Gen Parking\".",
    },
    {
        kind: "Education",
        period: "Completed 2026",
        title: "BSc (Hons) Software Engineering",
        organization: "Asia Pacific University",
        location: "Kuala Lumpur",
        description:
            "Software design, data structures, algorithms, and database systems. Graduated with a CGPA of 3.42 (Second Upper).",
    },
    {
        kind: "Activity",
        period: "Dec 2023 – Feb 2025",
        title: "Committee Member",
        organization: "OperationClub, APU",
        description:
            "Committee member in the Operations Department, helping run club events and activities. Also a member of the Chinese Club.",
    },
    {
        kind: "Work",
        period: "Jul – Nov 2025",
        title: "Software IT Intern",
        organization: "IJM Corporation",
        location: "Malaysia",
        description:
            "Digitised manual company workflows by developing and deploying custom internal web and mobile applications in Flutter.",
    },
    {
        kind: "Work",
        period: "2022 – 2026",
        title: "Event Crew & Promoter",
        organization: "Sime Darby, Guardian, IME, Astro, Sunway Pyramid",
        location: "Malaysia",
        description:
            "Weekend brand activations — setup, registration, product demos, and handling customer questions directly on the floor.",
    },
    {
        kind: "Award",
        period: "Dec 2024",
        title: "Top 10 Shortlisted",
        organization: "Joget NextGenHack, APU",
        description:
            "Shortlisted in the top ten of a low-code / no-code enterprise solutions challenge.",
    },
    {
        kind: "Work",
        period: "Jun – Sep 2023",
        title: "Digital Marketer Intern",
        organization: "Cereals Project, Shopee Malaysia Store",
        description:
            "Optimised Shopee product listings and created digital marketing content, while supporting and tracking the performance of online sales campaigns.",
    },
    {
        kind: "Award",
        period: "2020",
        title: "Honorable Mention",
        organization: "International Kangaroo Math Competition",
        description: "Recognised in the international round of the competition.",
    },
    {
        kind: "Award",
        period: "Certificate",
        title: "Safe Internet & Cybercrime Awareness",
        organization: "Digi Yellow Heart",
        description: "Completed the Digi Yellow Heart online-safety and cybercrime awareness programme.",
    },
];

const kinds: Kind[] = ["Work", "Education", "Award", "Activity"];

export function Timeline() {
    const [filter, setFilter] = useState<Kind | "All">("All");
    const tabsRef = useRef<HTMLDivElement>(null);
    const [indicator, setIndicator] = useState({ left: 0, width: 0 });

    // Measure the active tab so one shared underline can slide between them.
    const measureIndicator = useCallback(() => {
        const container = tabsRef.current;
        if (!container) return;

        const activeTab = container.querySelector<HTMLElement>('[aria-selected="true"]');
        if (!activeTab) return;

        setIndicator({ left: activeTab.offsetLeft, width: activeTab.offsetWidth });

        /*
          The strip scrolls sideways when the tabs don't fit, so the selected one
          can be off-screen. Scrolling the container directly rather than calling
          scrollIntoView, which would also move the page vertically.
        */
        const target =
            activeTab.offsetLeft - (container.clientWidth - activeTab.offsetWidth) / 2;
        container.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
    }, []);

    useEffect(() => {
        measureIndicator();
        window.addEventListener("resize", measureIndicator);
        return () => window.removeEventListener("resize", measureIndicator);
    }, [measureIndicator, filter]);

    /*
      Which edges of the tab strip get a fade. It has to follow the scroll
      position: a fade that is always on the trailing edge dims the last tab's
      count once you have scrolled all the way to it.
    */
    const [fade, setFade] = useState<"none" | "start" | "end" | "both">("none");

    useEffect(() => {
        const el = tabsRef.current;
        if (!el) return;

        let frame = 0;

        const measure = () => {
            frame = 0;
            const max = el.scrollWidth - el.clientWidth;
            if (max <= 1) {
                setFade("none");
                return;
            }
            const atStart = el.scrollLeft <= 1;
            const atEnd = el.scrollLeft >= max - 1;
            setFade(atStart ? "end" : atEnd ? "start" : "both");
        };

        const schedule = () => {
            if (frame) return;
            frame = requestAnimationFrame(measure);
        };

        schedule();
        el.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule, { passive: true });

        return () => {
            if (frame) cancelAnimationFrame(frame);
            el.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
        };
    }, []);

    // Counts come from the data, so a filter can never show an empty list.
    const counts = useMemo(() => {
        const tally = { All: entries.length } as Record<Kind | "All", number>;
        for (const kind of kinds) {
            tally[kind] = entries.filter((entry) => entry.kind === kind).length;
        }
        return tally;
    }, []);

    const available = useMemo(
        () => (["All", ...kinds] as const).filter((kind) => counts[kind] > 0),
        [counts],
    );

    const visible =
        filter === "All" ? entries : entries.filter((entry) => entry.kind === filter);

    return (
        <section id="log" className="section">
            <SectionBar label="Log">
                <div
                    ref={tabsRef}
                    role="tablist"
                    aria-label="Filter log by kind"
                    className="filter-tabs"
                    data-fade={fade}
                >
                    {available.map((kind) => {
                        const selected = filter === kind;
                        return (
                            <button
                                key={kind}
                                role="tab"
                                aria-selected={selected}
                                onClick={() => setFilter(kind)}
                                className={`label filter-tab ${selected
                                    ? "text-[var(--accent)]"
                                    : "hover:text-[var(--fg)]"
                                    }`}
                            >
                                {kind}
                                <span className="ml-1.5 opacity-60">{counts[kind]}</span>
                            </button>
                        );
                    })}

                    <span
                        aria-hidden="true"
                        className="filter-indicator"
                        style={{ left: indicator.left, width: indicator.width }}
                    />
                </div>
            </SectionBar>

            <div className="frame list-inset">
                {visible.map((entry, index) => (
                    <Reveal
                        key={`${entry.title}-${entry.period}`}
                        delay={Math.min(index, 3) * 60}
                    >
                        <article
                            className="log-row grid gap-4 px-6 py-7 md:grid-cols-[13rem_1fr] md:gap-0 md:px-8"
                        >
                            <div className="flex flex-wrap items-center gap-3 md:flex-col md:items-start md:gap-3 md:pr-8">
                                <p className="log-period mono text-[var(--fg)]">
                                    {entry.period}
                                </p>
                                <span className="badge" data-current={entry.current}>
                                    {entry.kind}
                                </span>
                            </div>

                            <div className="md:pl-8">
                                <h3 className="entry-title">{entry.title}</h3>

                                <p className="mono mt-1.5 uppercase tracking-wider text-[var(--fg-muted)]">
                                    {entry.organization}
                                    {entry.location && (
                                        <span className="text-[var(--fg-faint)]">
                                            {" · "}
                                            {entry.location}
                                        </span>
                                    )}
                                </p>

                                <p className="log-detail prose-body mt-3.5">
                                    {entry.description}
                                </p>
                            </div>
                        </article>
                    </Reveal>
                ))}
            </div>

            <div>
                <div className="frame px-6 py-9 md:px-12">
                    <a href="/resume.pdf" download="Final Resume Chiang Xiang Zhi.pdf" className="btn">
                        Download resume (PDF)
                    </a>
                </div>
            </div>
        </section>
    );
}
