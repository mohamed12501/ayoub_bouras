import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { videos } from '../data/videos'

const CATEGORIES = ['All']

const categoryColors = {
    'Social Media': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    'Promotional': 'bg-accent/20 text-accent border-accent/30',
    'Educational': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
}

function VideoCard({ video, onOpen }) {
    const videoRef = useRef(null)
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        const v = videoRef.current
        if (!v) return
        if (isHovered) {
            v.currentTime = 0
            v.play().catch(() => { })
        } else {
            v.pause()
            v.currentTime = 0
        }
    }, [isHovered])

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onOpen(video)}
        >
            {/* Video preview on hover */}
            <video
                ref={videoRef}
                src={video.src}
                muted
                loop
                playsInline
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />

            {/* Category tag */}
            <div className="absolute top-3 left-3">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${categoryColors[video.category] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'}`}>
                    {video.category}
                </span>
            </div>

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0.6 }}
                    whileHover={{ scale: 1 }}
                    animate={isHovered ? { scale: 1.2, opacity: 1 } : { scale: 0.9, opacity: 0.7 }}
                    transition={{ duration: 0.2 }}
                    className="w-14 h-14 rounded-full bg-accent/90 flex items-center justify-center shadow-lg glow"
                >
                    <svg className="w-5 h-5 text-dark ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </motion.div>
            </div>

            {/* Title at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-sm font-semibold truncate">{video.title}</p>
            </div>
        </motion.div>
    )
}

function VideoModal({ video, onClose }) {
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', onKey)
        document.body.style.overflow = 'hidden'
        return () => {
            window.removeEventListener('keydown', onKey)
            document.body.style.overflow = ''
        }
    }, [onClose])

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.85, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="relative w-full max-w-4xl rounded-2xl overflow-hidden bg-card border border-accent/20"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-accent/30 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Video */}
                    <div className="aspect-video bg-black">
                        <video
                            src={video.src}
                            controls
                            autoPlay
                            className="w-full h-full"
                        />
                    </div>

                    {/* Info bar */}
                    <div className="px-5 py-4 flex items-center justify-between">
                        <div>
                            <h3 className="text-white font-bold text-lg">{video.title}</h3>
                            <span className={`mt-1 inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${categoryColors[video.category] || ''}`}>
                                {video.category}
                            </span>
                        </div>
                        <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors text-sm">
                            Close
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default function Portfolio() {
    const [activeCategory, setActiveCategory] = useState('All')
    const [selectedVideo, setSelectedVideo] = useState(null)

    const filtered = activeCategory === 'All'
        ? videos
        : videos.filter((v) => v.category === activeCategory)

    return (
        <section id="portfolio" className="py-24 md:py-32 relative bg-card/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">My Work</p>
                    <h2 className="text-4xl md:text-5xl font-black text-white">Portfolio</h2>
                    <div className="mt-4 mx-auto w-16 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" />
                </motion.div>

                {/* Filter tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-wrap items-center justify-center gap-3 mb-10"
                >
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${activeCategory === cat
                                ? 'bg-accent text-dark border-accent glow-sm'
                                : 'bg-transparent text-gray-400 border-white/10 hover:border-accent/40 hover:text-white'
                                }`}
                        >
                            {cat}
                            <span className="ml-2 text-xs opacity-60">
                                {cat === 'All' ? videos.length : videos.filter(v => v.category === cat).length}
                            </span>
                        </button>
                    ))}
                </motion.div>

                {/* Video Grid */}
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((video) => (
                            <VideoCard key={video.id} video={video} onOpen={setSelectedVideo} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
                )}
            </AnimatePresence>
        </section>
    )
}
