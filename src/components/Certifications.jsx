import { motion } from 'framer-motion';

import { certifications } from '../data';

import Spotlight from './Spotlight';

const Certifications = () => {
    return (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-black/10 text-black relative overflow-visible mb-24">
            <Spotlight color="#06b6d4" />
            <h2 className="text-4xl md:text-6xl font-syne font-bold mb-16">Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((cert, index) => (
                    <motion.a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white/80 backdrop-blur-md border border-black/10 rounded-lg shadow-lg p-8 hover:border-black/20 transition-all block cursor-pointer"
                    >
                        <h3 className="text-xl font-bold mb-2 font-syne text-purple-900 leading-tight">{cert.title}</h3>
                        <div className="flex justify-between items-end mt-8 text-sm text-black/40">
                            <span>{cert.issuer}</span>
                            <span>{cert.year}</span>
                        </div>
                    </motion.a>
                ))}
            </div>
        </section>
    );
};
export default Certifications;
