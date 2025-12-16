import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Socials from './Socials';
import Sticker from './Sticker';
import { Send, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) return;

        setStatus('submitting');

        try {
            await fetch('https://script.google.com/macros/s/AKfycbyPwH_oRCs-JkJi8xWQUY7ZQB3aGVMOlzIpbpZGjbEKOszSMEsn2ykMJiGl7Oq4IwON/exec', {
                method: 'POST',
                // specific content type 'text/plain' to avoid CORS preflight checks
                headers: { "Content-Type": "text/plain" },
                body: JSON.stringify(formData)
            });

            // Google Apps Script usually returns a 200 even if logic fails, but for this simple setup we assume success if no network error.
            // With 'no-cors' or simple POST, we might not get readable JSON response depending on browser strictness, 
            // but the script provided returns simple JSON.

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });

            // Reset status after a delay
            setTimeout(() => setStatus('idle'), 5000);

        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('idle');
            // Optional: Add error state UI
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <section id="contact" className="py-12 px-4 relative overflow-visible text-black mt-20">

            {/* Decorative Elements */}
            <Sticker className="hidden md:block top-[-2%] right-[5%] text-black z-20" rotation={10}>
                <div className="bg-yellow-400 text-black font-bold text-xs p-3 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center gap-1">
                    <Sparkles size={14} />
                    <span>SAY HELLO!</span>
                </div>
            </Sticker>

            <Sticker className="top-[0%] left-[5%] text-black z-20" rotation={-10}>
                <div className="bg-purple-500 text-white font-bold text-xs p-2 rounded shadow-[2px_2px_0px_0px_#000]">
                    OPEN FOR WORK
                </div>
            </Sticker>

            <div className="max-w-4xl w-full mx-auto relative z-10">
                <div className="bg-white px-6 py-12 md:p-12 rounded-lg border-2 border-black shadow-[8px_8px_0px_0px_#000] relative">

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
                                <p className="text-lg text-black/60 font-medium">
                                    Have an idea? I'd love to help you bring it to life. Reach out and let's make something awesome together!
                                </p>
                            </div>

                            <div className="hidden md:block">
                                <p className="font-mono text-xs text-black/40 mb-4 uppercase tracking-widest">Connect with me</p>
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
                                            className="mt-6 text-sm underline text-black/40 hover:text-black hover:no-underline transition-colors block"
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
                                        <img
                                            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDdtY254a3N5eDhlbHlqZnB4eDl5eG55eDl5eG55eDl5eG55eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/l41lFj8af08kXpqta/giphy.gif" // Whimsical arrow or doodle if available, or remove
                                            alt=""
                                            className="absolute -top-10 -right-4 w-16 opacity-50 -rotate-12 pointer-events-none hidden"
                                        />

                                        {/* Name Input */}
                                        <div className="relative group">
                                            <label className="block font-mono text-xs text-black/40 mb-1 uppercase tracking-widest">Who are you?</label>
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
                                            <label className="block font-mono text-xs text-black/40 mb-1 uppercase tracking-widest">Your Email?</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="jeelthumar26@gmail.com"
                                                className="w-full bg-transparent border-b-2 border-dashed border-black/20 py-2 text-xl font-hand focus:outline-none focus:border-purple-500 transition-colors placeholder:text-black/10 text-black"
                                            />
                                        </div>

                                        {/* Message Input */}
                                        <div className="relative group">
                                            <label className="block font-mono text-xs text-black/40 mb-1 uppercase tracking-widest">What's the plan?</label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                rows={3}
                                                placeholder="Let's build something crazy..."
                                                className="w-full bg-transparent border-b-2 border-dashed border-black/20 py-2 text-xl font-hand focus:outline-none focus:border-purple-500 transition-colors placeholder:text-black/10 resize-none text-black"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={status === 'submitting'}
                                            className="w-full relative group overflow-hidden bg-black text-white px-6 py-4 rounded-lg font-syne font-bold text-lg uppercase tracking-wider shadow-[4px_4px_0px_0px_#8b5cf6] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#8b5cf6] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
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
                            <p className="font-mono text-xs text-black/40 mb-4 uppercase tracking-widest">Connect with me</p>
                            <Socials />
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="font-mono text-black/30 text-[10px] uppercase tracking-widest">
                        © {new Date().getFullYear()} Jeel Thumar. All rights reserved. <br />
                        Designed & Built with 💛
                    </p>
                </div>
            </div>
        </section>
    );
};
export default Contact;
