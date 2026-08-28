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
        kind: "Education",
        period: "Completed 2026",
        title: "BSc (Hons) Software Engineering",
        organization: "Asia Pacific University",
        location: "Kuala Lumpur",
        description:
            "Software design, data structures, algorithms, and database systems. Completed with a 3.66 GPA; convocation pending.",
    },
    {
        kind: "Activity",
        period: "Until 2026",
        title: "Committee Member",
        organization: "OperationClub, APU",
        description:
            "Ran events and workshops for the club — planning, logistics, and getting a team of volunteers to the same page on the day.",
    },
    {
        kind: "Work",
        period: "Jul – Nov 2025",
        title: "Software Engineering Intern",
        organization: "IJM Corporation",
        location: "Malaysia",
        description:
            "Built internal applications with Flutter and .NET, working in the engineering team's Agile cycle from ticket to release.",
    },
    {
        kind: "Work",
        period: "2022 – 2025",
        title: "Event Crew & Promoter",
        organization: "Sime Darby, Guardian, Astro, Sunway Pyramid",
        location: "Malaysia",
        description:
            "Weekend brand activations — setup, registration, product demos, and handling customer questions directly on the floor.",
    },
    {
        kind: "Award",
        period: "2024",
        title: "Top 10 Finalist",
        organization: "Joget NextGenHack",
        description:
            "Placed in the top ten of a national low-code hackathon, building and pitching a working prototype under a weekend deadline.",
    },
    {
        kind: "Work",
        period: "Jun – Sep 2023",
        title: "Digital Marketing Intern",
        organization: "Cereals Project",
        description:
            "Ran social campaigns end to end: content, scheduling, and reading the metrics afterwards to decide what to change.",
    },
    {
        kind: "Award",
        period: "2020",
        title: "Honorable Mention",
        organization: "International Kangaroo Math Competition",
        description: "Recognised in the international round of the competition.",
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
    }, []);

    useEffect(() => {
        measureIndicator();
        window.addEventListener("resize", measureIndicator);
        return () => window.removeEventListener("resize", measureIndicator);
    }, [measureIndicator, filter]);

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
                    className="relative flex flex-wrap items-center gap-x-5 gap-y-1.5"
                >
                    {available.map((kind) => {
                        const selected = filter === kind;
                        return (
                            <button
                                key={kind}
                                role="tab"
                                aria-selected={selected}
                                onClick={() => setFilter(kind)}
                                className={`label pb-1 transition-colors ${selected
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
                        className="pointer-events-none absolute bottom-0 h-0.5 bg-[var(--accent)]"
                        style={{
                            left: indicator.left,
                            width: indicator.width,
                            transition: "left 340ms var(--ease), width 340ms var(--ease)",
                        }}
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
                    <a href="/resume.pdf" download className="btn">
                        Download resume (PDF)
                    </a>
                </div>
            </div>
        </section>
    );
}
