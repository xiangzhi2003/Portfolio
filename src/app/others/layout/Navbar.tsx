"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
    { name: "About", href: "#about" },
    { name: "Work", href: "#work" },
    { name: "Stack", href: "#stack" },
    { name: "Log", href: "#log" },
    { name: "Contact", href: "#contact" },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState("");

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Scroll spy: the last section whose top has passed the nav is the active one.
    useEffect(() => {
        const sections = links
            .map((link) => document.getElementById(link.href.slice(1)))
            .filter((el): el is HTMLElement => el !== null);

        const observer = new IntersectionObserver(
            (records) => {
                const visible = records
                    .filter((record) => record.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

                if (visible.length > 0) setActive(visible[0].target.id);
            },
            { rootMargin: "-20% 0px -70% 0px" },
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    // Lock the page while the mobile sheet is open.
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <nav
            className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled
                ? "bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] backdrop-blur-xl"
                : "bg-transparent"
                }`}
        >
            {/* Full width, not framed: the logo sits hard left and the links hard
                right, so the bar spans the page instead of floating centred. */}
            <div className="flex h-16 items-center justify-between px-6 md:px-12">
                <a
                    href="#home"
                    className="font-mono text-[length:var(--text-label)] tracking-[0.2em] text-[var(--fg)] transition-colors hover:text-[var(--accent)]"
                >
                    CXZ
                </a>

                <div className="hidden items-center gap-8 md:flex">
                    {links.map((link) => {
                        const isActive = active === link.href.slice(1);
                        return (
                            <a
                                key={link.name}
                                href={link.href}
                                data-active={isActive}
                                className={`label nav-link ${isActive ? "text-[var(--accent)]" : ""}`}
                            >
                                {link.name}
                            </a>
                        );
                    })}
                </div>

                <button
                    onClick={() => setOpen((value) => !value)}
                    className="-mr-2 p-2 text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)] md:hidden"
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                >
                    {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {/* Mobile sheet */}
            <div
                className={`overflow-hidden bg-[var(--bg)] transition-[max-height] duration-300 ease-out md:hidden ${open ? "max-h-96" : "max-h-0"
                    }`}
            >
                <div className="flex flex-col px-6 py-2 md:px-12">
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className={`label py-4 ${active === link.href.slice(1) ? "text-[var(--accent)]" : ""
                                }`}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
}
