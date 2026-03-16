import { motion } from 'framer-motion';
import { useSiteData } from '../hooks/useSiteData';
import { Car, Trophy, Cpu, Gamepad2, Heart, Star, Sparkles, Smile, Sun } from 'lucide-react';

// Safe icon dictionary
const getIcon = (iconName) => {
    const icons = { Car, Trophy, Cpu, Gamepad2, Heart, Star, Sparkles, Smile, Sun };
    return icons[iconName] || Star;
};

import { useRef } from 'react';
import { useSpotlightColor } from '../context/SpotlightContext';

const Expertise = () => {
    const sectionRef = useRef(null);
    useSpotlightColor("#f97316", sectionRef);
    const { data } = useSiteData();

    return (
        <section ref={sectionRef} className="py-24 px-6 md:px-12 max-w-7xl mx-auto text-black relative overflow-visible mb-24">

            <h2 className="text-4xl md:text-6xl font-syne font-bold mb-16">Expertise & Interests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">

                {/* Skills Section */}
                <div>
                    <h3 className="text-xl font-bold font-syne uppercase tracking-widest mb-8 text-black/60">Skills</h3>
                    <div className="flex flex-wrap gap-3">
                        {data.skills.map((skill, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="px-4 py-2 border border-black/10 rounded-full text-base font-medium text-black/80 hover:border-black/30 hover:bg-black/5 transition-all cursor-default"
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </div>

                {/* Beyond Work Section */}
                <div>
                    <h3 className="text-xl font-bold font-syne uppercase tracking-widest mb-8 text-black/60">Beyond Work</h3>
                    <div className="flex flex-wrap gap-4 text-lg font-medium leading-relaxed items-center">
                        <span>I love</span>
                        {data.interests.map((item, index) => {
                            const IconComponent = getIcon(item.icon);
                            return (
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`inline-flex items-center gap-2 ${item.color} px-3 py-1 rounded-sm transform ${item.rotate} hover:rotate-0 transition-transform duration-300 cursor-default shadow-sm border border-black/5`}
                                >
                                    <IconComponent size={16} className="opacity-70" />
                                    {item.label}
                                </motion.span>
                            );
                        })}
                        <span>& more.</span>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Expertise;
