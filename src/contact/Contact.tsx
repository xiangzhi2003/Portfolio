"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, ArrowUpRight, Sparkles } from "lucide-react";

const contactMethods = [
    {
        icon: Mail,
        label: "Email",
        value: "xiangzhichiang2003@gmail.com",
        href: "mailto:xiangzhichiang2003@gmail.com",
        color: "from-blue-500 to-cyan-500",
        glow: "rgba(59, 130, 246, 0.3)",
    },
    {
        icon: Phone,
        label: "Phone",
        value: "+60 18-275 8288",
        href: "tel:+60182758288",
        color: "from-green-500 to-emerald-500",
        glow: "rgba(34, 197, 94, 0.3)",
    },
    {
        icon: MapPin,
        label: "Location",
        value: "Puchong, Selangor, Malaysia",
        href: "https://maps.google.com/?q=Puchong,Selangor,Malaysia",
        color: "from-purple-500 to-pink-500",
        glow: "rgba(168, 85, 247, 0.3)",
    },
];

const socialLinks = [
    {
        icon: Github,
        label: "GitHub",
        username: "@xiangzhi2003",
        href: "https://github.com/xiangzhi2003",
    },
    {
        icon: Linkedin,
        label: "LinkedIn",
        username: "Xiang Zhi Chiang",
        href: "https://www.linkedin.com/in/xiang-zhi-chiang-6723a9299/",
    },
];

export function Contact() {
    return (
        <section className="relative py-24 px-4 md:px-6 overflow-hidden min-h-screen flex items-center justify-center">
            {/* Enhanced cosmic background for contact */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/30 to-slate-900/50" />
            <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse-slow" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-[80px] animate-pulse-slow" style={{ animationDelay: "4s" }} />

            <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center">
                {/* Header - Centered */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 w-full flex flex-col items-center"
                >
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center justify-center gap-2 badge-pink mb-4"
                    >
                        <Sparkles className="w-4 h-4" />
                        Get In Touch
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-glow-strong text-center">
                        Let&apos;s <span className="gradient-text">Connect</span>
                    </h2>
                    <p className="text-lg md:text-xl text-slate-300 max-w-xl text-center" style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)" }}>
                        I&apos;m always open to new opportunities and collaborations
                    </p>
                </motion.div>

                {/* Contact Grid - Equal height cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full">
                    {contactMethods.map((method, index) => {
                        const Icon = method.icon;
                        return (
                            <motion.a
                                key={method.label}
                                href={method.href}
                                target={method.label === "Location" ? "_blank" : undefined}
                                rel={method.label === "Location" ? "noopener noreferrer" : undefined}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="group relative p-6 md:p-8 glass-card-cosmic rounded-2xl transition-all duration-300 block border border-slate-700/50 hover:border-slate-500/50 h-[200px] flex flex-col justify-center"
                                style={{
                                    boxShadow: `0 4px 30px rgba(0, 0, 0, 0.3)`,
                                }}
                            >
                                {/* Hover Glow */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${method.color} rounded-2xl opacity-0 group-hover:opacity-15 transition-opacity duration-300 pointer-events-none`}
                                />
                                <div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                    style={{
                                        boxShadow: `0 0 40px ${method.glow}, inset 0 0 20px ${method.glow}`,
                                    }}
                                />

                                <div className="relative text-center flex flex-col items-center justify-center">
                                    <div
                                        className={`w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}
                                        style={{
                                            boxShadow: `0 4px 20px ${method.glow}`,
                                        }}
                                    >
                                        <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                                    </div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-2 font-medium">
                                        {method.label}
                                    </p>
                                    <p
                                        className="font-semibold text-white text-xs md:text-sm break-all md:break-normal px-2"
                                        style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)" }}
                                    >
                                        {method.value}
                                    </p>
                                </div>
                            </motion.a>
                        );
                    })}
                </div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16 w-full"
                >
                    {socialLinks.map((link, index) => {
                        const Icon = link.icon;
                        return (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.03, y: -4 }}
                                className="group flex items-center gap-4 px-8 py-5 glass-card-cosmic rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 w-full sm:w-auto"
                                style={{
                                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                                }}
                            >
                                <div className="p-3 bg-slate-800/80 rounded-xl group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
                                    <Icon className="w-6 h-6 text-slate-300 group-hover:text-white transition-colors" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-white text-lg">
                                        {link.label}
                                    </p>
                                    <p className="text-sm text-slate-400">
                                        {link.username}
                                    </p>
                                </div>
                                <ArrowUpRight className="w-6 h-6 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                            </motion.a>
                        );
                    })}
                </motion.div>

                {/* Footer - Centered copyright only */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-12 pt-8 border-t border-slate-700/50 w-full"
                >
                    <p className="text-slate-400 text-sm text-center">
                        &copy; {new Date().getFullYear()} Chiang Xiang Zhi. All rights reserved.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
