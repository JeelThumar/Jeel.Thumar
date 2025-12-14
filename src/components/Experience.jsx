import { motion } from 'framer-motion';

import { experiences } from '../data';

import Spotlight from './Spotlight';

const Experience = () => {
    return (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto text-black relative overflow-visible mb-24">
            <Spotlight color="#10b981" />
            <h2 className="text-4xl md:text-6xl font-syne font-bold mb-16">Experience</h2>
            <div className="relative border-l border-black/10 ml-4 md:ml-0 space-y-12">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className="relative pl-8 md:pl-12"
                    >
                        <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-purple-500 rounded-full ring-4 ring-white"></span>
                        <span className="text-sm font-mono text-purple-600 mb-2 block">{exp.year}</span>
                        <h3 className="text-2xl font-bold font-syne">{exp.role}</h3>
                        <h4 className="text-xl text-black/60 mb-2">{exp.company} <span className="text-sm text-black/40 ml-2">• {exp.location}</span></h4>
                        <p className="text-black/50 max-w-2xl">{exp.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
export default Experience;
