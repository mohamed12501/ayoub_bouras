import React from 'react'
import { motion } from 'framer-motion'

const tools = ['Premiere Pro']
const highlights = [

    { value: '30+', label: 'Projects Delivered' },
    { value: '48h', label: 'Max Turnaround' },
]

const testimonials = [
    null,
    null,
    null,
]

export default function About() {
    return (
        <section id="about" className="py-24 md:py-32 relative">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">About Me</p>
                    <h2 className="text-4xl md:text-5xl font-black text-white">The Editor Behind the Work</h2>
                    <div className="mt-4 mx-auto w-16 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" />
                </motion.div>

                {/* Split layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left: Photo */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7 }}
                        className="relative flex justify-center lg:justify-start"
                    >
                        <div className="relative">
                            {/* Glow ring */}
                            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-accent/30 to-transparent blur-xl" />
                            {/* Image */}
                            <img
                                src="/profile_image.jpeg"
                                alt="Ayoub — Video Editor"
                                className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-2xl object-cover border-2 border-accent/30"
                            />
                            {/* Badge overlay */}
                            <div className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py-3 text-center glow-sm">
                                <p className="text-accent font-black text-xl">48h</p>
                                <p className="text-gray-400 text-xs">Max Delivery</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Bio */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7 }}
                    >
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                            Hi, I'm <span className="gradient-text">Ayoub</span>
                        </h3>
                        <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-6">
                            A freelance video editor specialized in fast-paced social media content, promotional videos,
                            and educational tech content. I work with Premiere Pro and deliver polished results within
                            <span className="text-white font-semibold"> 12 to 48 hours</span> depending on project complexity.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            {highlights.map((h) => (
                                <div key={h.label} className="glass rounded-xl p-4 text-center">
                                    <p className="text-accent font-black text-2xl sm:text-3xl">{h.value}</p>
                                    <p className="text-gray-400 text-xs mt-1">{h.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Tools */}
                        <div className="flex flex-wrap gap-2">
                            {tools.map((tool) => (
                                <span
                                    key={tool}
                                    className="px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/30 text-accent text-sm font-semibold"
                                >
                                    {tool}
                                </span>
                            ))}
                            <span className="px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-semibold flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                Available Now
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* Testimonials */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-24"
                >
                    {/* <h3 className="text-2xl font-bold text-white text-center mb-8">What Clients Say</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((_, i) => (
                            <div key={i} className="glass rounded-2xl p-6">
                               
                                <svg className="w-7 h-7 text-accent/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                               
                                <p className="text-gray-500 italic text-sm leading-relaxed mb-4">
                                    "Testimonial coming soon..."
                                </p>
                                <div className="flex items-center gap-3 mt-auto">
                                    <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-xs font-bold">
                                        ?
                                    </div>
                                    <div>
                                        <p className="text-gray-600 text-sm font-medium">Client Name</p>
                                        <p className="text-gray-700 text-xs">Testimonial coming soon</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div> */}
                </motion.div>
            </div>
        </section>
    )
}
