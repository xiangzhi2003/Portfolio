import Image from "next/image";
import { Github, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/app/others/layout/Reveal";
import { SectionRail } from "@/app/others/layout/SectionRail";

/*
  Each project is identified by the language it was built in, not by a colour
  or an icon. Scrolling the section reads as C# → Flutter → Java → Python →
  C++ → R, which is the honest through-line: the same class of problem solved
  in whatever the problem called for.

  Every row has a preview slot. Until a screenshot exists, that slot holds the
  language mark — so the layout is identical whether or not there's an image,
  and adding one is a one-line change.

    image: "/projects/restaurant.png"   drop the file in public/projects/
    href:  "https://github.com/..."     makes the whole row a link
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

function Tile({ project }: { project: Project }) {
    return (
        <>
            <div className="preview">
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        fill
                        sizes="(max-width: 640px) 100vw, 28rem"
                        className="object-cover"
                    />
                ) : (
                    // No screenshot yet — the language mark is the artwork.
                    <span className="language-mark" aria-hidden="true">
                        {project.language}
                    </span>
                )}
            </div>

            <div className="tile-body">
                <div className="flex items-center justify-between gap-3">
                    <p className="label">{project.platform}</p>
                    <p className="label text-[var(--accent)]">{project.language}</p>
                </div>

                <h3 className="tile-title mt-3 flex items-start gap-2">
                    {project.title}
                    {project.href && (
                        <ArrowUpRight
                            className="mt-1.5 h-4 w-4 shrink-0 text-[var(--fg-faint)]"
                            strokeWidth={2}
                        />
                    )}
                </h3>

                <p className="prose-body mt-3 text-[length:var(--text-ui)]">
                    {project.description}
                </p>

                <ul className="mt-auto flex flex-wrap gap-2 pt-5">
                    {project.stack.map((item) => (
                        <li key={item} className="tag">
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export function Projects() {
    return (
        <section id="work" className="section">
            <div className="shell section-grid">
                <SectionRail label="Work" meta={`${projects.length} projects`} alignToText />

                <div>
                    <Reveal>
                        <p className="prose-body">
                            Each one solves an operational problem for a real kind of
                            business, built in whatever the problem called for.
                        </p>
                    </Reveal>

                    <div className="tile-grid mt-10">
                        {projects.map((project, index) => (
                            <Reveal
                                key={project.title}
                                delay={Math.min(index, 3) * 70}
                                className="h-full"
                            >
                                {project.href ? (
                                    <a
                                        href={project.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="tile h-full"
                                    >
                                        <Tile project={project} />
                                    </a>
                                ) : (
                                    <article className="tile h-full">
                                        <Tile project={project} />
                                    </article>
                                )}
                            </Reveal>
                        ))}
                    </div>

                    <Reveal>
                        <div className="mt-10 border-t border-[var(--rule)] pt-8">
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
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
