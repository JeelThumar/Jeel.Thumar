import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useOutletContext } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
    const { setIsNavbarPersistentHidden } = useOutletContext();

    useEffect(() => {
        setIsNavbarPersistentHidden(true);
        return () => setIsNavbarPersistentHidden(false);
    }, [setIsNavbarPersistentHidden]);

    return (
        <div className="h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
            {/* Animated Background Elements */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-black rounded-full blur-[120px] pointer-events-none"
            />

            <div className="relative z-10">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.h1 
                        className="text-[12rem] md:text-[18rem] font-black leading-none tracking-tighter text-black/5 selection:bg-black selection:text-white"
                        animate={{ 
                            y: [0, -20, 0],
                            rotate: [0, -2, 0, 2, 0]
                        }}
                        transition={{ 
                            duration: 6, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                        }}
                    >
                        404
                    </motion.h1>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="-mt-12 md:-mt-20"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                        Lost in the digital void?
                    </h2>
                    <p className="text-gray-500 text-lg md:text-xl max-w-md mx-auto mb-10 leading-relaxed">
                        The page you are looking for has been moved, deleted, or never existed in this dimension.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-medium overflow-hidden transition-all hover:shadow-2xl hover:shadow-black/20"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <Home size={18} />
                                    Back to Home
                                </span>
                                <motion.div 
                                    className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                                />
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-black/40">Scroll to Contact</span>
                <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-[1px] h-10 bg-gradient-to-b from-black/40 to-transparent"
                />
            </motion.div>

            {/* Playful Floating Objects */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute hidden md:block w-4 h-4 border-2 border-black/10 rounded-full"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -50, 0],
                        x: [0, 30, 0],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 5 + Math.random() * 5,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 2,
                    }}
                />
            ))}
        </div>
    );
};

export default NotFound;
