import { motion } from 'framer-motion';
import { skills, interests } from '../data';

import { useRef } from 'react';
import { useSpotlightColor } from '../context/SpotlightContext';

const Expertise = () => {
    const sectionRef = useRef(null);
    useSpotlightColor("#f97316", sectionRef);

    return (
        <section ref={sectionRef} className="py-24 px-6 md:px-12 max-w-7xl mx-auto text-black relative overflow-visible mb-24">

            <h2 className="text-4xl md:text-6xl font-syne font-bold mb-16">Expertise & Interests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">

                {/* Skills Section */}
                <div>
                    <h3 className="text-xl font-bold font-syne uppercase tracking-widest mb-8 text-black/40">Skills</h3>
                    <div className="flex flex-wrap gap-3">
                        {skills.map((skill, index) => (
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
                    <h3 className="text-xl font-bold font-syne uppercase tracking-widest mb-8 text-black/40">Beyond Work</h3>
                    <div className="flex flex-wrap gap-4 text-lg font-medium leading-relaxed items-center">
                        <span>I love</span>
                        {interests.map((item, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`inline-flex items-center gap-2 ${item.color} px-3 py-1 rounded-sm transform ${item.rotate} hover:rotate-0 transition-transform duration-300 cursor-default shadow-sm border border-black/5`}
                            >
                                <item.icon size={16} className="opacity-70" />
                                {item.label}
                            </motion.span>
                        ))}
                        <span>& more.</span>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Expertise;
