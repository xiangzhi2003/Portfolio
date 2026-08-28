"use client";

import { useState } from "react";
import Image from "next/image";
import { Github, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/app/others/layout/Reveal";
import { SectionBar } from "@/app/others/layout/SectionBar";

/*
  One project per language, so the language mark stamped on each card actually
  means something: scrolling Work is a tour of the languages worked in, not a
  list where the same stack repeats.

  Every entry below is taken from its GitHub repository's README — descriptions,
  tech stacks, and links. Nothing here is written from memory, because the
  previous version of this list had drifted from the repos and claimed things
  the code did not do.

  The preview slot holds the language mark until a real screenshot exists, so
  the layout is identical either way and adding one is a one-line change:

    image: "/projects/unilink.png"   drop the file in public/projects/

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
    /** Repository. Adds a "View source" link inside the expanded panel. */
    href?: string;
    /**
     * A working live deployment — verify it returns 200 before adding one.
     * Two other projects have deploy URLs in their repos that now 404, so they
     * are deliberately not linked: a dead link is worse than none.
     */
    demo?: string;
}

const projects: Project[] = [
    {
        title: "UniLink",
        language: "Flutter",
        platform: "Final year project",
        description:
            "A campus marketplace and rental app gated to university email addresses, so students trade textbooks and equipment inside a community that can be verified. Three parts carry the work: an AI concierge that blends semantic search over a vector database with keyword search, an escrow vault that holds funds until handover, and a time-based QR handshake scanned in person to confirm both pickup and return.",
        stack: ["Flutter", "Dart", "Python", "FastAPI", "Supabase", "Pinecone", "Gemini", "Stripe"],
        href: "https://github.com/xiangzhi2003/UniLink---FYP",
        demo: "https://unilink-fyp-production-a474.up.railway.app/",
    },
    {
        title: "Property Management Portal",
        language: "C#",
        platform: "Web",
        description:
            "Properties, tenants, maintenance requests and payments across four separate role panels — admin, property manager, tenant, and maintenance staff — each seeing only what its role should. Sign-in runs through ASP.NET Identity or Google OAuth, and photo uploads go to S3 through a presigned URL issued by a Lambda behind API Gateway.",
        stack: ["ASP.NET Core 8", "C#", "EF Core", "PostgreSQL", "AWS Lambda", "S3", "Stripe"],
        href: "https://github.com/xiangzhi2003/PropertyManagementPortal",
    },
    {
        title: "GapMap",
        language: "TypeScript",
        platform: "Web",
        description:
            "Answers \"where should I open this business?\" from a plain-English question. The query is classified into a structured intent, nearby competitors are pulled live from Google Places, and the result comes back as red, orange and green zones with real coordinates and radii drawn onto the map. Built across eight Google Maps Platform APIs.",
        stack: ["Next.js", "React 19", "TypeScript", "Tailwind", "Gemini", "Firebase"],
        href: "https://github.com/xiangzhi2003/GapMap",
        demo: "https://gapmap.vercel.app",
    },
    {
        title: "Distributed HRM System",
        language: "Java",
        platform: "Distributed",
        description:
            "A client–server HR system where the client calls remote objects over Java RMI rather than talking to the database itself. The server exposes a remote interface, resolves authentication against Firebase, and sends notification mail over SMTP — an exercise in remote interfaces, serialization, and keeping a service usable when part of it fails.",
        stack: ["Java", "Java RMI", "Firebase", "SMTP"],
        href: "https://github.com/xiangzhi2003/BHEL-Distributed-HRM-System-Java-RMI-HR-Management",
    },
    {
        title: "E-Commerce Analysis Algorithms",
        language: "C++",
        platform: "Console",
        description:
            "Cleans and validates raw transaction and review CSVs, then analyses them twice over — once through a hand-written dynamic array and once through a linked list — so the two implementations can be measured against each other on the same sorting and searching work. No standard library containers.",
        stack: ["C++", "Data Structures", "Algorithms"],
        href: "https://github.com/xiangzhi2003/E-Commerce-Analysis-Algorithm",
    },
    {
        title: "Electric Vehicle Data Analysis",
        language: "JavaScript",
        platform: "CLI & web",
        description:
            "Processes a 3,022-record dataset of electric and plug-in vehicles under a deliberate constraint: no map, filter, reduce, or sort. Everything is written with explicit loops and mutable state, which is the point — the assignment isolates the imperative paradigm so it can be compared against a functional version of the same problem.",
        stack: ["JavaScript", "Node.js", "HTML", "CSS"],
        href: "https://github.com/xiangzhi2003/Exploring-Programming-Paradigms-with-Elective-Vehicles-and-plug-in-models-Data-",
    },
    {
        title: "Tuition Centre Management System",
        language: "Python",
        platform: "Console",
        description:
            "A command-line system for a tuition centre, built as a first-year group project. Each role signs in to its own set of functions, with records kept in plain text files rather than a database — an early exercise in structuring a program around who is using it.",
        stack: ["Python"],
        href: "https://github.com/xiangzhi2003/Tuition-Centre-Management-System",
    },
];

export function Projects() {
    // The first row starts open so the expand affordance is visible without a click.
    const [open, setOpen] = useState<string | null>(projects[0].title);

    return (
        <section id="work" className="section">
            <SectionBar label="Work">
                <span className="label">{projects.length} projects</span>
            </SectionBar>

            <div className="frame list-inset">
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
                                    {/*
                                      A grid, not a flex row: at full width the
                                      columns line up down the whole list, so it
                                      reads as a set index rather than six rows
                                      that each happen to stretch.
                                    */}
                                    <div className="work-grid">
                                        <span className="work-index">
                                            [{String(index + 1).padStart(2, "0")}]
                                        </span>

                                        <h3 className="work-title">{project.title}</h3>

                                        <ul className="work-tags">
                                            {project.stack.map((item) => (
                                                <li key={item} className="tag">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>

                                        {/*
                                          Platform, plus a "live" marker when the
                                          project has a working deployment — the
                                          strongest signal on the row, so it
                                          shows without needing to expand.
                                        */}
                                        <span className="label work-platform">
                                            {project.platform}
                                            {project.demo && (
                                                <span className="work-live">Live</span>
                                            )}
                                        </span>

                                        <span className="work-sign" aria-hidden="true">
                                            {isOpen ? "−" : "+"}
                                        </span>
                                    </div>
                                </button>

                                {isOpen && (
                                    <div id={panelId} className="work-panel">
                                        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-7">
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
                                                <p className="prose-body">
                                                    {project.description}
                                                </p>

                                                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
                                                    {project.demo && (
                                                        <a
                                                            href={project.demo}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="link inline-flex min-h-11 items-center gap-1.5"
                                                        >
                                                            Live demo
                                                            <ArrowUpRight
                                                                className="h-3.5 w-3.5"
                                                                strokeWidth={2}
                                                            />
                                                        </a>
                                                    )}

                                                    {project.href && (
                                                        <a
                                                            href={project.href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="link inline-flex min-h-11 items-center gap-1.5"
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
