import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useCollectionData } from '../hooks/useCollectionData';
import { projects as fallbackProjects } from '../data';
import { useRef } from 'react';
import { useSpotlightColor } from '../context/SpotlightContext';

const Work = ({ limit }) => {
    const sectionRef = useRef(null);
    useSpotlightColor("#3b82f6", sectionRef);

    const { data: projects } = useCollectionData("projects", fallbackProjects);

    // Reverse projects to show newest first, then slice if limit exists
    const displayProjects = [...projects].reverse().slice(0, limit || projects.length);

    return (
        <section ref={sectionRef} id="work" className="py-16 md:py-24 px-5 sm:px-8 md:px-12 text-black overflow-hidden relative mb-12 md:mb-24">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-10 sm:mb-16 relative z-10">
                    <div>
                        <span className="font-mono text-xs uppercase tracking-[0.2em] text-purple-600 block mb-2 sm:mb-3">
                            Brand, Print & UI Craft
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-syne font-bold">
                            {limit ? 'Visual & UI Explorations' : 'Visual & Brand Explorations'}
                        </h2>
                    </div>

                    {limit && (
                        <Link to="/work" className="hidden md:flex items-center gap-2 group shrink-0">
                            <span className="font-syne font-bold text-xl">View All</span>
                            <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                                <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform duration-300" />
                            </div>
                        </Link>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-20 relative">
                    {/* Decorative blurred blob */}
                    <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-200/50 rounded-full blur-[100px] -z-10 pointer-events-none" />

                    {displayProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className={`relative group ${index % 2 !== 0 ? 'md:translate-y-16' : ''}`}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ delay: index * 0.08 }}
                        >
                            <Link to={`/project/${project.id}`} className="block">
                                <div
                                    className="bg-white p-3.5 sm:p-4 pb-8 sm:pb-10 shadow-[0px_10px_40px_-10px_rgba(0,0,0,0.1)] border border-black/10 hover:shadow-[0px_20px_60px_-15px_rgba(0,0,0,0.15)] transition-all duration-300 md:hover:rotate-0"
                                    style={{ transform: undefined }}
                                >
                                    <div className="relative overflow-hidden aspect-[4/3] bg-gray-100 mb-5">
                                        <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px]">
                                            <div className="bg-white text-black px-5 py-2 rounded-full font-bold uppercase text-xs sm:text-sm tracking-widest flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                                View Project <ArrowUpRight size={16} />
                                            </div>
                                        </div>
                                        <img
                                            src={project.img}
                                            alt={project.title}
                                            className="w-full h-full object-contain group-hover:grayscale transition-all duration-500"
                                        />
                                    </div>

                                    <div className="flex justify-between items-end px-1 sm:px-2 gap-4">
                                        <div className="min-w-0">
                                            <div className="inline-block px-3 py-1 mb-2 border border-black/10 rounded-full text-[11px] sm:text-xs font-mono uppercase tracking-wider text-black/60">
                                                {project.category}
                                            </div>
                                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-syne leading-tight text-black break-words">
                                                {project.title}
                                            </h3>
                                        </div>
                                        <span className="font-mono text-xs sm:text-sm text-black/60 shrink-0">{project.year}</span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {limit && (
                    <div className="md:hidden mt-12 flex justify-center">
                        <Link to="/work" className="inline-flex items-center gap-2 group">
                            <span className="font-syne font-bold text-base sm:text-lg">View All Works</span>
                            <div className="w-9 h-9 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                                <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform duration-300" />
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};
export default Work;
