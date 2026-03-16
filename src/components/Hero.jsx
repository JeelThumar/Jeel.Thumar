import { motion } from 'framer-motion';
import Sticker from './Sticker';
import TextReveal from './TextReveal';
import { Star, Sparkles, Zap, ArrowDownToLine } from 'lucide-react';

import { useRef } from 'react';
import { useSpotlightColor } from '../context/SpotlightContext';
import { useSiteData } from '../hooks/useSiteData';

const Hero = () => {
    const sectionRef = useRef(null);
    useSpotlightColor("#a855f7", sectionRef);
    const { data } = useSiteData();

    const handleDownload = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/Jeel-Thumar-CV.pdf');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Jeel-Thumar-CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
            window.location.href = '/Jeel-Thumar-CV.pdf';
        }
    };

    return (
        <section ref={sectionRef} className="min-h-[100dvh] flex flex-col justify-center items-center px-4 relative text-black py-20 md:py-0">
            {/* Refined Spotlight Effect - Pattern Reveal - MOVED TO GLOBAL */}

            {/* Decorative Stickers - Hidden on mobile for cleaner look */}
            {/* Decorative Stickers */}
            <Sticker className="top-[15%] left-[5%] md:top-[20%] md:left-[15%] text-yellow-500" rotation={-15} delay={1}>
                {/* Scaled down on mobile */}
                <div className="scale-75 md:scale-100">
                    <Star size={64} fill="currentColor" strokeWidth={3} />
                </div>
            </Sticker>

            <Sticker className="bottom-[18%] right-[5%] md:bottom-[25%] md:right-[15%] text-purple-500" rotation={15} delay={1.2}>
                <div className="scale-75 md:scale-100 bg-black text-white font-hand p-3 md:p-4 rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] rotate-3 text-sm md:text-base">
                    Hello there! 👋
                </div>
            </Sticker>

            <Sticker className="top-[20%] right-[10%] md:top-[25%] md:right-[20%] text-pink-500" rotation={30} delay={1.4}>
                <div className="scale-75 md:scale-100">
                    <Zap size={48} fill="currentColor" />
                </div>
            </Sticker>

            <Sticker className="bottom-[12%] left-[8%] md:bottom-[20%] md:left-[20%] text-cyan-500" rotation={-10} delay={1.6}>
                <div className="scale-75 md:scale-100">
                    <Sparkles size={56} />
                </div>
            </Sticker>


            <div className="relative z-10 text-center flex flex-col items-center max-w-5xl mx-auto pt-0 md:pt-20 px-4">
                
                {/* Location Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="border border-black/10 rounded-full px-4 md:px-6 py-1.5 md:py-2 flex items-center justify-center gap-2 md:gap-3 text-[8px] md:text-[10px] font-syne font-bold text-black/50 uppercase tracking-[0.2em] md:tracking-[0.3em] mb-6 md:mb-8 shadow-sm"
                >
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-purple-400"></span>
                    UI/UX DESIGNER &nbsp;&nbsp;&middot;&nbsp;&nbsp; AHMEDABAD, INDIA
                </motion.div>

                {/* Text Lockup Container to ensure perfect alignment */}
                <div className="flex flex-col items-center w-full max-w-[1000px] mx-auto mt-2 px-2 sm:px-4 md:px-0">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full flex justify-center"
                    >
                        <h1 className="text-[18vw] sm:text-7xl md:text-9xl lg:text-[150px] font-black font-syne leading-[0.8] tracking-[-0.02em] mix-blend-normal uppercase">
                            JEEL
                        </h1>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 }}
                        className="text-[5.5vw] sm:text-3xl md:text-5xl lg:text-[62px] font-syne font-black uppercase leading-[1.6] tracking-normal flex items-center justify-center -mt-1 sm:-mt-2 md:-mt-4 w-full"
                    >
                        UI/<span className="text-transparent [-webkit-text-stroke:1px_#c084fc] md:[-webkit-text-stroke:2px_#c084fc]">UX</span>&nbsp;DESIGNER
                    </motion.h2>
                </div>

                {/* About Content Merged Here */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-10 md:mt-12 space-y-10"
                >
                    <div 
                        className="text-base md:text-[1.35rem] font-montserrat font-medium text-black/60 max-w-3xl mx-auto leading-relaxed px-4 [&>strong]:text-black [&>strong]:font-bold [&>strong]:font-syne [&>strong]:text-[115%]"
                        dangerouslySetInnerHTML={{ __html: data.heroBio || "I'm <strong>Jeel Thumar</strong> — a UI/UX designer focused on creating great user experiences that help organisations grow. My background in editing complements my design skills, balancing <strong>aesthetics</strong> with <strong>functionality</strong>." }}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.8 }}
                    >
                        <motion.a
                            href="/Jeel-Thumar-CV.pdf"
                            onClick={handleDownload}
                            className="relative inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-2.5 bg-white text-black border-2 border-black rounded-lg font-bold font-syne uppercase tracking-wide cursor-pointer overflow-hidden group"
                            whileHover={{
                                translate: "4px 4px",
                                boxShadow: "0px 0px 0px 0px #000"
                            }}
                            whileTap={{
                                scale: 0.95,
                                translate: "2px 2px",
                                boxShadow: "2px 2px 0px 0px #000"
                            }}
                            initial={{
                                boxShadow: "4px 4px 0px 0px #000"
                            }}
                            style={{
                                boxShadow: "4px 4px 0px 0px #000"
                            }}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <ArrowDownToLine size={16} className="w-4 h-4 md:w-[18px] md:h-[18px]" strokeWidth={2.5} />
                                <span className="text-xs md:text-sm">Get Resume</span>
                            </span>
                            <div className="absolute inset-0 bg-purple-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                        </motion.a>
                    </motion.div>

                </motion.div>
            </div>

        </section>
    );
};
export default Hero;
