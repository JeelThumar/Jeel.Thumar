import { motion } from 'framer-motion';
import Socials from './Socials';
import Sticker from './Sticker';
import { ArrowDown } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-12 px-4 relative overflow-visible text-black mt-20">

            {/* Decorative Elements */}
            {/* Grid moved to global layout */}

            <Sticker className="top-[0%] left-[5%] text-black z-20" rotation={-10}>
                <div className="bg-purple-500 text-white font-bold text-xs p-2 rounded shadow-[2px_2px_0px_0px_#000]">
                    OPEN FOR WORK
                </div>
            </Sticker>

            <div className="max-w-4xl w-full mx-auto relative z-10">
                <div className="bg-white p-6 md:p-8 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_#000] relative">
                    {/* Notebook Spiral */}
                    <div className="absolute top-0 left-0 w-full h-8 flex justify-evenly -mt-4">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="w-3 h-6 bg-[#ddd] rounded-full ring-2 ring-black bg-[linear-gradient(45deg,transparent_40%,#999_40%,#999_60%,transparent_60%)]"></div>
                        ))}
                    </div>

                    <div className="text-center mb-8 mt-2">
                        <h2 className="text-3xl md:text-5xl font-syne font-bold mb-2 text-black">
                            Let's Create <br />
                            <span className="text-yellow-500">Something Epic</span>
                        </h2>
                        <p className="text-lg text-black/60 font-hand -rotate-1">
                            Got an idea? Let's chat! ☕️
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-6">
                        <a href="mailto:jeelthumar26@gmail.com"
                            className="group relative inline-flex items-center justify-center px-8 py-3 bg-black text-white text-lg font-bold font-syne uppercase tracking-wider rounded-lg hover:-translate-y-1 hover:translate-x-1 hover:shadow-none transition-all shadow-[4px_4px_0px_0px_#3b82f6]">
                            Connect Me
                            <ArrowDown className="ml-2 w-4 h-4 group-hover:rotate-[-45deg] transition-transform" />
                        </a>

                        <div className="w-full h-px bg-black/10 my-4" />

                        <div className="flex flex-col items-center">
                            <p className="font-mono text-xs text-black/40 mb-2">OR FIND ME ON</p>
                            <Socials />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="font-mono text-black/30 text-[10px] uppercase tracking-widest">
                        © {new Date().getFullYear()} Jeel Thumar. All rights reserved. <br />
                        Designed & Built with 💛
                    </p>
                </div>
            </div>
        </section>
    );
};
export default Contact;
