import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Layers, Clock, Sparkles } from 'lucide-react';
import { useSiteData } from '../hooks/useSiteData';

const CaseStudiesPage = () => {
    const { data } = useSiteData();
    const caseStudies = data.caseStudies || [];
    const upcomingCaseStudies = data.upcomingCaseStudies || [];

    return (
        <section className="min-h-screen pt-28 md:pt-32 pb-20 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto text-black">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12 md:mb-16"
            >
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-purple-600 block mb-3">
                    Product Design & Problem Solving
                </span>
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-syne font-bold uppercase leading-[0.9] tracking-tighter mb-6">
                    Case <span className="text-transparent [-webkit-text-stroke:1.5px_black]">Studies</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-black/65 max-w-2xl leading-relaxed">
                    In-depth breakdowns of how I simplify complex enterprise workflows, multi-role systems, and high-friction user journeys.
                </p>
            </motion.div>

            {/* Published Deep-Dive Case Studies */}
            <div className="space-y-10 mb-20 md:mb-24">
                {caseStudies.map((study) => (
                    <motion.div
                        key={study.id}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white border-2 border-black rounded-xl p-5 sm:p-8 md:p-12 shadow-[5px_5px_0px_0px_#000] md:shadow-[8px_8px_0px_0px_#000]"
                    >
                        <div className="flex flex-wrap items-center gap-2.5 mb-5">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-300 border border-black rounded-full text-xs font-syne font-bold uppercase tracking-wider">
                                <Sparkles size={13} />
                                Featured Case Study
                            </span>
                            <span className="px-3 py-1 bg-black/5 rounded-full text-xs font-mono text-black/70">
                                {study.client}
                            </span>
                            <span className="px-3 py-1 bg-black/5 rounded-full text-xs font-mono text-black/70">
                                {study.period}
                            </span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-syne font-bold mb-4">{study.title}</h2>
                        <p className="text-sm sm:text-base md:text-xl text-black/65 max-w-3xl leading-relaxed mb-8">
                            {study.summary}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            {study.metrics.map((metric, idx) => (
                                <div key={idx} className="bg-purple-50/70 border border-black/15 rounded-lg p-5 min-w-0 overflow-hidden">
                                    <div className="text-2xl sm:text-[1.6rem] xl:text-[1.85rem] font-syne font-black leading-none tracking-tight break-words">
                                        {metric.value}
                                    </div>
                                    <div className="text-[11px] sm:text-xs font-syne font-bold uppercase tracking-wider text-purple-700 mt-2">
                                        {metric.label}
                                    </div>
                                    <p className="text-xs sm:text-sm text-black/65 mt-1.5 leading-relaxed">{metric.detail}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-black/10">
                            <div className="flex items-start sm:items-center gap-2 text-xs md:text-sm font-mono text-black/60">
                                <Layers size={16} className="text-purple-600 shrink-0 mt-0.5 sm:mt-0" />
                                <span>{study.role}</span>
                            </div>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                                {study.liveReference && (
                                    <a
                                        href={study.liveReference}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 border border-black/20 rounded-lg text-xs md:text-sm font-syne font-bold uppercase tracking-wider hover:border-black hover:bg-black/5 transition-colors"
                                    >
                                        <span>Live Reference</span>
                                        <ArrowUpRight size={16} />
                                    </a>
                                )}
                                <Link
                                    to={`/case-studies/${study.id}`}
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-syne font-bold text-xs md:text-sm uppercase tracking-wider shadow-[4px_4px_0px_0px_#a855f7] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#a855f7] transition-all"
                                >
                                    <span>Open Deep Dive</span>
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Upcoming Case Studies in Synthesis */}
            <div>
                <div className="mb-8 sm:mb-10">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-purple-600 block mb-3">
                        In Synthesis Pipeline
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-syne font-bold">
                        Upcoming Case Studies
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {upcomingCaseStudies.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.08 }}
                            className="bg-white/95 border-2 border-black rounded-xl p-6 sm:p-7 shadow-[4px_4px_0px_0px_#000] flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                                    <span className="px-3 py-1 bg-purple-50 border border-purple-200 rounded-full text-xs font-mono text-purple-800">
                                        {item.category}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-100 border border-black/20 rounded-full text-[11px] font-syne font-bold uppercase tracking-wider text-black/80">
                                        <Clock size={12} />
                                        In Synthesis
                                    </span>
                                </div>
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-syne font-bold mb-3">{item.title}</h3>
                                <p className="text-sm md:text-base text-black/65 leading-relaxed mb-6">
                                    {item.scope}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-black/10 flex items-center justify-between">
                                <span className="font-mono text-xs text-black/50">Full write-up coming soon</span>
                                <Link
                                    to={`/case-studies/${item.id}`}
                                    className="inline-flex items-center gap-1 font-syne font-bold text-xs uppercase tracking-wider text-black hover:text-purple-600 transition-colors"
                                >
                                    <span>View Brief</span>
                                    <ArrowUpRight size={15} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CaseStudiesPage;
