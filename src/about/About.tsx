import { Reveal } from "@/app/others/layout/Reveal";
import { aboutFacts, aboutParagraphs, aboutQuote } from "@/about/content";

export function About() {
    // The hover texture lives on the section, not the framed content inside it,
    // so it fills the full viewport width instead of stopping at the frame edge.
    //
    // No section header here: the bracket labels below already say what each
    // column is, so a heading was just repeating itself. This section also runs
    // shorter than the rest, since it carries less to read.
    return (
        <section
            id="about"
            className="section hover-texture"
            data-band="alt"
            data-size="sm"
        >
            {/* Philosophy left, background right, separated by space. */}
            <div className="split">
                <div>
                    <Reveal>
                        <p className="bracket">philosophy</p>
                        <blockquote className="quote mt-7">{aboutQuote}</blockquote>
                    </Reveal>
                </div>

                <div>
                    <Reveal delay={80}>
                        <p className="bracket">background</p>

                        <div className="mt-7 space-y-5">
                            {aboutParagraphs.map((text) => (
                                <p key={text.slice(0, 24)} className="prose-body">
                                    {text}
                                </p>
                            ))}
                        </div>

                        <dl className="mt-12 space-y-1">
                            {aboutFacts.map((fact) => (
                                <div
                                    key={fact.key}
                                    className="flex flex-col gap-1 py-2 sm:flex-row sm:items-baseline sm:gap-6"
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
