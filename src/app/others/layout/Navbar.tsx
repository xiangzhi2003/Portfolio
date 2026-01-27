"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useSmoothScroll } from "@/app/others/providers/SmoothScrollProvider";

const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Timeline", href: "#timeline" },
    { name: "Contact", href: "#contact" },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const { scrollTo } = useSmoothScroll();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            if (window.scrollY < 100) {
                setActiveSection("home");
                return;
            }

            const sections = navLinks.map(link => link.href.slice(1));
            for (const section of [...sections].reverse()) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetId = href.slice(1);

        if (targetId === "home") {
            scrollTo(0, { offset: 0, duration: 1.2 });
            setActiveSection("home");
        } else {
            const element = document.getElementById(targetId);
            if (element) {
                scrollTo(element, { offset: -80, duration: 1.2 });
            }
        }
        setMobileMenuOpen(false);
    };

    const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        window.location.href = "/";
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? "bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-slate-800/50"
                    : "bg-transparent"
                    }`}
            >
                <div className="flex items-center justify-between px-8 md:px-16 lg:px-24 h-16 md:h-20">
                    {/* Logo - Refreshes page */}
                    <motion.a
                        href="/"
                        onClick={handleLogoClick}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl md:text-3xl font-bold text-white hover:text-blue-400 transition-colors duration-300"
                    >
                        C
                    </motion.a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-10 lg:gap-14">
                        {navLinks.map((link, index) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
                                className={`text-sm tracking-[0.2em] uppercase transition-colors duration-300 ${activeSection === link.href.slice(1)
                                    ? "text-blue-400"
                                    : "text-slate-400 hover:text-white"
                                    }`}
                            >
                                {link.name}
                            </motion.a>
                        ))}
                    </div>

                    {/* Mobile: Menu Button */}
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </motion.button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 md:hidden"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute right-0 top-0 bottom-0 w-3/4 max-w-sm bg-[#0a0a0a] border-l border-slate-800 shadow-2xl"
                        >
                            <div className="flex flex-col h-full pt-24 px-8 pb-8">
                                <nav className="flex-1 space-y-1">
                                    {navLinks.map((link, index) => (
                                        <motion.a
                                            key={link.name}
                                            href={link.href}
                                            onClick={(e) => scrollToSection(e, link.href)}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.08 }}
                                            className={`block px-4 py-4 text-lg font-medium tracking-[0.15em] uppercase border-b border-slate-800 transition-colors ${activeSection === link.href.slice(1)
                                                ? "text-blue-400"
                                                : "text-slate-400 hover:text-white"
                                                }`}
                                        >
                                            {link.name}
                                        </motion.a>
                                    ))}
                                </nav>

                                <div className="pt-6 border-t border-slate-800">
                                    <p className="text-sm text-slate-500">
                                        &copy; {new Date().getFullYear()} Chiang Xiang Zhi
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
