import { motion } from 'framer-motion';
import { useSiteData } from '../hooks/useSiteData';
import { useRef } from 'react';
import { useSpotlightColor } from '../context/SpotlightContext';

const Experience = () => {
    const sectionRef = useRef(null);
    useSpotlightColor("#10b981", sectionRef);
    const { data } = useSiteData();

    return (
        <section ref={sectionRef} className="py-16 md:py-24 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto text-black relative overflow-x-clip mb-12 md:mb-24">
            <div className="mb-10 sm:mb-16">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-purple-600 block mb-2 sm:mb-3">
                    Career History
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-syne font-bold">Experience</h2>
            </div>

            <div className="relative border-l-2 border-black/10 ml-2 sm:ml-4 md:ml-0 space-y-10 sm:space-y-12">
                {data.experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 }}
                        className="relative pl-8 md:pl-12"
                    >
                        <span className="absolute -left-[6px] top-2 w-2.5 h-2.5 bg-purple-500 rounded-full ring-4 ring-white"></span>
                        <span className="text-sm font-mono text-purple-600 mb-2 block">{exp.year}</span>
                        <h3 className="text-2xl md:text-3xl font-bold font-syne">{exp.role}</h3>
                        <h4 className="text-lg md:text-xl text-black/70 font-medium mb-4">
                            {exp.company}
                            {exp.location && (
                                <span className="text-sm text-black/50 ml-2 font-normal">• {exp.location}</span>
                            )}
                        </h4>

                        {Array.isArray(exp.highlights) && exp.highlights.length > 0 ? (
                            <ul className="space-y-2 max-w-3xl text-black/65 text-sm md:text-base leading-relaxed">
                                {exp.highlights.map((bullet, idx) => (
                                    <li key={idx} className="flex items-start gap-2.5">
                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-black/60 max-w-2xl leading-relaxed">{exp.description}</p>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
export default Experience;
