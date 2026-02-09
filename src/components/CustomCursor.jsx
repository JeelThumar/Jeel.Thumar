import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Detect touch device
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isVisible]);

    // Don't render anything on touch devices
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
        return null;
    }

    return (
        <motion.div
            className="hidden md:block fixed top-0 left-0 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference"
            animate={{
                x: mousePosition.x - (isHovering ? 24 : 12),
                y: isVisible ? mousePosition.y - (isHovering ? 24 : 12) : window.innerHeight - 24, // Drop to bottom edge
                width: isHovering ? 48 : 24,
                height: isHovering ? 48 : 24,
                opacity: 1 // Always visible (or use isVisible ? 1 : 0.5 for effect)
            }}
            transition={{
                type: 'spring',
                mass: isVisible ? 0.1 : 1.2, // Heavy when falling
                stiffness: isVisible ? 800 : 80, // Loose when falling
                damping: isVisible ? 30 : 15 // Minimal damping for bounce
            }}
        />
    );
};

export default CustomCursor;
