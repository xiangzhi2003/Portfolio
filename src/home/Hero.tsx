import Image from "next/image";
import { ArrowDown } from "lucide-react";

/*
  The hero states the facts a recruiter scans for — availability, degree, most
  recent role — as a spec block rather than a tagline. Availability sits in its
  own strip at the very top because it's the single most useful thing on the
  page for someone deciding whether to keep reading.
*/
const facts = [
    {
        key: "degree",
        value: "BSc (Hons) Software Engineering",
        meta: "Asia Pacific University — CGPA 3.42, Second Upper",
    },
    {
        key: "recent role",
        value: "Software IT Intern",
        meta: "IJM Corporation — Flutter",
    },
    {
        key: "languages",
        value: "English, Chinese",
        meta: "Malay, Cantonese",
    },
];

export function Hero() {
    return (
        <header id="home" className="hero">
            {/* Availability hard left, location hard right, spanning the page. */}
            <div className="status-strip rise" style={{ animationDelay: "0ms" }}>
                <div className="status-strip-inner">
                    <span className="label flex items-center gap-2.5 text-[var(--fg)]">
                        <span className="dot" aria-hidden="true" />
                        Available for work
                    </span>
                    <span className="label">Puchong, Selangor · MY</span>
                </div>
            </div>

            <div className="frame px-6 pt-20 pb-16 md:px-12 md:pt-28 md:pb-20">
                <p className="label rise" style={{ animationDelay: "60ms" }}>
                    Software Engineer
                </p>

                {/*
                  Set over three deliberate lines, each word owning one, with
                  tight leading. Resize with --text-display; because the break
                  points are explicit it can't wrap unpredictably or overflow.
                */}
                <div className="rise-mask mt-5">
                    <h1
                        className="display display-name text-[length:var(--text-display)]"
                        style={{ animationDelay: "120ms" }}
                    >
                        Chiang
                        <br />
                        Xiang
                        <br />
                        Zhi
                    </h1>
                </div>

                <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-start md:gap-12">
                    <div
                        className="rise relative h-40 w-40 shrink-0 overflow-hidden rounded-2xl sm:h-48 sm:w-48"
                        style={{ animationDelay: "200ms" }}
                    >
                        <Image
                            src="/profile.jpg"
                            alt="Chiang Xiang Zhi"
                            fill
                            sizes="(max-width: 640px) 160px, 192px"
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Prose tier: capped at --measure so the line length stays readable. */}
                    <p
                        className="rise prose-body flex-1"
                        style={{ animationDelay: "260ms" }}
                    >
                        Full Stack Software engineer and recent graduate with a strong focus on applied AI.
                        I design and deliver production-ready applications end to end,
                        integrating large language models and retrieval-augmented search to
                        solve real user problems. Seeking a full-time role where I can build
                        scalable, AI-driven products.
                    </p>
                </div>

                <div
                    className="rise mt-10 flex flex-wrap items-center gap-3"
                    style={{ animationDelay: "320ms" }}
                >
                    <a href="#work" className="btn btn-primary">
                        See the work
                        <ArrowDown className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </a>
                    <a href="/Final%20Resume%20Chiang%20Xiang%20Zhi.pdf" className="btn" download>
                        Resume
                    </a>
                </div>
            </div>

            {/* Fact grid — separated by gaps, not dividers. */}
            <div className="frame grid grid-cols-1 gap-8 px-6 pt-4 md:grid-cols-3 md:gap-10 md:px-12">
                {facts.map((fact) => (
                    <div key={fact.key}>
                        <p className="bracket">{fact.key}</p>
                        <p className="mt-2.5 text-[var(--fg)]">{fact.value}</p>
                        <p className="mono mt-1 text-[var(--fg-faint)]">{fact.meta}</p>
                    </div>
                ))}
            </div>

            <div className="frame scroll-cue px-6 py-6 md:px-12">
                <span className="label">Scroll</span>
            </div>
        </header>
    );
}
