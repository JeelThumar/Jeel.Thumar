import React from 'react';
import { motion } from 'framer-motion';
import { stats, marqueeItems } from '../data';

const Stats = () => {
    return (
        <section className="w-full bg-white text-black border-y border-black overflow-hidden relative">
            {/* Stats Grid */}
            <div className="max-w-[1400px] mx-auto px-2 lg:px-0">
                <div className="grid grid-cols-4 divide-x divide-black/10">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center justify-center py-6 sm:py-8 md:py-16 px-1">
                            <h3 className="text-2xl sm:text-4xl md:text-6xl font-syne font-black tracking-tighter mix-blend-normal">
                                {stat.value}<span className="text-purple-500">{stat.suffix}</span>
                            </h3>
                            <p className="mt-1 md:mt-2 text-[6px] sm:text-[8px] md:text-xs font-montserrat font-bold tracking-[0.05em] sm:tracking-[0.2em] text-black/40 uppercase text-center">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Marquee Banner */}
            <div className="w-full bg-black py-2 md:py-3 overflow-hidden flex whitespace-nowrap -ml-1 h-10 md:h-16 items-center">
                <motion.div
                    className="flex items-center space-x-8"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 20
                    }}
                >
                    {/* Double the array for seamless loop */}
                    {[...marqueeItems, ...marqueeItems].map((item, index) => (
                        <div key={index} className="flex items-center space-x-8 shrink-0">
                            <span className="text-white text-[10px] md:text-sm font-syne font-semibold tracking-widest uppercase">
                                {item}
                            </span>
                            <span className="text-purple-500 text-sm md:text-lg leading-none mt-[-2px]">
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
