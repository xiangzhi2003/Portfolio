import Image from "next/image";
import { ArrowDown } from "lucide-react";

/*
  The hero states the three facts a recruiter actually scans for — what he's
  doing now, what he's studying, what he builds with — as a spec block rather
  than a tagline. No gradient, no orbit, no scroll hijack.
*/
const status = [
    { key: "Status", value: "Open to graduate software engineering roles", meta: "Available now" },
    { key: "Degree", value: "BSc (Hons) Software Engineering, Asia Pacific University", meta: "2026 · GPA 3.66 - Waiting for final CGPA" },
    { key: "Recent", value: "Software Engineering Intern, IJM Corporation", meta: "2025" },
    { key: "Based", value: "Puchong, Selangor · Malaysia", meta: "GMT+8" },
];

export function Hero() {
    return (
        <header id="home" className="hero shell pt-32 pb-20 md:pt-44 md:pb-28">
            <p className="label rise" style={{ animationDelay: "0ms" }}>
                Software Engineer
            </p>

            {/*
              The name gets its own full-width row so it can run as large as the
              page allows. --text-display is tuned to stay on one line from 320px
              up; change that token to resize it.
            */}
            <div className="rise-mask mt-4">
                <h1
                    className="display whitespace-nowrap text-[length:var(--text-display)]"
                    style={{ animationDelay: "80ms" }}
                >
                    Chiang Xiang Zhi
                </h1>
            </div>

            <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-start md:gap-12">
                <div
                    className="rise relative h-44 w-44 shrink-0 overflow-hidden rounded-xl border border-[var(--rule)] sm:h-52 sm:w-52"
                    style={{ animationDelay: "160ms" }}
                >
                    <Image
                        src="/profile.jpg"
                        alt="Chiang Xiang Zhi"
                        fill
                        sizes="(max-width: 640px) 176px, 208px"
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="rise flex-1" style={{ animationDelay: "240ms" }}>
                    <hr className="rule" />
                    <dl>
                        {status.map((row) => (
                            <div
                                key={row.key}
                                className="flex flex-col gap-1 border-b border-[var(--rule-soft)] py-4 sm:flex-row sm:items-baseline sm:gap-6"
                            >
                                <dt className="label sm:w-24 sm:shrink-0">{row.key}</dt>
                                <dd className="flex-1 text-[var(--fg)]">{row.value}</dd>
                                <dd className="mono shrink-0 text-[var(--fg-faint)] sm:max-w-[16rem] sm:text-right">
                                    {row.meta}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>

            {/*
              Runs the full shell width rather than prose-body's usual 62ch —
              this line sits alone in an open row, so capping it left it
              looking stranded instead of readable.
            */}
            <p
                className="rise prose-body mt-10 !max-w-none"
                style={{ animationDelay: "320ms" }}
            >
                I build the unglamorous software that organisations actually run on —
                point-of-sale, inventory, enrolment, order tracking — and I pick the stack
                to fit the problem rather than the other way around.
            </p>

            <div
                className="rise mt-10 flex flex-wrap items-center gap-3"
                style={{ animationDelay: "400ms" }}
            >
                <a href="#work" className="btn btn-primary">
                    See the work
                    <ArrowDown className="h-3.5 w-3.5" strokeWidth={2.5} />
                </a>
                <a href="mailto:xiangzhichiang2003@gmail.com" className="btn">
                    Email me
                </a>
                <a href="/resume.pdf" className="btn" download>
                    Resume
                </a>
            </div>
        </header>
    );
}
