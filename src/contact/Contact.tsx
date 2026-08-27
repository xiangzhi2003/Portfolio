import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/app/others/layout/Reveal";
import { SectionRail } from "@/app/others/layout/SectionRail";

const channels = [
    {
        key: "Email",
        value: "xiangzhichiang2003@gmail.com",
        href: "mailto:xiangzhichiang2003@gmail.com",
    },
    { key: "Phone", value: "+60 18-275 8288", href: "tel:+60182758288" },
    { key: "GitHub", value: "xiangzhi2003", href: "https://github.com/xiangzhi2003", external: true },
    {
        key: "LinkedIn",
        value: "xiang-zhi-chiang",
        href: "https://www.linkedin.com/in/xiang-zhi-chiang-6723a9299/",
        external: true,
    },
    { key: "Location", value: "Puchong, Selangor, Malaysia" },
];

export function Contact() {
    return (
        <>
            <section id="contact" className="section" data-band="alt">
                <div className="shell section-grid">
                    <SectionRail label="Contact" alignToText />

                    <div>
                        <Reveal>
                            <p className="prose-body">
                                If you&apos;re hiring, or you want to talk through something I&apos;ve
                                built, email is the fastest way to reach me — I reply within a day.
                            </p>
                        </Reveal>

                        <Reveal delay={80}>
                            <dl className="mt-10 border-t border-[var(--rule)]">
                                {channels.map((channel) => (
                                    <div
                                        key={channel.key}
                                        className="flex flex-col gap-1 border-b border-[var(--rule-soft)] py-4 sm:flex-row sm:items-baseline sm:gap-6"
                                    >
                                        <dt className="label sm:w-32 sm:shrink-0">{channel.key}</dt>
                                        <dd>
                                            {channel.href ? (
                                                <a
                                                    href={channel.href}
                                                    className="link inline-flex items-center gap-1.5"
                                                    {...(channel.external
                                                        ? { target: "_blank", rel: "noopener noreferrer" }
                                                        : {})}
                                                >
                                                    {channel.value}
                                                    {channel.external && (
                                                        <ArrowUpRight
                                                            className="h-3.5 w-3.5"
                                                            strokeWidth={2}
                                                        />
                                                    )}
                                                </a>
                                            ) : (
                                                <span className="text-[var(--fg-muted)]">
                                                    {channel.value}
                                                </span>
                                            )}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </Reveal>
                    </div>
                </div>
            </section>

            <footer className="border-t border-[var(--rule-soft)] py-10">
                <div className="shell flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="mono text-[var(--fg-faint)]">
                        © {new Date().getFullYear()} Chiang Xiang Zhi
                    </p>
                    <p className="mono text-[var(--fg-faint)]">
                        Next.js · Tailwind · deployed on Vercel
                    </p>
                </div>
            </footer>
        </>
    );
}
