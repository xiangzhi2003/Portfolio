"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Briefcase,
    GraduationCap,
    Award,
    Users,
    Calendar,
    MapPin,
    ArrowRight,
    Shield,
    LucideIcon,
} from "lucide-react";

interface Experience {
    type: "work" | "education" | "achievement" | "activity";
    title: string;
    organization: string;
    location?: string;
    period: string;
    description: string;
    skills: string[];
    icon: LucideIcon;
    color: string;
    current: boolean;
}

const experiences: Experience[] = [
    {
        type: "work",
        title: "Software Engineering Intern",
        organization: "IJM Corporation",
        location: "Malaysia",
        period: "July 2025 - Nov 2025",
        description:
            "Developing software solutions and collaborating with the engineering team on enterprise applications.",
        skills: ["Flutter", "Dart", ".NET", "Agile"],
        icon: Briefcase,
        color: "from-blue-500 to-cyan-500",
        current: true,
    },
    {
        type: "education",
        title: "BSc (Hons) Software Engineering",
        organization: "Asia Pacific University (APU)",
        location: "Kuala Lumpur",
        period: "Current • GPA: 3.3",
        description:
            "Studying software engineering principles, data structures, algorithms, and modern development practices.",
        skills: ["Software Design", "Algorithms", "Data Structures"],
        icon: GraduationCap,
        color: "from-purple-500 to-indigo-500",
        current: true,
    },
    {
        type: "activity",
        title: "Committee Member",
        organization: "OperationClub APU",
        period: "Current",
        description:
            "Organizing events, workshops, and community initiatives. Developing leadership and teamwork skills.",
        skills: ["Leadership", "Event Planning", "Teamwork"],
        icon: Users,
        color: "from-pink-500 to-rose-500",
        current: true,
    },
    {
        type: "achievement",
        title: "Top 10 Finalist",
        organization: "Joget NextGenHack 2024",
        period: "2024",
        description:
            "Achieved Top 10 placement in a competitive hackathon showcasing innovative low-code solutions.",
        skills: ["Low-Code", "Innovation", "Problem Solving"],
        icon: Award,
        color: "from-amber-500 to-orange-500",
        current: false,
    },
    {
        type: "work",
        title: "Event Crew / Promoter",
        organization: "Sime Darby, Guardian, IME, Sunway Pyramid, Astro & more",
        location: "Malaysia",
        period: "2022 - 2025",
        description:
            "Assisted in event setup, registration, and logistics. Promoted products and engaged customers at brand events. Provided product demonstrations and handled inquiries with strong communication skills.",
        skills: ["Communication", "Customer Service", "Event Management"],
        icon: Briefcase,
        color: "from-teal-500 to-cyan-500",
        current: false,
    },
    {
        type: "work",
        title: "Digital Marketing Intern",
        organization: "Cereals Project",
        period: "June - Sept 2023",
        description:
            "Managed social media campaigns, created engaging content, and analyzed metrics to optimize marketing strategies.",
        skills: ["Social Media", "Content Creation", "Analytics"],
        icon: Briefcase,
        color: "from-green-500 to-emerald-500",
        current: false,
    },
    {
        type: "achievement",
        title: "Honorable Mention Award",
        organization: "International Kangaroo Math Competition",
        period: "August 2020",
        description:
            "Received Honorable Mention in the prestigious international mathematics competition, demonstrating strong analytical and problem-solving abilities.",
        skills: ["Mathematics", "Analytical Thinking", "Problem Solving"],
        icon: Award,
        color: "from-yellow-500 to-amber-500",
        current: false,
    },
    {
        type: "achievement",
        title: "Safe Internet & Cybercrime Awareness Certificate",
        organization: "Digi Yellow Heart, Bukit Kuning",
        period: "2020",
        description:
            "Completed certification program on internet safety, cybersecurity awareness, and digital responsibility.",
        skills: ["Cybersecurity", "Digital Safety", "Awareness"],
        icon: Shield,
        color: "from-indigo-500 to-blue-500",
        current: false,
    },
];

