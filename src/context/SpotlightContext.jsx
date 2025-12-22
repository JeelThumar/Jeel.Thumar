import { createContext, useContext, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';

const SpotlightContext = createContext();

export const useSpotlight = () => {
    const context = useContext(SpotlightContext);
    if (!context) {
        throw new Error('useSpotlight must be used within a SpotlightProvider');
    }
    return context;
};

export const SpotlightProvider = ({ children }) => {
    const [color, setColor] = useState("#a855f7"); // Default purple

    return (
        <SpotlightContext.Provider value={{ color, setColor }}>
            {children}
        </SpotlightContext.Provider>
    );
};

export const useSpotlightColor = (targetColor, ref) => {
    const { setColor } = useSpotlight();
    // Using framer-motion's useInView directly might be tricky if we want to pass a ref from outside, 
    // or we can just use a standard IntersectionObserver or assume the component passes a ref.
    // Actually, framer-motion's useInView takes a ref as an argument.

    // But to make it easier for components, let's just make them pass the ref they want to track.
    const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" }); // Trigger when center of element is in view

    useEffect(() => {
        if (isInView) {
            setColor(targetColor);
        }
    }, [isInView, targetColor, setColor]);
};
