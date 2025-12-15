import { motion } from 'framer-motion';
import Sticker from './Sticker';
import TextReveal from './TextReveal';
import { Star, Sparkles, Zap, ArrowDownToLine } from 'lucide-react';
import Spotlight from './Spotlight';

const Hero = () => {
    const handleDownload = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/Jeel-Thumar-Resume.pdf');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Jeel-Thumar-Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
            window.location.href = '/Jeel-Thumar-Resume.pdf';
        }
    };

    return (
        <section className="h-[100dvh] min-h-[600px] flex flex-col justify-center items-center px-4 overflow-hidden relative text-black">
            {/* Refined Spotlight Effect - Pattern Reveal */}
            <Spotlight color="#a855f7" />


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


            <div className="relative z-10 text-center flex flex-col items-center max-w-4xl mx-auto pt-0 md:pt-20">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative"
                >
                    <h1 className="text-[18vw] md:text-[10vw] font-bold font-syne leading-[0.85] tracking-tighter mix-blend-normal">
                        JEEL
                    </h1>
                </motion.div>



                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                    className="mt-2 text-4xl md:text-6xl font-syne font-bold uppercase leading-[0.85] tracking-tighter"
                >
                    UI/UX <span className="text-transparent stroke-black [-webkit-text-stroke:1px_black]">Designer</span>
                </motion.h2>

                {/* About Content Merged Here */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-12 space-y-8"
                >
                    <div className="flex flex-wrap justify-center gap-x-[0.25em] text-2xl md:text-4xl font-syne font-bold leading-tight px-4">
                        {/* Custom inline animation to handle mixed styling */}
                        {("I’m").split(" ").map((word, i) => (
                            <motion.span
                                key={`start-${i}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 + i * 0.03, type: "spring", stiffness: 100, damping: 20 }}
                                className="inline-block"
                            >
                                {word}
                            </motion.span>
                        ))}

                        {/* Name with color */}
                        {("Jeel Thumar.").split(" ").map((word, i) => (
                            <motion.span
                                key={`name-${i}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6 + i * 0.03, type: "spring", stiffness: 100, damping: 20 }}
                                className="inline-block text-purple-600"
                            >
                                {word}
                            </motion.span>
                        ))}

                        {/* Rest of sentence */}
                        {("A UI/UX Designer looking to create great user experiences and help organizations grow.").split(" ").map((word, i) => (
                            <motion.span
                                key={`end-${i}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.7 + i * 0.03, type: "spring", stiffness: 100, damping: 20 }}
                                className="inline-block"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </div>

                    <TextReveal
                        text="My background in editing complements my design skills, allowing me to focus on both the aesthetics and functionality of every project."
                        className="text-lg md:text-xl font-light text-black/60 max-w-2xl mx-auto leading-relaxed px-4"
                        delay={1.5}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.8 }}
                    >
                        <motion.a
                            href="/Jeel-Thumar-Resume.pdf"
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

            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </section>
    );
};
export default Hero;
