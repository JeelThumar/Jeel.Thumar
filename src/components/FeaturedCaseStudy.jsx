import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Sparkles, Layers } from 'lucide-react';
import { useSiteData } from '../hooks/useSiteData';
import { useSpotlightColor } from '../context/SpotlightContext';
import Sticker from './Sticker';

const FeaturedCaseStudy = () => {
    const sectionRef = useRef(null);
    useSpotlightColor('#a855f7', sectionRef);
    const { data } = useSiteData();

    const study = (data.caseStudies && data.caseStudies[0]) || null;
    if (!study) return null;

    return (
        <section ref={sectionRef} className="py-16 md:py-24 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto text-black relative overflow-x-clip">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
                <div>
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-purple-600 block mb-2 sm:mb-3">
                        Deep-Dive Case Study
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-syne font-bold leading-tight">
                        Featured Case Study
                    </h2>
                </div>

                <Link to="/case-studies" className="inline-flex items-center gap-2 group self-start md:self-auto">
                    <span className="font-syne font-bold text-base sm:text-lg md:text-xl">All Case Studies</span>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                        <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform duration-300" />
                    </div>
                </Link>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative bg-white border-2 border-black rounded-xl p-5 sm:p-8 md:p-12 shadow-[5px_5px_0px_0px_#000] md:shadow-[8px_8px_0px_0px_#000]"
            >
                <Sticker className="hidden lg:block -top-5 right-8 z-20" rotation={6}>
                    <div className="bg-yellow-400 text-black font-syne font-black text-xs px-3.5 py-2 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center gap-1.5 uppercase tracking-wider">
                        <Sparkles size={14} />
                        <span>65,000+ Publishers</span>
                    </div>
                </Sticker>

                <div className="flex flex-wrap items-center gap-2 mb-5">
                    <span className="px-3 py-1 bg-purple-100 border border-black/15 rounded-full text-[11px] sm:text-xs font-mono font-semibold text-purple-900 uppercase tracking-wider">
                        Internal Tools / B2B
                    </span>
                    <span className="px-3 py-1 bg-black/5 border border-black/10 rounded-full text-[11px] sm:text-xs font-mono text-black/70">
                        {study.client}
                    </span>
                    <span className="px-3 py-1 bg-black/5 border border-black/10 rounded-full text-[11px] sm:text-xs font-mono text-black/70">
                        {study.period}
                    </span>
                </div>

                <h3 className="text-2xl sm:text-4xl md:text-5xl font-syne font-bold leading-tight mb-4">
                    {study.title}
                </h3>

                <p className="text-sm sm:text-base md:text-xl text-black/65 font-medium max-w-3xl leading-relaxed mb-8">
                    {study.summary}
                </p>

                {/* Impact Metrics — clean responsive padding & no text overflow */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 sm:mb-10">
                    {study.metrics.map((metric, idx) => (
                        <div
                            key={idx}
                            className="bg-purple-50/70 border border-black/15 rounded-lg p-5 min-w-0 overflow-hidden"
                        >
                            <div className="text-2xl sm:text-[1.6rem] xl:text-[1.85rem] font-syne font-black text-black leading-none tracking-tight break-words">
                                {metric.value}
                            </div>
                            <div className="text-[11px] sm:text-xs font-syne font-bold uppercase tracking-wider text-purple-700 mt-2">
                                {metric.label}
                            </div>
                            <p className="text-xs sm:text-sm text-black/65 mt-1.5 leading-relaxed">
                                {metric.detail}
                            </p>
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
                            <span>Read Full Case Study</span>
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default FeaturedCaseStudy;
