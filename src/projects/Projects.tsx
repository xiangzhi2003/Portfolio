"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Github,
    ArrowUpRight,
    Utensils,
    ShoppingBag,
    Package,
    BarChart3,
    GraduationCap,
    Gamepad2,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const projects = [
    {
        title: "Restaurant Management System",
        description:
            "Desktop application for restaurant operations including orders, inventory, and staff management with real-time analytics.",
        tech: ["C#", "WinForms", "LocalDB", ".NET"],
        gradient: "from-orange-500 to-red-500",
        bgGradient: "from-orange-500/20 via-red-500/10 to-orange-600/20",
        icon: Utensils,
    },
    {
        title: "Secondhand Marketplace App",
        description:
            "Mobile app connecting buyers and sellers with real-time messaging, secure transactions, and location-based search.",
        tech: ["Flutter", "Firebase", "Dart"],
        gradient: "from-blue-500 to-cyan-500",
        bgGradient: "from-blue-500/20 via-cyan-500/10 to-blue-600/20",
        icon: ShoppingBag,
    },
    {
        title: "Order Tracking System",
        description:
            "OOP system for tracking customer orders through various stages from placement to delivery with notifications.",
        tech: ["Java", "OOP"],
        gradient: "from-purple-500 to-pink-500",
        bgGradient: "from-purple-500/20 via-pink-500/10 to-purple-600/20",
        icon: Package,
    },
    {
        title: "Data Analytics Project",
        description:
            "Statistical analysis and data visualization exploring trends and patterns in large datasets with interactive reports.",
        tech: ["R", "Statistics"],
        gradient: "from-green-500 to-emerald-500",
        bgGradient: "from-green-500/20 via-emerald-500/10 to-green-600/20",
        icon: BarChart3,
    },
    {
        title: "Tuition Centre Management",
        description:
            "System for student enrollment, class schedules, tutor assignments, and fee tracking for educational institutions.",
        tech: ["Python"],
        gradient: "from-yellow-500 to-orange-500",
        bgGradient: "from-yellow-500/20 via-orange-500/10 to-yellow-600/20",
        icon: GraduationCap,
    },
    {
        title: "Esports Championship Manager",
        description:
            "Tournament management handling team registrations, match scheduling, bracket generation, and live scores.",
        tech: ["C++", "Algorithms"],
        gradient: "from-red-500 to-purple-500",
        bgGradient: "from-red-500/20 via-purple-500/10 to-red-600/20",
        icon: Gamepad2,
    },
];

