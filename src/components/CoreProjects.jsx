import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Globe } from 'lucide-react';
import { useSiteData } from '../hooks/useSiteData';
import { useSpotlightColor } from '../context/SpotlightContext';

const STATUS_STYLES = {
    'Featured Case Study': 'bg-purple-200 text-black border-black',
    'Shipped Live': 'bg-green-200 text-black border-black',
    'In Dev': 'bg-yellow-200 text-black border-black',
    'Case Study in Synthesis': 'bg-gray-100 text-black/80 border-black/20'
};

const CoreProjects = ({
    showCoreProjects = true,
    showLiveWebsites = true,
    coreLimit
}) => {
    const sectionRef = useRef(null);
    useSpotlightColor('#8b5cf6', sectionRef);
    const { data } = useSiteData();

    const coreProjects = data.coreProjects || [];
    const displayCore = coreLimit ? coreProjects.slice(0, coreLimit) : coreProjects;
    const liveWebsites = data.liveWebsites || [];

    return (
        <section ref={sectionRef} className="py-16 md:py-20 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto text-black relative overflow-x-clip">
            {/* 1. Resume-Backed Core Projects */}
            {showCoreProjects && displayCore.length > 0 && (
                <div className="mb-20 md:mb-24">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-12">
                        <div>
                            <span className="font-mono text-xs uppercase tracking-[0.2em] text-purple-600 block mb-2 sm:mb-3">
                                Product & Systems Portfolio
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-6xl font-syne font-bold">
                                Core Product Work
                            </h2>
                        </div>

                        {coreLimit && (
                            <Link to="/work" className="inline-flex items-center gap-2 group self-start md:self-auto">
                                <span className="font-syne font-bold text-base sm:text-lg md:text-xl">Explore Full Catalog</span>
                                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                                    <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform duration-300" />
                                </div>
                            </Link>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                        {displayCore.map((project, index) => {
                            const statusStyle = STATUS_STYLES[project.status] || 'bg-gray-100 text-black border-black/20';
                            const isExternalOnly = !project.caseStudyId && project.link;
                            const targetHref = project.caseStudyId
                                ? `/case-studies/${project.caseStudyId}`
                                : project.link || `/project/${project.id}`;

                            return (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-white border-2 border-black rounded-lg p-5 sm:p-6 shadow-[4px_4px_0px_0px_#000] md:shadow-[5px_5px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all flex flex-col justify-between min-w-0"
                                >
                                    <div>
                                        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                                            <span className="px-2.5 py-1 bg-black/5 border border-black/10 rounded-full text-[11px] font-mono uppercase tracking-wider text-black/70">
                                                {project.platform}
                                            </span>
                                            {project.status && (
                                                <span className={`px-2.5 py-1 border rounded-full text-[11px] font-syne font-bold uppercase tracking-wide ${statusStyle}`}>
                                                    {project.status}
                                                </span>
                                            )}
                                        </div>

                                        <div className="font-mono text-xs text-purple-600 mb-1">
                                            {project.category} · {project.year}
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-bold font-syne mb-2 leading-tight">
                                            {project.title}
                                        </h3>
                                        <p className="text-xs font-mono text-black/50 mb-4">
                                            Role: {project.role}
                                        </p>

                                        <p className="text-sm text-black/70 leading-relaxed mb-5">
                                            {project.description}
                                        </p>

                                        {Array.isArray(project.highlights) && project.highlights.length > 0 && (
                                            <ul className="space-y-1.5 mb-5 text-xs text-black/65">
                                                {project.highlights.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2">
                                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                    <div className="pt-4 border-t border-black/10 flex flex-wrap items-center justify-between gap-3">
                                        <div className="flex flex-wrap gap-1.5">
                                            {(project.tech || []).slice(0, 2).map((tag, i) => (
                                                <span key={i} className="px-2.5 py-0.5 bg-purple-50 border border-purple-200 rounded-full text-[11px] font-mono text-purple-900">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {isExternalOnly ? (
                                            <a
                                                href={targetHref}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 font-syne font-bold text-xs uppercase tracking-wider text-black hover:text-purple-600 transition-colors shrink-0"
                                            >
                                                <span>Visit Live</span>
                                                <ArrowUpRight size={15} />
                                            </a>
                                        ) : (
                                            <Link
                                                to={targetHref}
                                                className="inline-flex items-center gap-1 font-syne font-bold text-xs uppercase tracking-wider text-black hover:text-purple-600 transition-colors shrink-0"
                                            >
                                                <span>{project.caseStudyId === 'guestpostlinks-admin' ? 'Read Case Study' : 'View Scope'}</span>
                                                <ArrowUpRight size={15} />
                                            </Link>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* 2. Shipped Live Client Websites */}
            {showLiveWebsites && liveWebsites.length > 0 && (
                <div>
                    <div className="mb-8 sm:mb-10">
                        <span className="font-mono text-xs uppercase tracking-[0.2em] text-purple-600 block mb-2 sm:mb-3">
                            Production Releases
                        </span>
                        <h3 className="text-2xl sm:text-3xl md:text-5xl font-syne font-bold">
                            Shipped Live Client Websites
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                        {liveWebsites.map((site, index) => (
                            <motion.a
                                key={site.id}
                                href={site.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="group bg-white/95 backdrop-blur-md border border-black/15 hover:border-black rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-[4px_4px_0px_0px_#000] transition-all flex flex-col justify-between min-w-0"
                            >
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-4">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/5 rounded-full text-[11px] font-mono text-black/70 max-w-[80%] truncate">
                                            <Globe size={12} className="text-purple-600 shrink-0" />
                                            <span className="truncate">{site.category}</span>
                                        </span>
                                        <span className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors shrink-0">
                                            <ArrowUpRight size={16} />
                                        </span>
                                    </div>
                                    <h4 className="text-lg sm:text-xl font-bold font-syne mb-1.5 group-hover:text-purple-700 transition-colors">
                                        {site.title}
                                    </h4>
                                    <div className="text-xs font-mono text-purple-600 mb-3">
                                        {site.role}
                                    </div>
                                    <p className="text-sm text-black/65 leading-relaxed">
                                        {site.description}
                                    </p>
                                </div>

                                <div className="mt-5 pt-3 border-t border-black/10 text-[11px] font-mono text-black/45 truncate">
                                    {site.url.replace(/^https?:\/\//, '')}
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default CoreProjects;
