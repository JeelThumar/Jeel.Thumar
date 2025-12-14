import { socials } from '../data';
import { Linkedin } from 'lucide-react';

const Socials = () => {
    return (
        <div className="flex gap-6 mt-8">
            {socials.map((social, index) => {
                const Icon = social.icon;
                return (
                    <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-black/5 rounded-full hover:bg-black hover:text-white transition-colors text-black flex items-center justify-center w-11 h-11"
                        aria-label={social.platform}
                    >
                        {Icon ? <Icon size={20} /> : <span className="font-bold text-xs font-syne">{social.text}</span>}
                    </a>
                )
            })}
        </div>
    );
};
export default Socials;
