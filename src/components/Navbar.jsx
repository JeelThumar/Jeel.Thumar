import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Home, Briefcase, PenTool, Mail } from 'lucide-react';
import { useLenis } from 'lenis/react';

const Navbar = ({ isVisible }) => {
    const location = useLocation();
    const lenis = useLenis();

    const handleContactClick = (e) => {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            if (lenis) {
                lenis.scrollTo(contactSection, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
            } else {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const navItems = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/work', label: 'Work', icon: Briefcase },
        { path: '/blog', label: 'Blog', icon: PenTool },
        { path: '#contact', label: 'Contact', icon: Mail, onClick: handleContactClick },
    ];

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed bottom-6 md:bottom-auto md:top-8 left-1/2 -translate-x-1/2 z-50 w-auto">
                    <motion.nav
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="flex items-center gap-2 p-2 bg-white/80 backdrop-blur-md border border-black/10 rounded-full shadow-lg"
                    >
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            const Icon = item.icon;

                            // Render custom button for Contact
                            if (item.onClick) {
                                return (
                                    <button
                                        key={item.label}
                                        onClick={item.onClick}
                                        className="relative px-4 py-2 rounded-full transition-all group flex items-center gap-2 text-black hover:bg-black/5 cursor-pointer"
                                        aria-label={item.label}
                                    >
                                        <Icon size={18} />
                                        <span className="text-sm font-medium hidden md:block">{item.label}</span>
                                    </button>
                                );
                            }

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`relative px-4 py-2 rounded-full transition-all group flex items-center gap-2 ${isActive
                                        ? 'bg-black text-white'
                                        : 'text-black hover:bg-black/5'
                                        }`}
                                    aria-label={item.label}
                                >
                                    <Icon size={18} />
                                    <span className="text-sm font-medium hidden md:block">{item.label}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-transparent rounded-full"
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            )
                        })}
                    </motion.nav>
                </div>
            )}
        </AnimatePresence>
    );
};
export default Navbar;
