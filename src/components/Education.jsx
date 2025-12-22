import { motion } from 'framer-motion';

import { education } from '../data';

import { useRef } from 'react';
import { useSpotlightColor } from '../context/SpotlightContext';

const Education = () => {
    const sectionRef = useRef(null);
    useSpotlightColor("#ec4899", sectionRef);

    return (
        <section ref={sectionRef} className="py-24 px-6 md:px-12 max-w-7xl mx-auto text-black relative overflow-visible mb-24">

            <h2 className="text-4xl md:text-6xl font-syne font-bold mb-16">Education</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {education.map((edu, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white/80 backdrop-blur-md border border-black/10 rounded-lg shadow-lg p-8 transition-all"
                    >
                        <span className="text-sm font-mono text-purple-600 mb-2 block">{edu.year}</span>
                        <h3 className="text-xl font-bold font-syne mb-2">{edu.school}</h3>
                        <p className="text-black/60 mb-4">{edu.degree}</p>
                        <span className="inline-block px-3 py-1 bg-black/10 rounded-full text-sm text-black/80">{edu.grade}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
export default Education;