export function Projects() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section id="projects" className="relative py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-background" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />
            <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="badge-purple mb-4"
                    >
                        Portfolio
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        A selection of projects that showcase my skills and experience
                    </p>
                </motion.div>

                {/* 3D Coverflow Slider */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    {/* Custom Navigation Buttons */}
                    <button
                        className="swiper-button-prev-custom absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-slate-900/90 backdrop-blur-md border border-slate-600 rounded-full flex items-center justify-center text-white hover:bg-slate-800 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-7 h-7" />
                    </button>
                    <button
                        className="swiper-button-next-custom absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-slate-900/90 backdrop-blur-md border border-slate-600 rounded-full flex items-center justify-center text-white hover:bg-slate-800 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-7 h-7" />
                    </button>

                    <Swiper
                        modules={[Navigation, Pagination, EffectCoverflow]}
                        effect="coverflow"
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={1.2}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 200,
                            modifier: 2,
                            slideShadows: false,
                        }}
                        navigation={{
                            prevEl: ".swiper-button-prev-custom",
                            nextEl: ".swiper-button-next-custom",
                        }}
                        pagination={{
                            clickable: true,
                            el: ".swiper-pagination-custom",
                        }}
                        onSlideChange={(swiper: SwiperType) => setActiveIndex(swiper.activeIndex)}
                        breakpoints={{
                            640: {
                                slidesPerView: 1.5,
                            },
                            1024: {
                                slidesPerView: 2.2,
                            },
                        }}
                        className="py-12"
                    >
                        {projects.map((project, index) => {
                            const IconComponent = project.icon;
                            const isActive = index === activeIndex;
                            return (
                                <SwiperSlide key={project.title}>
                                    <div
                                        className={`group relative transition-all duration-500 ${isActive ? "scale-100" : "scale-95 opacity-70"
                                            }`}
                                    >
                                        {/* Glow Effect for Active Card */}
                                        <div
                                            className={`absolute -inset-1 bg-gradient-to-r ${project.gradient} rounded-3xl blur-xl transition-opacity duration-500 ${isActive ? "opacity-30" : "opacity-0"
                                                }`}
                                        />

                                        {/* Widget Card - Horizontal Rectangle */}
                                        <div
                                            className={`relative glass-card rounded-3xl overflow-hidden border transition-all duration-500 ${isActive
                                                ? "border-slate-500/50 shadow-2xl"
                                                : "border-slate-700/50"
                                                }`}
                                        >
                                            <div className="flex flex-col md:flex-row">
                                                {/* Left Side - Icon & Visual */}
                                                <div className="relative w-full md:w-72 h-48 md:h-auto md:min-h-[220px] flex-shrink-0 overflow-hidden">
                                                    {/* Gradient Background */}
                                                    <div
                                                        className={`absolute inset-0 bg-gradient-to-br ${project.bgGradient}`}
                                                    />

                                                    {/* Animated Mesh Pattern */}
                                                    <div
                                                        className="absolute inset-0 opacity-40"
                                                        style={{
                                                            backgroundImage: `
                                linear-gradient(135deg, transparent 25%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.05) 75%)
                              `,
                                                            backgroundSize: "40px 40px",
                                                        }}
                                                    />

                                                    {/* Floating Orbs */}
                                                    <div
                                                        className={`absolute top-6 right-6 w-32 h-32 bg-gradient-to-br ${project.gradient} rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-700`}
                                                    />
                                                    <div
                                                        className={`absolute bottom-6 left-6 w-20 h-20 bg-gradient-to-br ${project.gradient} rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700`}
                                                    />

                                                    {/* Center Icon with 3D Effect */}
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div
                                                            className={`relative p-6 bg-gradient-to-br ${project.gradient} rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105`}
                                                            style={{
                                                                boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5)`,
                                                            }}
                                                        >
                                                            <IconComponent className="w-12 h-12 text-white drop-shadow-lg" />
                                                        </div>
                                                    </div>

                                                    {/* Shine Effect */}
                                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                                </div>

                                                {/* Right Side - Content */}
                                                <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                                                    {/* Project Number */}
                                                    <span
                                                        className={`text-xs font-bold tracking-widest mb-3 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}
                                                    >
                                                        PROJECT {String(index + 1).padStart(2, "0")}
                                                    </span>

                                                    {/* Title */}
                                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-blue-100 transition-colors duration-300">
                                                        {project.title}
                                                    </h3>

                                                    {/* Description */}
                                                    <p className="text-slate-400 text-sm md:text-base mb-5 leading-relaxed">
                                                        {project.description}
                                                    </p>

                                                    {/* Tech Stack */}
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.tech.map((t) => (
                                                            <span
                                                                key={t}
                                                                className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all duration-300 ${isActive
                                                                    ? "bg-slate-800/80 text-white border-slate-600"
                                                                    : "bg-slate-800/50 text-slate-400 border-slate-700/50"
                                                                    } hover:border-slate-500 hover:text-white`}
                                                            >
                                                                {t}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>

                    {/* Custom Pagination */}
                    <div className="swiper-pagination-custom flex justify-center gap-3 mt-8" />
                </motion.div>

                {/* View More Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <a
                        href="https://github.com/xiangzhi2003"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 font-semibold rounded-full hover:shadow-lg hover:shadow-white/20 transition-all hover:scale-105"
                    >
                        <Github className="w-5 h-5" />
                        View All on GitHub
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
