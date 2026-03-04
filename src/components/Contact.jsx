import React, { useState } from 'react'
import { motion } from 'framer-motion'

const projectTypes = ['Social Media', 'Promotional', 'Educational', 'Other']

export default function Contact() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        projectType: 'Social Media',
        message: '',
    })
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { name, email, projectType, message } = form

        const subject = encodeURIComponent(`Portfolio Inquiry — ${projectType}`)
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\nProject Type: ${projectType}\n\nMessage:\n${message}`
        )

        window.location.href = `mailto:bourasayoub41@gmail.com?subject=${subject}&body=${body}`
        setSubmitted(true)
    }

    const contactLinks = [
        {
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            label: 'Email',
            value: 'bourasayoub41@gmail.com',
            href: 'mailto:bourasayoub41@gmail.com',
        },
        {
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            ),
            label: 'WhatsApp',
            value: '+213 778 46 08 55',
            href: 'https://wa.me/213778460855',
        },
        {
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
            ),
            label: 'Instagram',
            value: '@br_.ayoub',
            href: 'https://www.instagram.com/br_.ayoub',
        },
        {
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.7a8.18 8.18 0 004.77 1.52V6.78a4.85 4.85 0 01-1-.09z" />
                </svg>
            ),
            label: 'TikTok',
            value: '@br_ayoub',
            href: 'https://www.tiktok.com/@br_ayoub',
        },
    ]

    return (
        <section id="contact" className="py-24 md:py-32 relative bg-card/30">
            {/* Glow bg */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2" />
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">Get In Touch</p>
                    <h2 className="text-4xl md:text-5xl font-black text-white">Let's Work Together</h2>
                    <div className="mt-4 mx-auto w-16 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" />
                    <p className="mt-6 text-gray-400 max-w-xl mx-auto">
                        Have a project in mind? Send me a message and I'll get back to you with a custom quote.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-3"
                    >
                        {submitted ? (
                            <div className="glass rounded-2xl p-10 flex flex-col items-center justify-center text-center min-h-[400px]">
                                <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                                <p className="text-gray-400">Your email client should have opened. I'll get back to you ASAP.</p>
                                <button
                                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', projectType: 'Social Media', message: '' }) }}
                                    className="mt-6 px-6 py-2.5 rounded-lg border border-accent/40 text-accent hover:bg-accent/10 transition-colors text-sm font-semibold"
                                >
                                    Send Another
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8 space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-1.5">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Your name"
                                            className="w-full px-4 py-3 bg-dark/80 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-accent transition-colors text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-1.5">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="your@email.com"
                                            className="w-full px-4 py-3 bg-dark/80 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-accent transition-colors text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-1.5">Project Type</label>
                                    <select
                                        name="projectType"
                                        value={form.projectType}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-dark/80 border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent transition-colors text-sm appearance-none cursor-pointer"
                                    >
                                        {projectTypes.map((t) => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-1.5">Message</label>
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        placeholder="Tell me about your project..."
                                        className="w-full px-4 py-3 bg-dark/80 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-accent transition-colors text-sm resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-accent text-dark font-bold rounded-xl hover:bg-accent-dark transition-all duration-200 glow hover:scale-[1.02] active:scale-[0.98] text-base"
                                >
                                    Send Message
                                </button>
                            </form>
                        )}
                    </motion.div>

                    {/* Contact info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-2 flex flex-col gap-4"
                    >
                        <div className="glass rounded-2xl p-6 mb-2">
                            <h3 className="text-white font-bold text-lg mb-1">Ayoub</h3>
                            <p className="text-gray-400 text-sm">Freelance Video Editor</p>
                            <p className="text-gray-500 text-xs mt-1">Based in Algeria · Available Worldwide</p>
                        </div>

                        {contactLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target={link.label !== 'Email' ? '_blank' : undefined}
                                rel="noreferrer"
                                className="glass rounded-xl p-4 flex items-center gap-4 hover:border-accent/30 hover:bg-accent/5 transition-all duration-200 group"
                            >
                                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors shrink-0">
                                    {link.icon}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-gray-500 text-xs font-medium">{link.label}</p>
                                    <p className="text-white text-sm font-semibold truncate group-hover:text-accent transition-colors">
                                        {link.value}
                                    </p>
                                </div>
                                <svg className="w-4 h-4 text-gray-600 group-hover:text-accent ml-auto shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
