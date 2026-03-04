import React from 'react'
import { motion } from 'framer-motion'

const services = [
    {
        icon: '🎬',
        title: 'Video Editing',
        description: 'Clean, engaging cuts tailored to your audience. From raw footage to a polished final cut.',
    },
    {
        icon: '🎨',
        title: 'Color Grading',
        description: 'Cinematic color correction for every style — from warm filmic tones to cold commercial looks.',
    },
    {
        icon: '✨',
        title: 'Motion Graphics',
        description: 'Smooth animations and dynamic text effects crafted in Premiere Pro to elevate your content.',
    },
    {
        icon: '🔊',
        title: 'Sound Design',
        description: 'Professional audio cleanup, music sync, and sound effects that immerse your audience.',
    },
    {
        icon: '💬',
        title: 'Subtitles & Captions',
        description: 'Accurate, styled captions for any platform — boosting accessibility and retention.',
    },
    {
        icon: '📱',
        title: 'Reels & Short-form',
        description: 'Scroll-stopping content optimized for TikTok, Instagram Reels, and YouTube Shorts.',
    },
]

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
    }),
}

export default function Services() {
    return (
        <section id="services" className="py-24 md:py-32 relative">
            {/* Subtle bg accent */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/3 blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">What I Do</p>
                    <h2 className="text-4xl md:text-5xl font-black text-white">
                        Services
                    </h2>
                    <div className="mt-4 mx-auto w-16 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" />
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, i) => (
                        <motion.div
                            key={service.title}
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={cardVariants}
                            whileHover={{ y: -6, transition: { duration: 0.2 } }}
                            className="glass rounded-2xl p-6 md:p-8 group cursor-default"
                        >
                            <div className="mb-4 w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-2xl group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-300">
                                {service.icon}
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors duration-200">
                                {service.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
