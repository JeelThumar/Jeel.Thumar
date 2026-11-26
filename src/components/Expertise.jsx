import { motion } from 'framer-motion';
import { useSiteData } from '../hooks/useSiteData';
import { Car, Trophy, Cpu, Gamepad2, Heart, Star, Sparkles, Smile, Sun, Compass, Utensils, Globe } from 'lucide-react';
import { useRef } from 'react';
import { useSpotlightColor } from '../context/SpotlightContext';

const ICON_MAP = {
    Car,
    Trophy,
    Cpu,
    Gamepad2,
    Heart,
    Star,
    Sparkles,
    Smile,
    Sun,
    Compass,
    Utensils
};

// Safe icon resolver supporting both string names and React forwardRef component objects
const getIcon = (iconOrName) => {
    if (typeof iconOrName === 'string' && ICON_MAP[iconOrName]) {
        return ICON_MAP[iconOrName];
    }
    if (iconOrName && (typeof iconOrName === 'function' || typeof iconOrName === 'object')) {
        return iconOrName;
    }
    return Star;
};

const Expertise = () => {
    const sectionRef = useRef(null);
    useSpotlightColor("#f97316", sectionRef);
    const { data } = useSiteData();

    const pillars = data.capabilityPillars || [];
    const competencies = data.coreCompetencies || data.skills || [];
    const languages = data.languages || [];

    return (
        <section ref={sectionRef} className="py-16 md:py-24 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto text-black relative overflow-x-clip mb-12 md:mb-24">
            <div className="mb-10 sm:mb-16">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-purple-600 block mb-2 sm:mb-3">
                    Capabilities & Craft
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-syne font-bold">Expertise & Interests</h2>
            </div>

            {/* 3 Key Pillars of Capability */}
            {pillars.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={pillar.number || index}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white border-2 border-black rounded-lg p-6 sm:p-7 shadow-[5px_5px_0px_0px_#000] md:shadow-[6px_6px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_0px_#000] transition-all flex flex-col justify-between min-w-0"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-5 sm:mb-6">
                                    <span className={`inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 ${pillar.accent || 'bg-purple-200'} border-2 border-black rounded-md font-syne font-black text-base sm:text-lg`}>
                                        {pillar.number}
                                    </span>
                                    <span className="font-mono text-[11px] uppercase tracking-widest text-black/40">
                                        Core Pillar
                                    </span>
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold font-syne mb-3 leading-snug">
                                    {pillar.title}
                                </h3>
                                <p className="text-black/65 text-sm md:text-base leading-relaxed mb-6">
                                    {pillar.description}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-black/10">
                                {(pillar.tags || []).map((tag, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 bg-black/5 border border-black/10 rounded-full text-xs font-mono text-black/75"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                {/* Core Competencies Section */}
                <div>
                    <h3 className="text-lg sm:text-xl font-bold font-syne uppercase tracking-widest mb-6 sm:mb-8 text-black/60">
                        Core Competencies
                    </h3>
                    <div className="flex flex-wrap gap-2.5 sm:gap-3">
                        {competencies.map((skill, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.04 }}
                                className="px-3.5 sm:px-4 py-2 bg-white border border-black/15 rounded-full text-xs sm:text-sm md:text-base font-medium text-black/80 hover:border-black hover:bg-purple-50 transition-all cursor-default shadow-xs"
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </div>

                {/* Beyond Work & Languages Section */}
                <div className="space-y-10 sm:space-y-12">
                    <div>
                        <h3 className="text-lg sm:text-xl font-bold font-syne uppercase tracking-widest mb-6 sm:mb-8 text-black/60">
                            Beyond Work
                        </h3>
                        <div className="flex flex-wrap gap-3 text-base sm:text-lg font-medium leading-relaxed items-center">
                            <span>I enjoy</span>
                            {(data.interests || []).map((item, index) => {
                                const IconComponent = getIcon(item.icon);
                                return (
                                    <motion.span
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.08 }}
                                        className={`inline-flex items-center gap-2 ${item.color} px-3 py-1.5 rounded-sm md:transform ${item.rotate} hover:rotate-0 transition-transform duration-300 cursor-default shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] border border-black`}
                                    >
                                        <IconComponent size={16} className="opacity-80 shrink-0" />
                                        <span className="text-xs sm:text-sm md:text-base font-semibold">{item.label}</span>
                                    </motion.span>
                                );
                            })}
                            <span>& more.</span>
                        </div>
                    </div>

                    {languages.length > 0 && (
                        <div>
                            <h3 className="text-sm font-bold font-syne uppercase tracking-widest mb-4 text-black/60 flex items-center gap-2">
                                <Globe size={16} className="text-purple-600" />
                                Languages
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {languages.map((lang, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white/90 border border-black/10 rounded-lg px-3.5 py-2.5"
                                    >
                                        <div className="font-syne font-bold text-sm text-black">{lang.name}</div>
                                        <div className="font-mono text-[11px] text-black/55 mt-0.5">{lang.level}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Expertise;
