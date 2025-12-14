import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Loader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += Math.floor(Math.random() * 5) + 2;
            if (currentProgress > 100) currentProgress = 100;

            setProgress(currentProgress);

            if (currentProgress === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    if (onComplete) onComplete();
                }, 600);
            }
        }, 30);

        return () => clearInterval(interval);
    }, []);

    const blindsCount = 5;

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center pointer-events-none"
            initial="initial"
            animate="enter"
            exit="exit"
        >
            {/* Blinds Container - The Exit Animation */}
            <div className="absolute inset-0 flex h-full w-full pointer-events-auto">
                {[...Array(blindsCount)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="h-full bg-black relative border-r border-white/5 last:border-none"
                        style={{ width: `${100 / blindsCount}%` }}
                        initial={{ height: "100%" }}
                        exit={{
                            height: "0%",
                            transition: {
                                duration: 0.8,
                                ease: [0.76, 0, 0.24, 1],
                                delay: i * 0.1
                            }
                        }}
                    />
                ))}
            </div>

            {/* Content Overlay - Scales out on exit */}
            <motion.div
                className="relative z-10 text-white flex flex-col items-center mix-blend-difference"
                exit={{
                    opacity: 0,
                    scale: 0.9,
                    transition: { duration: 0.4 }
                }}
            >
                {/* Liquid Fill Text Effect */}
                <div className="relative">
                    {/* Outline / Empty Text */}
                    <h1 className="text-[12vw] font-syne font-bold leading-none tracking-tighter text-transparent stroke-white"
                        style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>
                        JEEL
                    </h1>

                    {/* Filled Text - Masked by height */}
                    <div
                        className="absolute bottom-0 left-0 w-full overflow-hidden transition-all duration-100 ease-linear"
                        style={{ height: `${progress}%` }}
                    >
                        <h1 className="text-[12vw] font-syne font-bold leading-none tracking-tighter text-white absolute bottom-0 left-0 w-full">
                            JEEL
                        </h1>
                    </div>
                </div>

                {/* Minimal Counter */}
                <div className="flex items-center gap-4 mt-4 opacity-50">
                    <span className="font-mono text-xl">{progress}%</span>
                </div>
            </motion.div>
        </motion.div>
    );
};
export default Loader;
