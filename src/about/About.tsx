import { Reveal } from "@/app/others/layout/Reveal";
import { SectionRail } from "@/app/others/layout/SectionRail";
import { aboutFacts, aboutParagraphs } from "@/about/content";

export function About() {
    return (
        <section id="about" className="section" data-band="alt">
            <div className="shell section-grid">
                <SectionRail label="About" alignToText />

                <div>
                    <Reveal>
                        <div className="space-y-6">
                            {aboutParagraphs.map((text) => (
                                <p key={text.slice(0, 24)} className="prose-body">
                                    {text}
                                </p>
                            ))}
                        </div>
                    </Reveal>

                    <Reveal delay={70}>
                        <dl className="mt-10 max-w-[var(--measure)] border-t border-[var(--rule)]">
                            {aboutFacts.map((fact) => (
                                <div
                                    key={fact.key}
                                    className="flex flex-col gap-1 border-b border-[var(--rule-soft)] py-4 sm:flex-row sm:items-baseline sm:gap-6"
                                >
                                    <dt className="label sm:w-36 sm:shrink-0">{fact.key}</dt>
                                    <dd className="text-[var(--fg)]">{fact.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
