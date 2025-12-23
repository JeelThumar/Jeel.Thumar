import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

import { projects, moreWork } from '../data';

import { useRef } from 'react';
import { useSpotlightColor } from '../context/SpotlightContext';

const Work = ({ limit }) => {
    const sectionRef = useRef(null);
    useSpotlightColor("#3b82f6", sectionRef);

    // Reverse projects to show newest first, then slice if limit exists
    const displayProjects = [...projects].reverse().slice(0, limit || projects.length);

    return (
        <section ref={sectionRef} id="work" className="py-24 px-4 text-black overflow-visible relative mb-24">

            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-16 relative z-10">
                    <h2 className="text-6xl md:text-8xl font-syne font-bold uppercase leading-[0.8] tracking-tighter">
                        Selected <br /> <span className="text-transparent stroke-black [-webkit-text-stroke:1px_black]">Works</span>
                    </h2>

                    {limit && (
                        <Link to="/work" className="hidden md:flex items-center gap-2 group">
                            <span className="font-syne font-bold text-xl">View All</span>
                            <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                                <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform duration-300" />
                            </div>
                        </Link>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 relative">
                    {/* Decorative blurred blob */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-200/50 rounded-full blur-[100px] -z-10 pointer-events-none" />

                    {displayProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className={`relative group ${index % 2 !== 0 ? 'md:translate-y-24' : ''}`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link to={`/project/${project.id}`} className="block">
                                <motion.div
                                    whileHover={{ scale: 1.02, rotate: 0 }}
                                    animate={{ rotate: project.rotation }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="bg-white p-4 pb-12 shadow-[0px_10px_40px_-10px_rgba(0,0,0,0.1)] border border-black/5 hover:shadow-[0px_20px_60px_-15px_rgba(0,0,0,0.15)] transition-shadow duration-300"
                                >
                                    <div className="relative overflow-hidden aspect-[4/3] bg-gray-100 mb-6">
                                        <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px]">
                                            <div className="bg-white text-black px-6 py-2 rounded-full font-bold uppercase text-sm tracking-widest flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                                View Project <ArrowUpRight size={16} />
                                            </div>
                                        </div>
                                        <img
                                            src={project.img}
                                            alt={project.title}
                                            className="w-full h-full object-contain  group-hover:grayscale transition-all duration-500"
                                        />
                                    </div>

                                    <div className="flex justify-between items-end px-2">
                                        <div>
                                            <div className="inline-block px-3 py-1 mb-2 border border-black/10 rounded-full text-xs font-mono uppercase tracking-wider text-black/60">
                                                {project.category}
                                            </div>
                                            <h3 className="text-3xl font-bold font-syne leading-none text-black">{project.title}</h3>
                                        </div>
                                        <span className="font-mono text-sm text-black/40">{project.year}</span>
                                    </div>
                                </motion.div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {limit && (
                    <div className="md:hidden mt-24 flex justify-center">
                        <Link to="/work" className="inline-flex items-center gap-2 group">
                            <span className="font-syne font-bold text-lg">View All Works</span>
                            <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                                <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform duration-300" />
                            </div>
                        </Link>
                    </div>
                )}

                {!limit && moreWork.length > 0 && (
                    <div className="mt-32">
                        <h3 className="text-4xl font-syne font-bold mb-12">More Work</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {moreWork.map((work) => (
                                <a
                                    key={work.id}
                                    href={work.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block bg-gray-50 p-8 rounded-2xl hover:bg-gray-100 transition-colors border border-black/5"
                                >
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 bg-white rounded-full border border-black/5 group-hover:scale-110 transition-transform">
                                            <ArrowUpRight size={20} className="text-black/60 group-hover:text-black" />
                                        </div>
                                        <span className="font-mono text-sm text-black/40">{work.year}</span>
                                    </div>
                                    <h4 className="text-2xl font-bold font-syne mb-2 group-hover:underline decoration-1 underline-offset-4">{work.title}</h4>
                                    <p className="text-black/60 font-light mb-4">{work.category}</p>
                                    <p className="text-sm text-black/40 line-clamp-2">{work.description}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
export default Work;
