import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { blogPosts } from '../data';
import { useEffect } from 'react';

const BlogPost = () => {
    const { id } = useParams();
    const post = blogPosts.find(p => p.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Post not found</h2>
                    <Link to="/" className="text-purple-600 hover:underline">Go Home</Link>
                </div>
            </div>
        );
    }

    return (
        <article className="min-h-screen pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
                <Link to="/blog" className="inline-flex items-center gap-2 text-black/60 hover:text-black transition-colors mb-12 group">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Blog
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="font-mono text-purple-600 mb-4 block">{post.date}</span>
                    <h1 className="text-4xl md:text-6xl font-syne font-bold leading-tight mb-8">
                        {post.title}
                    </h1>

                    <div className="aspect-video w-full bg-gray-100 rounded-2xl overflow-hidden mb-12">
                        <motion.img
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.8 }}
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="prose prose-lg md:prose-xl max-w-none font-sans text-black/80 leading-relaxed space-y-6">
                        {post.content.map((paragraph, index) => (
                            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                        ))}
                    </div>
                </motion.div>
            </div>
        </article>
    );
};

export default BlogPost;
