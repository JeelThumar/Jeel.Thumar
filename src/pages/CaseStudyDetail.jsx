import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Clock, Quote, Layers } from 'lucide-react';
import { useSiteData } from '../hooks/useSiteData';

const CaseStudyDetail = () => {
    const { id } = useParams();
    const { data } = useSiteData();

    const caseStudies = data.caseStudies || [];
    const upcomingCaseStudies = data.upcomingCaseStudies || [];
    const coreProjects = data.coreProjects || [];

    const study = caseStudies.find(c => c.id === id);
    const upcoming = !study ? upcomingCaseStudies.find(u => u.id === id) : null;
    const coreProject = !study ? coreProjects.find(p => p.caseStudyId === id || p.id === id) : null;

    if (!study && !upcoming && !coreProject) {
        return (
            <div className="min-h-screen flex items-center justify-center px-6 text-center text-black">
                <div>
                    <h1 className="text-3xl font-syne font-bold mb-4">Case study not found</h1>
                    <Link
                        to="/case-studies"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-lg font-syne font-bold text-sm uppercase"
                    >
                        <ArrowLeft size={16} /> Back to Case Studies
                    </Link>
                </div>
            </div>
        );
    }

    if (!study && (upcoming || coreProject)) {
        const title = upcoming?.title || coreProject?.title;
        const category = upcoming?.category || coreProject?.category;
        const scope = upcoming?.scope || coreProject?.description;

        return (
            <section className="min-h-screen pt-28 md:pt-32 pb-20 px-5 sm:px-8 md:px-12 max-w-5xl mx-auto text-black">
                <Link
                    to="/case-studies"
                    className="inline-flex items-center gap-2 text-black/60 hover:text-black transition-colors mb-8 sm:mb-10"
                >
                    <ArrowLeft size={20} /> Back to Case Studies
                </Link>

                <div className="bg-white border-2 border-black rounded-xl p-6 sm:p-8 md:p-12 shadow-[5px_5px_0px_0px_#000] md:shadow-[8px_8px_0px_0px_#000]">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="px-3 py-1 bg-purple-100 border border-black/15 rounded-full text-xs font-mono text-purple-900">
                            {category}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-200 border border-black rounded-full text-xs font-syne font-bold uppercase tracking-wider">
                            <Clock size={13} />
                            In Synthesis
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-syne font-bold mb-6">{title}</h1>
                    <p className="text-base sm:text-lg md:text-xl text-black/70 leading-relaxed mb-8">{scope}</p>

                    {coreProject?.highlights && (
                        <div className="mb-8 p-5 sm:p-6 bg-purple-50/60 border border-black/15 rounded-lg">
                            <h2 className="font-syne font-bold text-base sm:text-lg mb-4 uppercase tracking-wider">
                                Key Project Scope
                            </h2>
                            <ul className="space-y-2.5">
                                {coreProject.highlights.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-black/75">
                                        <CheckCircle2 size={18} className="text-purple-600 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="pt-6 border-t border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <span className="text-xs sm:text-sm font-mono text-black/55">
                            Full interactive case study write-up is currently being compiled.
                        </span>
                        <Link
                            to="/case-studies/guestpostlinks-admin"
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-black text-white rounded-lg font-syne font-bold text-xs uppercase tracking-wider"
                        >
                            Read Featured Case Study <ArrowUpRight size={15} />
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <article className="min-h-screen pt-28 md:pt-32 pb-20 px-5 sm:px-8 md:px-12 max-w-6xl mx-auto text-black">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8 sm:mb-10">
                <Link
                    to="/case-studies"
                    className="inline-flex items-center gap-2 text-black/60 hover:text-black transition-colors"
                >
                    <ArrowLeft size={20} /> Back to Case Studies
                </Link>

                {study.liveReference && (
                    <a
                        href={study.liveReference}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-black text-white rounded-full font-syne font-bold text-xs md:text-sm hover:bg-black/80 transition-colors"
                    >
                        Live Reference <ArrowUpRight size={16} />
                    </a>
                )}
            </div>

            {/* Hero Header */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12 md:mb-14"
            >
                <div className="flex flex-wrap gap-2.5 mb-5">
                    <span className="px-3 py-1 bg-yellow-300 border border-black rounded-full text-xs font-syne font-bold uppercase tracking-wider">
                        Deep-Dive Case Study
                    </span>
                    <span className="px-3 py-1 bg-purple-100 border border-black/15 rounded-full text-xs font-mono text-purple-900">
                        {study.period}
                    </span>
                </div>

                <h1 className="text-3xl sm:text-5xl md:text-7xl font-syne font-bold leading-[1.05] mb-5 sm:mb-6">
                    {study.title}
                </h1>
                <p className="text-base sm:text-xl md:text-2xl text-black/70 font-medium max-w-4xl leading-relaxed mb-8">
                    {study.summary}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 bg-white border-2 border-black rounded-xl p-5 sm:p-6 shadow-[4px_4px_0px_0px_#000]">
                    <div>
                        <div className="font-mono text-[11px] uppercase tracking-widest text-black/50 mb-1">Client</div>
                        <div className="font-syne font-bold text-sm sm:text-base">{study.client}</div>
                    </div>
                    <div>
                        <div className="font-mono text-[11px] uppercase tracking-widest text-black/50 mb-1">Role</div>
                        <div className="font-syne font-bold text-sm sm:text-base">{study.role}</div>
                    </div>
                    <div>
                        <div className="font-mono text-[11px] uppercase tracking-widest text-black/50 mb-1">Scale</div>
                        <div className="font-syne font-bold text-sm sm:text-base">{study.scale}</div>
                    </div>
                </div>
            </motion.div>

            {/* Validated Impact Metrics */}
            <section className="mb-14 md:mb-16">
                <h2 className="text-2xl md:text-3xl font-syne font-bold mb-6">Validated Impact Metrics</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    {study.metrics.map((metric, idx) => (
                        <div
                            key={idx}
                            className="bg-white border-2 border-black rounded-xl p-5 sm:p-6 shadow-[4px_4px_0px_0px_#a855f7] min-w-0 overflow-hidden"
                        >
                            <div className="text-2xl sm:text-[1.65rem] xl:text-3xl font-syne font-black leading-none tracking-tight break-words">
                                {metric.value}
                            </div>
                            <div className="text-xs font-syne font-bold uppercase tracking-wider text-purple-700 mt-2.5 mb-1.5">
                                {metric.label}
                            </div>
                            <p className="text-sm text-black/65 leading-relaxed">{metric.detail}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Problem Statement */}
            <section className="mb-14 md:mb-16">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-purple-600 block mb-2">
                    01 · Diagnosis
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-syne font-bold mb-6">The Problem Statement</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                    {study.problems.map((problem, idx) => (
                        <div key={idx} className="bg-white border border-black/15 rounded-xl p-5 sm:p-6 shadow-sm">
                            <div className="font-mono text-xs text-purple-600 mb-2">Pain Point 0{idx + 1}</div>
                            <h3 className="text-lg sm:text-xl font-syne font-bold mb-3">{problem.title}</h3>
                            <p className="text-sm md:text-base text-black/65 leading-relaxed">{problem.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* User Research & Methodology */}
            <section className="mb-14 md:mb-16">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-purple-600 block mb-2">
                    02 · Discovery
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-syne font-bold mb-6">User Research & Methodology</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                    {study.researchMethodology.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-purple-50/70 border-2 border-black rounded-xl p-5 sm:p-6"
                        >
                            <span className="inline-block px-2.5 py-1 bg-black text-white font-mono text-xs rounded mb-4">
                                Step {item.step}
                            </span>
                            <h3 className="text-lg sm:text-xl font-syne font-bold mb-2">{item.title}</h3>
                            <p className="text-sm md:text-base text-black/70 leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4 Foundational Design Decisions */}
            <section className="mb-14 md:mb-16">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-purple-600 block mb-2">
                    03 · Architecture & Craft
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-syne font-bold mb-6">4 Foundational Design Decisions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    {study.designDecisions.map((decision, idx) => (
                        <div
                            key={idx}
                            className="bg-white border-2 border-black rounded-xl p-6 sm:p-7 shadow-[4px_4px_0px_0px_#000] md:shadow-[5px_5px_0px_0px_#000]"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <span className="w-9 h-9 rounded-md bg-yellow-300 border border-black flex items-center justify-center font-syne font-black text-sm shrink-0">
                                    {decision.number}
                                </span>
                                <h3 className="text-lg sm:text-xl font-syne font-bold">{decision.title}</h3>
                            </div>
                            <p className="text-sm md:text-base text-black/70 leading-relaxed">
                                {decision.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Business Outcome & Key Takeaways */}
            <section className="mb-14 md:mb-16">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-purple-600 block mb-2">
                    04 · Results
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-syne font-bold mb-6">Business Outcome & Learnings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-8">
                    {study.outcomes.map((outcome, idx) => (
                        <div key={idx} className="bg-green-50 border-2 border-black rounded-xl p-5 sm:p-6">
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle2 size={20} className="text-green-700 shrink-0" />
                                <h3 className="text-lg sm:text-xl font-syne font-bold">{outcome.title}</h3>
                            </div>
                            <p className="text-sm md:text-base text-black/70 leading-relaxed">{outcome.description}</p>
                        </div>
                    ))}
                </div>

                {study.keyTakeaway && (
                    <div className="bg-black text-white rounded-xl p-6 sm:p-8 md:p-10 border-2 border-black shadow-[5px_5px_0px_0px_#a855f7] md:shadow-[6px_6px_0px_0px_#a855f7]">
                        <Quote size={26} className="text-yellow-400 mb-4" />
                        <p className="text-base sm:text-lg md:text-2xl font-syne font-medium leading-relaxed">
                            “{study.keyTakeaway}”
                        </p>
                        <div className="mt-4 font-mono text-xs uppercase tracking-widest text-white/60">
                            Key Takeaway — Jeel Thumar
                        </div>
                    </div>
                )}
            </section>

            {/* Explore Next */}
            {upcomingCaseStudies.length > 0 && (
                <section className="pt-10 border-t border-black/15">
                    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-black/50 mb-4">
                        <Layers size={14} />
                        <span>Upcoming Case Studies in Synthesis</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {upcomingCaseStudies.map(item => (
                            <Link
                                key={item.id}
                                to={`/case-studies/${item.id}`}
                                className="p-4 bg-white border border-black/15 hover:border-black rounded-lg transition-colors"
                            >
                                <div className="font-syne font-bold text-base mb-1">{item.title}</div>
                                <div className="font-mono text-[11px] text-purple-600">{item.category}</div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </article>
    );
};

export default CaseStudyDetail;
