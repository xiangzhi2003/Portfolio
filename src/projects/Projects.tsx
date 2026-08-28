"use client";

import { useState } from "react";
import Image from "next/image";
import { Github, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/app/others/layout/Reveal";
import { SectionBar } from "@/app/others/layout/SectionBar";

/*
  Each project is a numbered row that expands. Collapsed, all six are scannable
  at once; open, a row shows its screenshot and description.

  The preview slot holds the language mark until a real screenshot exists, so
  the layout is identical either way and adding one is a one-line change:

    image: "/projects/restaurant.png"   drop the file in public/projects/
    href:  "https://github.com/..."     adds a source link inside the panel

  No `year` field: the real dates aren't known, and inventing them would put
  false information in front of recruiters. `platform` fills that slot instead.
*/
interface Project {
    title: string;
    language: string;
    platform: string;
    description: string;
    stack: string[];
    /** Screenshot in public/projects/. Recommended 1600×1000 (16:10). */
    image?: string;
    href?: string;
}

const projects: Project[] = [
    {
        title: "Restaurant Management System",
        language: "C#",
        platform: "Desktop",
        description:
            "Point-of-sale for a full service restaurant: order entry, live table state, stock deduction on sale, and staff shift records, reporting against a local database.",
        stack: ["C#", ".NET", "WinForms", "LocalDB"],
    },
    {
        title: "Secondhand Marketplace",
        language: "Flutter",
        platform: "Mobile",
        description:
            "Buyer-to-seller marketplace with listings, real-time chat between the two parties, and location-based search, backed by Firestore and Firebase Auth.",
        stack: ["Flutter", "Dart", "Firebase"],
    },
    {
        title: "Order Tracking System",
        language: "Java",
        platform: "Desktop",
        description:
            "Models an order's lifecycle from placement to delivery as a state machine, so a status change can never skip a stage or fire a notification twice.",
        stack: ["Java", "OOP"],
    },
    {
        title: "Tuition Centre Management",
        language: "Python",
        platform: "Desktop",
        description:
            "Enrolment, timetabling, and fee tracking for a tuition centre — assigns tutors to classes without clashing a room or a timeslot.",
        stack: ["Python"],
    },
    {
        title: "Esports Championship Manager",
        language: "C++",
        platform: "Console",
        description:
            "Tournament engine handling team registration, seeding, bracket generation, and match progression, built on hand-rolled queues and linked structures.",
        stack: ["C++", "Data Structures"],
    },
    {
        title: "Retail Trends Analysis",
        language: "R",
        platform: "Analysis",
        description:
            "Statistical exploration of a large retail dataset — cleaning, hypothesis testing, and visualising the seasonal patterns that survived the testing.",
        stack: ["R", "ggplot2", "Statistics"],
    },
];

export function Projects() {
    // The first row starts open so the expand affordance is visible without a click.
    const [open, setOpen] = useState<string | null>(projects[0].title);

    return (
        <section id="work" className="section">
            <SectionBar number="02" label="Work">
                <span className="label">{projects.length} projects</span>
            </SectionBar>

            <div className="frame">
                {projects.map((project, index) => {
                    const isOpen = open === project.title;
                    const panelId = `work-panel-${index}`;

                    return (
                        <Reveal key={project.title} delay={Math.min(index, 3) * 60}>
                            <div className="work-row" data-open={isOpen}>
                                <button
                                    type="button"
                                    className="work-toggle"
                                    aria-expanded={isOpen}
                                    aria-controls={panelId}
                                    onClick={() => setOpen(isOpen ? null : project.title)}
                                >
                                    <div className="flex items-start justify-between gap-5">
                                        <div className="flex min-w-0 items-start gap-4 md:gap-6">
                                            <span className="work-index pt-2.5">
                                                [{String(index + 1).padStart(2, "0")}]
                                            </span>

                                            <div className="min-w-0">
                                                <h3 className="work-title">{project.title}</h3>
                                                <ul className="mt-3.5 flex flex-wrap gap-2">
                                                    {project.stack.map((item) => (
                                                        <li key={item} className="tag">
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="flex shrink-0 items-center gap-4 pt-1.5 md:gap-6">
                                            <span className="label hidden sm:block">
                                                {project.platform}
                                            </span>
                                            <span className="work-sign" aria-hidden="true">
                                                {isOpen ? "−" : "+"}
                                            </span>
                                        </div>
                                    </div>
                                </button>

                                {isOpen && (
                                    <div id={panelId} className="work-panel">
                                        <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
                                            <div className="preview">
                                                {project.image ? (
                                                    <Image
                                                        src={project.image}
                                                        alt={`${project.title} screenshot`}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, 22rem"
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    // No screenshot yet — the language mark is the artwork.
                                                    <span
                                                        className="language-mark"
                                                        aria-hidden="true"
                                                    >
                                                        {project.language}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="bracket sm:hidden">
                                                    {project.platform}
                                                </p>
                                                <p className="prose-body mt-3 sm:mt-0">
                                                    {project.description}
                                                </p>

                                                {project.href && (
                                                    <a
                                                        href={project.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="link mt-5 inline-flex items-center gap-1.5"
                                                    >
                                                        View source
                                                        <ArrowUpRight
                                                            className="h-3.5 w-3.5"
                                                            strokeWidth={2}
                                                        />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Reveal>
                    );
                })}
            </div>

            <div>
                <div className="frame px-6 py-9 md:px-12">
                    <a
                        href="https://github.com/xiangzhi2003"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                    >
                        <Github className="h-4 w-4" strokeWidth={1.75} />
                        Source on GitHub
                        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
                    </a>
                </div>
            </div>
        </section>
    );
}
