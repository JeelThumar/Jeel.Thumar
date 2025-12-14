import { motion } from 'framer-motion';

const Sticker = ({ children, className, delay = 0, rotation = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: rotation, y: 0 }}
            transition={{
                delay: delay,
                duration: 0.5,
                type: "spring",
                stiffness: 260,
                damping: 20
            }}
            whileHover={{
                scale: 1.1,
                rotate: [rotation - 5, rotation + 5, rotation - 5],
                y: [0, -15, 0],
                transition: {
                    rotate: {
                        repeat: Infinity,
                        duration: 6,
                        ease: "easeInOut"
                    },
                    y: {
                        repeat: Infinity,
                        duration: 4,
                        ease: "easeInOut"
                    }
                }
            }}

            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.2}
            className={`absolute select-none cursor-grab active:cursor-grabbing ${className}`}
        >
            {children}
        </motion.div>
    );
};
export default Sticker;
