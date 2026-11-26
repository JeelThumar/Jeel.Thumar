import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Socials from './Socials';
import Sticker from './Sticker';
import { useSiteData } from '../hooks/useSiteData';
import { Send, CheckCircle2, Loader2, Sparkles, Calendar, Mail, Phone, AlertCircle } from 'lucide-react';

const DEFAULT_ENDPOINT =
    'https://script.google.com/macros/s/AKfycbyPwH_oRCs-JkJi8xWQUY7ZQB3aGVMOlzIpbpZGjbEKOszSMEsn2ykMJiGl7Oq4IwON/exec';

const Contact = () => {
    const { data } = useSiteData();
    const profile = data.profile || {};
    const contactEmail = profile.email || 'jeelthumar26@gmail.com';
    const contactPhone = profile.phone || '+91 94087 75849';
    const bookingCalendar = profile.bookingCalendar || 'https://calendar.app.google/BJ74XypnEoatDzvZ8';
    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT || DEFAULT_ENDPOINT;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (status === 'error') {
            setStatus('idle');
            setErrorMessage('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (status === 'submitting') return;
        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

        setStatus('submitting');
        setErrorMessage('');

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { "Content-Type": "text/plain" },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            let confirmed = false;
            const contentType = response.headers.get('content-type') || '';
            if (contentType.includes('application/json')) {
                const payload = await response.json();
                confirmed =
                    payload?.success === true ||
                    payload?.status === 'success' ||
                    payload?.result === 'success';
            } else {
                const text = await response.text();
                try {
                    const parsed = JSON.parse(text);
                    confirmed =
                        parsed?.success === true ||
                        parsed?.status === 'success' ||
                        parsed?.result === 'success';
                } catch {
                    confirmed = false;
                }
            }

            if (!confirmed) {
                throw new Error('Delivery was not confirmed by server');
            }

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
            setErrorMessage(
                'Could not confirm delivery right now. Your message is safe below — you can retry or email me directly.'
            );
        }
    };

    const mailtoFallback = `mailto:${contactEmail}?subject=${encodeURIComponent(
        `Portfolio Enquiry from ${formData.name || 'Visitor'}`
    )}&body=${encodeURIComponent(formData.message || '')}`;

    return (
        <section id="contact" className="py-10 sm:py-12 px-5 sm:px-6 relative overflow-x-clip text-black mt-10 sm:mt-20">
            {/* Decorative Elements */}
            <Sticker className="hidden md:block top-[-2%] right-[5%] text-black z-20" rotation={10}>
                <div className="bg-yellow-400 text-black font-bold text-xs p-3 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center gap-1">
                    <Sparkles size={14} />
                    <span>SAY HELLO!</span>
                </div>
            </Sticker>

            <Sticker className="hidden md:block top-[0%] left-[5%] text-black z-20" rotation={-10}>
                <div className="bg-purple-700 text-white font-bold text-xs p-2 rounded shadow-[2px_2px_0px_0px_#000]">
                    OPEN FOR WORK
                </div>
            </Sticker>

            <div className="max-w-4xl w-full mx-auto relative z-10">
                <div className="bg-white px-5 py-10 sm:px-8 md:p-12 rounded-lg border-2 border-black shadow-[5px_5px_0px_0px_#000] md:shadow-[8px_8px_0px_0px_#000] relative">
                    {/* Notebook Spiral */}
                    <div className="absolute top-0 left-0 w-full h-8 flex justify-evenly -mt-4 pointer-events-none">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="w-4 h-8 bg-[#eee] rounded-full ring-2 ring-black bg-[linear-gradient(45deg,transparent_40%,#bbb_40%,#bbb_60%,transparent_60%)] shadow-sm"></div>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Left Side: Header & Info */}
                        <div className="flex flex-col justify-between">
                            <div className="text-left space-y-4">
                                <h2 className="text-4xl md:text-5xl font-syne font-bold leading-tight text-black">
                                    Let's Start a <br />
                                    <span className="text-purple-600 relative inline-block">
                                        Project
                                        <svg className="absolute w-full h-3 -bottom-1 left-0 text-yellow-400 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                                        </svg>
                                    </span>
                                </h2>
                                <p className="text-base md:text-lg text-black/65 font-medium leading-relaxed">
                                    Have a product idea, complex workflow, or design system challenge? Reach out and let's build something thoughtful together.
                                </p>
                            </div>

                            <div className="space-y-3 my-6">
                                <a
                                    href={`mailto:${contactEmail}`}
                                    className="flex items-center gap-2.5 text-sm font-mono text-black/75 hover:text-purple-600 transition-colors"
                                >
                                    <Mail size={16} className="text-purple-600 shrink-0" />
                                    <span>{contactEmail}</span>
                                </a>
                                <a
                                    href={`tel:${contactPhone.replace(/\s+/g, '')}`}
                                    className="flex items-center gap-2.5 text-sm font-mono text-black/75 hover:text-purple-600 transition-colors"
                                >
                                    <Phone size={16} className="text-purple-600 shrink-0" />
                                    <span>{contactPhone}</span>
                                </a>
                                <a
                                    href={bookingCalendar}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 self-start text-sm font-syne font-bold uppercase tracking-wider text-black/70 hover:text-purple-600 transition-colors border-b border-black/20 hover:border-purple-600 pb-1 pt-2"
                                >
                                    <Calendar size={18} />
                                    Book a Free Meeting With Me
                                </a>
                            </div>

                            <div className="hidden md:block">
                                <p className="font-mono text-xs text-black/60 mb-2 uppercase tracking-widest">Connect with me</p>
                                <Socials />
                            </div>
                        </div>

                        {/* Right Side: Interactive Form */}
                        <div className="relative">
                            <AnimatePresence mode='wait'>
                                {status === 'success' ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-green-500 bg-green-50 rounded-xl"
                                    >
                                        <div className="mb-4 bg-green-500 text-white p-4 rounded-full shadow-[4px_4px_0px_0px_#000]">
                                            <CheckCircle2 size={48} />
                                        </div>
                                        <h3 className="text-3xl font-hand mb-2">Message Sent!</h3>
                                        <p className="text-black/60 font-medium">I'll get back to you sooner than you think!</p>
                                        <button
                                            onClick={() => setStatus('idle')}
                                            className="mt-6 text-sm underline text-black/60 hover:text-black hover:no-underline transition-colors block"
                                        >
                                            Send another message
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                    >
                                        {status === 'error' && errorMessage && (
                                            <div className="p-4 rounded-lg border-2 border-red-500 bg-red-50 text-sm text-red-900 space-y-2">
                                                <div className="flex items-start gap-2 font-medium">
                                                    <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
                                                    <span>{errorMessage}</span>
                                                </div>
                                                <a
                                                    href={mailtoFallback}
                                                    className="inline-flex items-center gap-1.5 font-syne font-bold text-xs uppercase tracking-wider text-red-700 underline hover:no-underline"
                                                >
                                                    Open direct email fallback ({contactEmail})
                                                </a>
                                            </div>
                                        )}

                                        {/* Name Input */}
                                        <div className="relative group">
                                            <label className="block font-mono text-xs text-black/60 mb-1 uppercase tracking-widest">Who are you?</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="Jeel Thumar"
                                                className="w-full bg-transparent border-b-2 border-dashed border-black/20 py-2 text-xl font-hand focus:outline-none focus:border-purple-500 transition-colors placeholder:text-black/10 text-black"
                                            />
                                        </div>

                                        {/* Email Input */}
                                        <div className="relative group">
                                            <label className="block font-mono text-xs text-black/60 mb-1 uppercase tracking-widest">Your Email?</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder={contactEmail}
                                                className="w-full bg-transparent border-b-2 border-dashed border-black/20 py-2 text-xl font-hand focus:outline-none focus:border-purple-500 transition-colors placeholder:text-black/10 text-black"
                                            />
                                        </div>

                                        {/* Message Input */}
                                        <div className="relative group">
                                            <label className="block font-mono text-xs text-black/60 mb-1 uppercase tracking-widest">What's the plan?</label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={3}
                                                placeholder="Let's build something thoughtful..."
                                                className="w-full bg-transparent border-b-2 border-dashed border-black/20 py-2 text-xl font-hand focus:outline-none focus:border-purple-500 transition-colors placeholder:text-black/10 resize-none text-black"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={status === 'submitting'}
                                            className="w-full relative group overflow-hidden bg-black text-white px-6 py-4 rounded-lg font-syne font-bold text-lg uppercase tracking-wider shadow-[4px_4px_0px_0px_#8b5cf6] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#8b5cf6] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                                        >
                                            <span className="flex items-center justify-center gap-2 relative z-10">
                                                {status === 'submitting' ? (
                                                    <>
                                                        <Loader2 className="animate-spin" /> Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        Send Message <Send size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                                                    </>
                                                )}
                                            </span>
                                        </button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Mobile Socials */}
                        <div className="md:hidden mt-8 flex flex-col items-center">
                            <p className="font-mono text-xs text-black/60 mb-2 uppercase tracking-widest">Connect with me</p>
                            <Socials />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="font-mono text-black/60 text-[11px] uppercase tracking-widest">
                        © {new Date().getFullYear()} Jeel Thumar · Product Designer. All rights reserved. <br />
                        Designed & Built with 💛
                    </p>
                </div>
            </div>
        </section>
    );
};
export default Contact;
