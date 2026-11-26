import { useSiteData } from '../hooks/useSiteData';
import { Linkedin, Instagram, Figma, Dribbble } from 'lucide-react';

const ICON_MAP = {
    Linkedin,
    Instagram,
    Figma,
    Dribbble
};

const resolveIcon = (iconOrName, platform) => {
    if (typeof iconOrName === 'string' && ICON_MAP[iconOrName]) {
        return ICON_MAP[iconOrName];
    }
    if (iconOrName && (typeof iconOrName === 'function' || typeof iconOrName === 'object')) {
        return iconOrName;
    }
    if (platform && ICON_MAP[platform]) {
        return ICON_MAP[platform];
    }
    return null;
};

const Socials = () => {
    const { data } = useSiteData();

    return (
        <div className="flex flex-wrap gap-3 sm:gap-4 mt-4 sm:mt-6">
            {data.socials.map((social, index) => {
                const Icon = resolveIcon(social.icon, social.platform);
                return (
                    <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-black/5 border border-black/10 rounded-full hover:bg-black hover:text-white transition-colors text-black flex items-center justify-center w-11 h-11"
                        aria-label={social.platform}
                        title={social.platform}
                    >
                        {Icon ? <Icon size={20} strokeWidth={2} /> : <span className="font-bold text-xs font-syne">{social.text || social.platform?.slice(0, 2)}</span>}
                    </a>
                );
            })}
        </div>
    );
};
export default Socials;
