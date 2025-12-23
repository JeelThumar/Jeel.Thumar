import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { ArrowLeft, ExternalLink } from 'lucide-react';

import { projects } from '../data';

// Helper to find project by ID since our data is an array now, not object
const getProjectById = (id) => projects.find(p => p.id === id);

const ProjectDetail = () => {
    const { id } = useParams();
    const project = getProjectById(id);

    if (!project) return <div className="h-screen flex items-center justify-center text-black">Project not found</div>;

    return (
        <section className="min-h-screen py-32 px-6 md:px-12 bg-transparent text-black relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <Link to="/work" className="inline-flex items-center gap-2 text-black/60 hover:text-black transition-colors">
                        <ArrowLeft size={20} /> Back to Work
                    </Link>

                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-syne font-bold hover:bg-black/80 transition-colors"
                        >
                            View Design <ExternalLink size={18} />
                        </a>
                    )}
                </div>

                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-6xl font-syne font-bold mb-8"
                >
                    {project.title}
                </motion.h1>

                <div className="flex flex-col md:flex-row gap-12 mb-20">
                    <div className="flex-1">
                        <p className="text-xl md:text-2xl font-light leading-relaxed text-black/80">{project.description}</p>
                    </div>
                    <div className="md:w-1/3 space-y-8">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-black/40 mb-2">Category</h3>
                            <p className="text-xl">{project.category}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-black/40 mb-2">Year</h3>
                            <p className="text-xl">{project.year}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-black/40 mb-2">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map(t => (
                                    <span key={t} className="px-3 py-1 bg-black/10 rounded-full text-sm">{t}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    {project.images.map((item, i) => {
                        if (typeof item === 'object' && item.type === 'grid-2') {
                            return (
                                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {item.items.map((gridImg, j) => (
                                        <motion.div
                                            key={j}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.2 + j * 0.1 }}
                                            className="w-full h-[80vh] md:h-[100vh] rounded-lg overflow-hidden"
                                        >
                                            <img src={gridImg} alt={`${project.title} - ${j}`} className="w-full h-full object-contain bg-neutral-100/5" />
                                        </motion.div>
                                    ))}
                                </div>
                            );
                        }

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="w-full h-[60vh] md:h-[80vh] rounded-lg overflow-hidden"
                            >
                                <img src={item} alt={project.title} className="w-full h-full object-contain" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
export default ProjectDetail;
