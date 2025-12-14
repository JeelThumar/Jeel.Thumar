import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import { blogPosts } from '../data';

import { useState, useEffect } from 'react';

import Spotlight from './Spotlight';

const Blog = ({ limit }) => {
    const [headerHovered, setHeaderHovered] = useState(false);
    const [hoveredPost, setHoveredPost] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Reverse posts to show newest first, then slice if limit exists
    const displayPosts = [...blogPosts].reverse().slice(0, limit || blogPosts.length);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto text-black relative overflow-visible mb-24">
            <Spotlight color="#eab308" />
            <div className="flex justify-between items-end mb-16 relative z-10">
                <h2 className="text-4xl md:text-8xl font-syne font-bold uppercase leading-[0.8] tracking-tighter mix-blend-difference text-black">
                    Recent <br /> <span className="text-transparent stroke-black [-webkit-text-stroke:1px_black]">Thoughts</span>
                </h2>

                {limit && (
                    <Link to="/blog" className="hidden md:flex items-center gap-2 group">
                        <span className="font-syne font-bold text-xl">View All</span>
                        <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                            <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                        </div>
                    </Link>
                )}
            </div>

            {/* Floating Image Preview */}
            <motion.div
                className="fixed pointer-events-none z-50 hidden md:block overflow-hidden rounded-lg shadow-2xl"
                animate={{
                    x: mousePos.x,
                    y: mousePos.y,
                    opacity: hoveredPost ? 1 : 0,
                    scale: hoveredPost ? 1 : 0.5,
                }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                    mass: 0.1
                }}
                style={{
                    top: -150, // Offset to center on cursor
                    left: 20,
                    width: 300,
                    height: 200,
                }}
            >
                {hoveredPost && (
                    <img
                        src={hoveredPost.image}
                        alt={hoveredPost.title}
                        className="w-full h-full object-cover"
                    />
                )}
            </motion.div>

            <div className="space-y-12 relative z-10 w-full max-w-4xl">
                {displayPosts.map((post, index) => (
                    <div key={post.id} className="border-b border-black/10 pb-12 last:border-none">
                        <Link
                            to={`/blog/${post.id}`}
                            className="block group cursor-pointer"
                            onMouseEnter={() => setHoveredPost(post)}
                            onMouseLeave={() => setHoveredPost(null)}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="flex flex-col gap-4">
                                    <h3 className="text-3xl md:text-4xl font-syne font-bold transition-all duration-300 relative z-10 text-black leading-tight">
                                        {post.title}
                                    </h3>

                                    <p className="text-black/60 font-sans text-lg leading-relaxed max-w-2xl relative z-0">
                                        {post.excerpt}
                                    </p>

                                    <div className="mt-4">
                                        <span className="inline-block px-6 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-black/80 transition-colors">
                                            Read more
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    </div>
                ))}
            </div>

            {limit && (
                <div className="md:hidden mt-12 flex justify-center">
                    <Link to="/blog" className="inline-flex items-center gap-2 group">
                        <span className="font-syne font-bold text-lg">View All Blogs</span>
                        <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                            <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                        </div>
                    </Link>
                </div>
            )}

        </section>
    );
};
export default Blog;
