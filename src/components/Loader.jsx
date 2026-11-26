import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';

const STATUS_STEPS = [
    { at: 0, label: 'Initializing canvas...' },
    { at: 35, label: 'Loading design systems...' },
    { at: 70, label: 'Polishing interactions...' },
    { at: 95, label: 'Ready to explore' }
];

const Loader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const shouldReduceMotion = useReducedMotion();
    const onCompleteRef = useRef(onComplete);
    onCompleteRef.current = onComplete;

    useEffect(() => {
        if (shouldReduceMotion) {
            setProgress(100);
            const timer = setTimeout(() => onCompleteRef.current?.(), 150);
            return () => clearTimeout(timer);
        }

        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += Math.floor(Math.random() * 8) + 5;
            if (currentProgress >= 100) {
                currentProgress = 100;
                setProgress(100);
                clearInterval(interval);
                setTimeout(() => {
                    onCompleteRef.current?.();
                }, 320);
            } else {
                setProgress(currentProgress);
            }
        }, 28);

        return () => clearInterval(interval);
    }, [shouldReduceMotion]);

    const currentStatus =
        [...STATUS_STEPS].reverse().find((step) => progress >= step.at)?.label ||
        STATUS_STEPS[0].label;

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-5 bg-white text-black overflow-hidden"
            initial={{ y: 0, opacity: 1 }}
            exit={{
                y: '-100%',
                transition: {
                    duration: 0.65,
                    ease: [0.76, 0, 0.24, 1]
                }
            }}
        >
            {/* Matching subtle grid paper background */}
            <div className="absolute inset-0 pointer-events-none opacity-50 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Soft purple ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[460px] h-[320px] sm:h-[460px] bg-purple-300/25 rounded-full blur-[90px] pointer-events-none" />

            {/* Design Frame / Selection Box */}
            <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -16 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full max-w-md bg-white border-2 border-black rounded-xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000]"
            >
                {/* Figma-style corner selection handles */}
                <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-purple-600" />
                <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-purple-600" />
                <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-purple-600" />
                <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-purple-600" />

                {/* Floating dimension / role tag */}
                <div className="absolute -top-3.5 left-4 bg-yellow-300 border-2 border-black rounded-full px-3 py-0.5 flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#000]">
                    <Sparkles size={12} className="text-black" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
                        Portfolio · v6
                    </span>
                </div>

                {/* Animated Wordmark */}
                <div className="pt-2 pb-5 text-center">
                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                            className="text-5xl sm:text-6xl font-syne font-black tracking-tight uppercase leading-none"
                        >
                            JEEL<span className="text-purple-600">.</span>
                        </motion.h1>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-2 font-syne font-bold text-xs sm:text-sm uppercase tracking-[0.22em] text-black/60"
                    >
                        Product Designer
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-2 font-hand text-sm text-purple-600"
                    >
                        “An explorer’s curiosity. A designer’s eye.”
                    </motion.p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2.5">
                    <div className="w-full h-3.5 bg-black/5 border-2 border-black rounded-full overflow-hidden p-0.5">
                        <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-purple-500 via-purple-600 to-yellow-400"
                            initial={{ width: '0%' }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: 'easeOut', duration: 0.12 }}
                        />
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-black/65 truncate pr-2">{currentStatus}</span>
                        <span className="font-bold text-black shrink-0 tabular-nums">
                            {String(progress).padStart(2, '0')}%
                        </span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Loader;
