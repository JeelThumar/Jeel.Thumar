import { motion } from 'framer-motion';
import { useSiteData } from '../hooks/useSiteData';
import { Layers, Workflow, Sparkles, Compass } from 'lucide-react';

const FOCUS_HIGHLIGHTS = [
    {
        icon: Layers,
        title: "Product & UX Strategy",
        subtitle: "Web, Mobile & Commerce",
        accent: "bg-purple-100 text-purple-700"
    },
    {
        icon: Workflow,
        title: "Enterprise Admin Systems",
        subtitle: "Multi-role & Internal Tools",
        accent: "bg-yellow-100 text-yellow-800"
    },
    {
        icon: Sparkles,
        title: "Design Systems & Figma",
        subtitle: "Tokens & Interactive Flows",
        accent: "bg-pink-100 text-pink-700"
    },
    {
        icon: Compass,
        title: "End-to-End Ownership",
        subtitle: "Discovery to Shipped UI",
        accent: "bg-cyan-100 text-cyan-800"
    }
];

const Stats = () => {
    const { data } = useSiteData();
    const marqueeItems = data.marqueeItems || [];

    return (
        <section className="w-full bg-white text-black border-y border-black overflow-hidden relative">
            {/* Qualitative Focus Strip (No Numbers) */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-black/10">
                    {FOCUS_HIGHLIGHTS.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={index}
                                className="flex items-center gap-4 py-5 sm:py-7 md:py-9 px-2 sm:px-5"
                            >
                                <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-lg border border-black/15 flex items-center justify-center shrink-0 ${item.accent}`}>
                                    <Icon size={20} />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-sm sm:text-base font-syne font-bold text-black leading-tight">
                                        {item.title}
                                    </h3>
                                    <p className="mt-0.5 text-xs font-montserrat font-medium text-black/55">
                                        {item.subtitle}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Marquee Banner */}
            <div className="w-full bg-black py-2.5 md:py-3.5 overflow-hidden flex whitespace-nowrap items-center">
                <motion.div
                    className="flex items-center space-x-6 sm:space-x-8"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 22
                    }}
                >
                    {[...marqueeItems, ...marqueeItems].map((item, index) => (
                        <div key={index} className="flex items-center space-x-6 sm:space-x-8 shrink-0">
                            <span className="text-white text-[11px] md:text-sm font-syne font-semibold tracking-widest uppercase">
                                {item}
                            </span>
                            <span className="text-purple-400 text-sm md:text-lg leading-none">
                                &bull;
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Stats;
