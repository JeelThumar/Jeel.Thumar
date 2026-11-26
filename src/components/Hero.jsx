import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Sticker from './Sticker';
import { Star, Sparkles, Zap, ArrowDownToLine, ArrowUpRight, Briefcase, ChevronDown } from 'lucide-react';

import { useRef } from 'react';
import { useSpotlightColor } from '../context/SpotlightContext';
import { useSiteData } from '../hooks/useSiteData';

const Hero = () => {
    const sectionRef = useRef(null);
    useSpotlightColor("#a855f7", sectionRef);
    const { data } = useSiteData();

    const profile = data.profile || {};
    const resumeUrl = profile.resumePath || '/Jeel_Thumar_Resume.pdf';

    const handleDownload = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(resumeUrl);
            if (!response.ok) throw new Error('Resume fetch failed');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Jeel_Thumar_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
            window.location.href = resumeUrl;
        }
    };

    const scrollToNext = () => {
        window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
    };

    return (
        <section
            ref={sectionRef}
            className="min-h-[100dvh] flex flex-col justify-between md:justify-center items-center px-5 sm:px-8 relative text-black pt-5 pb-24 md:pt-24 md:pb-10 gap-6 md:gap-0 overflow-hidden"
        >
            {/* Desktop Decorative Stickers — strictly outer perimeter */}
            <Sticker className="hidden md:block top-[16%] left-[8%] xl:left-[12%] text-yellow-500 z-0" rotation={-15} delay={0.8}>
                <Star className="w-14 h-14" fill="currentColor" strokeWidth={2.5} />
            </Sticker>

            <Sticker className="hidden md:block top-[18%] right-[8%] xl:right-[13%] text-pink-500 z-0" rotation={22} delay={1.0}>
                <Zap className="w-11 h-11" fill="currentColor" />
            </Sticker>

            <Sticker className="hidden md:block bottom-[14%] left-[8%] xl:left-[12%] text-cyan-500 z-0" rotation={-10} delay={1.2}>
                <Sparkles className="w-12 h-12" />
            </Sticker>

            <Sticker className="hidden md:block bottom-[14%] right-[6%] xl:right-[10%] text-purple-500 z-0" rotation={8} delay={1.1}>
                <div className="bg-black text-white font-hand px-4 py-2.5 rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] text-sm">
                    Hello there! 👋
                </div>
            </Sticker>

            {/* Mobile Top Header Bar — eliminates empty top space on mobile */}
            <div className="w-full flex md:hidden items-center justify-between pt-1 relative z-10">
                <div className="flex items-center gap-2">
                    <span className="font-syne font-black text-lg tracking-tight">jeel<span className="text-purple-600">.</span></span>
                    <Star className="w-5 h-5 text-yellow-500 -rotate-12" fill="currentColor" strokeWidth={2.5} />
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-black/15 rounded-full shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-black/75">
                        Open for Work
                    </span>
                </div>
            </div>

            {/* Centerpiece Content */}
            <div className="relative z-10 text-center flex flex-col items-center w-full max-w-4xl mx-auto">
                {/* Location & Role Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="border border-black/15 bg-white/85 backdrop-blur-sm rounded-full px-3.5 sm:px-5 py-1.5 inline-flex items-center justify-center gap-2 text-[10px] sm:text-xs font-syne font-bold text-black/65 uppercase tracking-[0.12em] sm:tracking-[0.2em] mb-4 sm:mb-5 shadow-xs max-w-full"
                >
                    <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0"></span>
                    <span className="truncate">
                        {(profile.title || 'Product Designer').toUpperCase()} &middot; {(profile.location || 'Ahmedabad, India').toUpperCase()}
                    </span>
                </motion.div>

                {/* Text Lockup Container — single-line PRODUCT DESIGNER */}
                <div className="flex flex-col items-center w-full mx-auto">
                    <motion.div
                        initial={{ scale: 0.92, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full flex justify-center"
                    >
                        <h1 className="text-[clamp(4.25rem,19vw,7.75rem)] font-black font-syne leading-[0.85] tracking-[-0.02em] uppercase">
                            JEEL
                        </h1>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55 }}
                        className="text-[clamp(1.15rem,5.2vw,2.85rem)] font-syne font-black uppercase leading-[1.15] tracking-tight flex items-center justify-center gap-x-2 sm:gap-x-3 mt-1.5 sm:mt-2 w-full text-center whitespace-nowrap"
                    >
                        <span className="text-transparent [-webkit-text-stroke:1px_#a855f7] md:[-webkit-text-stroke:1.75px_#a855f7]">
                            PRODUCT
                        </span>
                        <span>DESIGNER</span>
                    </motion.h2>
                </div>

                {/* Philosophy, Bio & Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.65 }}
                    className="mt-4 sm:mt-5 space-y-4 sm:space-y-5 w-full max-w-2xl mx-auto"
                >
                    <p className="font-hand text-sm sm:text-base md:text-lg text-purple-600 tracking-wide px-2">
                        “{profile.philosophy || "An explorer’s curiosity. A designer’s eye."}”
                    </p>

                    <div
                        className="text-sm sm:text-base md:text-[1.08rem] font-montserrat font-medium text-black/65 leading-relaxed px-1 sm:px-4 [&>strong]:text-black [&>strong]:font-bold [&>strong]:font-syne"
                        dangerouslySetInnerHTML={{
                            __html:
                                data.heroBio ||
                                "I'm <strong>Jeel Thumar</strong> — a <strong>Product Designer & UI/UX Specialist</strong> crafting intuitive enterprise internal tools, multi-role commerce platforms, and scalable design systems."
                        }}
                    />

                    {/* Compact Focus Pills */}
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                        {["Enterprise Tools", "Multi-Role Systems", "Design Systems"].map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-purple-50/90 border border-black/15 rounded-full text-[11px] font-mono text-black/75"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
                        <motion.a
                            href={resumeUrl}
                            download="Jeel_Thumar_Resume.pdf"
                            onClick={handleDownload}
                            className="w-full sm:w-auto relative inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:py-3 bg-white text-black border-2 border-black rounded-lg font-bold font-syne uppercase tracking-wide cursor-pointer overflow-hidden group"
                            whileHover={{
                                translate: "4px 4px",
                                boxShadow: "0px 0px 0px 0px #000"
                            }}
                            whileTap={{
                                scale: 0.97,
                                translate: "2px 2px",
                                boxShadow: "2px 2px 0px 0px #000"
                            }}
                            style={{
                                boxShadow: "4px 4px 0px 0px #000"
                            }}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <ArrowDownToLine size={16} strokeWidth={2.5} />
                                <span className="text-xs sm:text-sm">Get Resume</span>
                            </span>
                            <div className="absolute inset-0 bg-purple-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                        </motion.a>

                        <Link
                            to="/case-studies/guestpostlinks-admin"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:py-3 bg-black text-white border-2 border-black rounded-lg font-bold font-syne uppercase tracking-wide text-xs sm:text-sm shadow-[4px_4px_0px_0px_#a855f7] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#a855f7] transition-all"
                        >
                            <span>View Case Study</span>
                            <ArrowUpRight size={16} />
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Mobile Bottom Spotlight Card & Scroll Cue — fills lower viewport purposefully */}
            <div className="w-full md:hidden space-y-3 relative z-10">
                <Link
                    to="/case-studies/guestpostlinks-admin"
                    className="block bg-white border-2 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] transition-all"
                >
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-lg bg-purple-100 border border-black/15 flex items-center justify-center shrink-0">
                                <Briefcase size={18} className="text-purple-700" />
                            </div>
                            <div className="min-w-0">
                                <div className="font-mono text-[10px] uppercase tracking-wider text-purple-700 font-semibold">
                                    Featured · Amrytt Media LLC
                                </div>
                                <div className="font-syne font-bold text-sm text-black truncate">
                                    GuestPostLinks Admin Redesign
                                </div>
                            </div>
                        </div>
                        <ArrowUpRight size={18} className="shrink-0 text-black/70" />
                    </div>
                </Link>

                <button
                    type="button"
                    onClick={scrollToNext}
                    className="w-full flex items-center justify-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-black/45 py-1"
                >
                    <span>Scroll to explore</span>
                    <ChevronDown size={14} className="animate-bounce" />
                </button>
            </div>
        </section>
    );
};
export default Hero;