const filters = [
    { id: "all", label: "All" },
    { id: "work", label: "Work" },
    { id: "education", label: "Education" },
    { id: "achievement", label: "Achievement" },
    { id: "activity", label: "Activity" },
] as const;

type FilterType = (typeof filters)[number]["id"];

export function Timeline() {
    const [activeFilter, setActiveFilter] = useState<FilterType>("all");

    const filteredExperiences =
        activeFilter === "all"
            ? experiences
            : experiences.filter((exp) => exp.type === activeFilter);

    const handleFilterChange = (filterId: FilterType) => {
        setActiveFilter(filterId);

        gsap.registerPlugin(ScrollTrigger);
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 300);
    };

    return (
        <div className="relative py-24 px-6 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-slate-900/30" />
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl" />

            <div className="relative max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="badge-green mb-4"
                    >
                        My Journey
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Experience & <span className="gradient-text">Education</span>
                    </h2>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        My professional journey and academic achievements
                    </p>
                </motion.div>

                {/* Filter Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center mb-12"
                >
                    <div className="inline-flex p-1.5 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
                        {filters.map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => handleFilterChange(filter.id)}
                                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${activeFilter === filter.id
                                    ? "text-white"
                                    : "text-slate-400 hover:text-slate-200"
                                    }`}
                            >
                                {activeFilter === filter.id && (
                                    <motion.div
                                        layoutId="activeFilterBg"
                                        className="absolute inset-0 bg-blue-500 rounded-lg"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{filter.label}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={activeFilter}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative space-y-8"
                        >
                            {/* Vertical Line - now inside content so it matches height */}
                            <div className="absolute left-8 md:left-10 top-8 bottom-8 w-px bg-blue-500" />
                            {filteredExperiences.map((exp, index) => {
                                const Icon = exp.icon;

                                return (
                                    <motion.div
                                        key={`${exp.title}-${index}`}
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="relative flex gap-6 md:gap-8"
                                    >
                                        {/* Icon */}
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            className={`relative z-10 flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${exp.color} rounded-2xl flex items-center justify-center shadow-lg`}
                                        >
                                            <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                                        </motion.div>

                                        {/* Card */}
                                        <motion.div
                                            whileHover={{ y: -4 }}
                                            className="group flex-1 p-6 glass-card rounded-2xl transition-all duration-300 hover:border-slate-500/50 hover:shadow-lg hover:shadow-blue-500/5"
                                        >
                                            {/* Period Badge */}
                                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                                <div className="flex items-center gap-1.5 text-slate-400">
                                                    <Calendar className="w-4 h-4" />
                                                    <span className="text-sm font-medium">
                                                        {exp.period}
                                                    </span>
                                                </div>
                                                {exp.location && (
                                                    <>
                                                        <span className="text-slate-600">•</span>
                                                        <div className="flex items-center gap-1 text-slate-400">
                                                            <MapPin className="w-3.5 h-3.5" />
                                                            <span className="text-sm">{exp.location}</span>
                                                        </div>
                                                    </>
                                                )}
                                                {exp.current && (
                                                    <>
                                                        <span className="text-slate-600">•</span>
                                                        <span className="px-2 py-0.5 text-xs font-medium bg-green-500/20 text-green-400 rounded-full">
                                                            Current
                                                        </span>
                                                    </>
                                                )}
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                                                {exp.title}
                                            </h3>

                                            {/* Organization */}
                                            <p className="text-blue-400 font-semibold mb-3">
                                                {exp.organization}
                                            </p>

                                            {/* Description */}
                                            <p className="text-slate-300 leading-relaxed mb-4">
                                                {exp.description}
                                            </p>

                                            {/* Skill Tags */}
                                            <div className="flex flex-wrap gap-2">
                                                {exp.skills.map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="px-2.5 py-1 text-xs font-medium bg-slate-800/80 text-slate-300 rounded-md border border-slate-700/50 hover:border-slate-600 hover:text-slate-200 transition-colors"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Resume CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <a
                        href="/resume.pdf"
                        download
                        className="group inline-flex items-center gap-2 text-blue-400 font-medium hover:text-blue-300 transition-colors"
                    >
                        View full resume
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
