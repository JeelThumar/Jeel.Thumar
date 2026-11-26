import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, CheckCircle2 } from 'lucide-react';
import { useCollectionData } from '../hooks/useCollectionData';
import { useSiteData } from '../hooks/useSiteData';
import { projects as fallbackProjects } from '../data';

const ProjectDetail = () => {
    const { id } = useParams();
    const { data: projects } = useCollectionData("projects", fallbackProjects);
    const { data: siteData } = useSiteData();

    const coreProjects = siteData.coreProjects || [];
    const project =
        projects.find(p => p.id.toString() === id.toString()) ||
        coreProjects.find(p => p.id.toString() === id.toString());

    if (!project) {
        return (
            <div className="h-screen flex flex-col items-center justify-center text-black gap-4">
                <p className="font-syne text-2xl font-bold">Project not found</p>
                <Link to="/work" className="text-purple-600 hover:underline font-medium">
                    Back to Work
                </Link>
            </div>
        );
    }

    const images = Array.isArray(project.images) ? project.images : [];
    const tech = Array.isArray(project.tech) ? project.tech : [];

    return (
        <section className="min-h-screen py-32 px-6 md:px-12 bg-transparent text-black relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-12">
                    <Link to="/work" className="inline-flex items-center gap-2 text-black/60 hover:text-black transition-colors">
                        <ArrowLeft size={20} /> Back to Work
                    </Link>

                    <div className="flex flex-wrap gap-3">
                        {project.caseStudyId && (
                            <Link
                                to={`/case-studies/${project.caseStudyId}`}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full font-syne font-bold hover:bg-purple-700 transition-colors"
                            >
                                View Case Study <ExternalLink size={18} />
                            </Link>
                        )}
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-syne font-bold hover:bg-black/80 transition-colors"
                            >
                                View Live <ExternalLink size={18} />
                            </a>
                        )}
                    </div>
                </div>

                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-syne font-bold mb-8"
                >
                    {project.title}
                </motion.h1>

                <div className="flex flex-col md:flex-row gap-12 mb-20">
                    <div className="flex-1 space-y-6">
                        <p className="text-xl md:text-2xl font-light leading-relaxed text-black/80 whitespace-pre-line">
                            {project.description}
                        </p>

                        {Array.isArray(project.highlights) && project.highlights.length > 0 && (
                            <div className="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_#000]">
                                <h3 className="font-syne font-bold text-base uppercase tracking-wider mb-4">
                                    Scope & Key Features
                                </h3>
                                <ul className="space-y-2.5">
                                    {project.highlights.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5 text-black/75">
                                            <CheckCircle2 size={18} className="text-purple-600 shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="md:w-1/3 space-y-8">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-black/60 mb-2">Category</h3>
                            <p className="text-xl">{project.category}</p>
                        </div>
                        {project.platform && (
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-black/60 mb-2">Platform</h3>
                                <p className="text-xl">{project.platform}</p>
                            </div>
                        )}
                        {project.role && (
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-black/60 mb-2">Role</h3>
                                <p className="text-xl">{project.role}</p>
                            </div>
                        )}
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-black/60 mb-2">Year</h3>
                            <p className="text-xl">{project.year}</p>
                        </div>
                        {tech.length > 0 && (
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-black/60 mb-2">Skills & Tools</h3>
                                <div className="flex flex-wrap gap-2">
                                    {tech.map(t => (
                                        <span key={t} className="px-3 py-1 bg-black/10 rounded-full text-sm">{t}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {images.length > 0 && (
                    <div className="space-y-8">
                        {images.map((item, i) => {
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
                )}
            </div>
        </section>
    );
};
export default ProjectDetail;
