import { Reveal } from "@/app/others/layout/Reveal";
import { SectionBar } from "@/app/others/layout/SectionBar";

const channels = [
    {
        key: "email",
        value: "xiangzhichiang2003@gmail.com",
        href: "mailto:xiangzhichiang2003@gmail.com",
    },
    { key: "phone", value: "+60 18-275 8288", href: "tel:+60182758288" },
    {
        key: "github",
        value: "github.com/xiangzhi2003",
        href: "https://github.com/xiangzhi2003",
        external: true,
    },
    {
        key: "linkedin",
        value: "linkedin.com/in/xiang-zhi-chiang",
        href: "https://www.linkedin.com/in/xiang-zhi-chiang-6723a9299/",
        external: true,
    },
];

export function Contact() {
    return (
        <>
            <section id="contact" className="section contours" data-band="alt">
                <SectionBar number="05" label="Contact" />

                <div className="split">
                    <div>
                        <Reveal>
                            <h2 className="statement">
                                Open to graduate software engineering roles.
                            </h2>
                            <p className="prose-body mt-7">
                                If you&apos;re hiring, or you want to talk through something
                                I&apos;ve built, email is the fastest way to reach me — I reply
                                within a day.
                            </p>
                        </Reveal>
                    </div>

                    <div>
                        <Reveal delay={80}>
                            <div className="flex flex-col gap-3">
                                {channels.map((channel) => (
                                    <a
                                        key={channel.key}
                                        href={channel.href}
                                        className="card"
                                        {...(channel.external
                                            ? { target: "_blank", rel: "noopener noreferrer" }
                                            : {})}
                                    >
                                        <span className="min-w-0">
                                            <span className="bracket block">{channel.key}</span>
                                            <span className="mt-2 block truncate text-[var(--fg)]">
                                                {channel.value}
                                            </span>
                                        </span>
                                        <span className="card-arrow" aria-hidden="true">
                                            →
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            <footer>
                <div className="frame flex flex-col gap-3 px-6 py-8 sm:flex-row sm:items-center sm:justify-between md:px-12">
                    <p className="label">
                        © {new Date().getFullYear()} Chiang Xiang Zhi
                    </p>
                    <p className="label">Puchong, Selangor · MY</p>
                </div>
            </footer>
        </>
    );
}
