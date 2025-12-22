import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import CustomCursor from '../components/CustomCursor';
import Spotlight from '../components/Spotlight';
import Navbar from '../components/Navbar';
import GrainOverlay from '../components/GrainOverlay';
import Contact from '../components/Contact';
import { ReactLenis, useLenis } from 'lenis/react';
import { Outlet } from 'react-router-dom';

import { useSpotlight } from '../context/SpotlightContext';

const Layout = () => {
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const location = useLocation();
    const lenis = useLenis();
    const { color } = useSpotlight();

    useEffect(() => {
        const handleScroll = () => {
            // Back to Top visibility
            if (window.scrollY > 300) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }

            // Navbar visibility (hide only at the very bottom)
            const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
            setIsNavbarVisible(!isAtBottom);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll to top on route change
    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo(0, 0);
        }
    }, [location.pathname, lenis]);

    const scrollToTop = () => {
        if (lenis) {
            lenis.scrollTo(0, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <ReactLenis root>
            <div className="relative w-full overflow-x-hidden min-h-screen flex flex-col">
                <CustomCursor />

                {/* Global Grid Background */}
                <div className="fixed inset-0 pointer-events-none z-[-5] opacity-40 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                {/* Global Spotlight Effect */}
                <div className="fixed inset-0 pointer-events-none z-[-4]">
                    <Spotlight color={color} />
                </div>

                <GrainOverlay />
                <Navbar isVisible={isNavbarVisible} />
                <main className="flex-grow">
                    <Outlet />
                </main>
                <Contact />

                <AnimatePresence>
                    {showBackToTop && (
                        <motion.button
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={scrollToTop}
                            className="fixed bottom-8 right-8 z-50 p-4 bg-black text-white rounded-full shadow-lg border border-white/20 hover:bg-gray-900 transition-colors"
                        >
                            <ArrowUp size={20} />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </ReactLenis>
    );
};
export default Layout;
