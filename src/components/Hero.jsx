import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { showreelVideo } from '../data/videos'

export default function Hero() {
    const videoRef = useRef(null)

    useEffect(() => {
        const video = videoRef.current
        if (video) {
            video.play().catch(() => {
                // Autoplay may be blocked — already muted so should be fine
            })
        }
    }, [])

    const scrollTo = (id) => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section
            id="hero"
            className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
        >
            {/* Background video */}
            <video
                ref={videoRef}
                src={showreelVideo}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: 'brightness(0.35) saturate(1.2)' }}
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 video-overlay" />

            {/* Accent grid lines */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(0,191,255,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,191,255,0.4) 1px, transparent 1px)
          `,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                {/* Eyebrow badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-semibold tracking-widest uppercase mb-6"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" />
                    Available for Projects
                </motion.div>

                {/* Name */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.35 }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-2"
                >
                    <span className="text-white">Ayoub Bouras</span>
                </motion.h1>

                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
                >
                    <span className="gradient-text">Video Editor</span>
                    <span className="text-white/70"> & Motion Designer</span>
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.65 }}
                    className="text-gray-400 text-base sm:text-lg tracking-widest uppercase font-medium mb-10"
                >
                    Reels · Promos · Educational Content
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <button
                        onClick={() => scrollTo('portfolio')}
                        className="w-full sm:w-auto px-8 py-4 bg-accent text-dark font-bold rounded-xl text-base hover:bg-accent-dark transition-all duration-200 glow hover:scale-105 active:scale-95"
                    >
                        View My Work
                    </button>
                    <button
                        onClick={() => scrollTo('contact')}
                        className="w-full sm:w-auto px-8 py-4 bg-transparent text-white font-bold rounded-xl text-base border border-white/20 hover:border-accent/60 hover:bg-white/5 transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                        Get a Quote
                    </button>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-500 text-xs tracking-widest uppercase"
            >
                <span>Scroll</span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-px h-8 bg-gradient-to-b from-accent/50 to-transparent"
                />
            </motion.div>
        </section>
    )
}
