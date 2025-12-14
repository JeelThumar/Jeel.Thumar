import { useState, useEffect } from 'react';

const Spotlight = ({ color = "#a855f7", className = "" }) => {
    return (
        <SpotlightRenderer color={color} className={className} />
    );
};

const SpotlightRenderer = ({ color, className }) => {
    const [style, setStyle] = useState({ x: -1000, y: -1000 });
    const [ref, setRef] = useState(null);

    useEffect(() => {
        if (!ref) return;

        const handleMouseMove = (e) => {
            const rect = ref.getBoundingClientRect();
            // Calculate mouse position relative to the element
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            setStyle({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [ref]);

    return (
        <div ref={setRef} className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 ${className}`}>
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                    maskImage: `radial-gradient(300px circle at ${style.x}px ${style.y}px, black, transparent)`,
                    WebkitMaskImage: `radial-gradient(300px circle at ${style.x}px ${style.y}px, black, transparent)`,
                    opacity: 0.6
                }}
            />
            {/* Glow */}
            <div
                className="absolute inset-0 z-[-1]"
                style={{
                    background: `radial-gradient(400px circle at ${style.x}px ${style.y}px, ${color}10, transparent 60%)`
                }}
            />
        </div>
    );
}

export default Spotlight;
