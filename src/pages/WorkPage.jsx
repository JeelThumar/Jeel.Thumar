import CoreProjects from '../components/CoreProjects';
import Work from '../components/Work';

const WorkPage = () => {
    return (
        <div className="pt-24 sm:pt-28 min-h-screen">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 mb-4">
                <h1 className="text-4xl sm:text-5xl md:text-8xl font-syne font-bold uppercase leading-[0.9] tracking-tighter">
                    Selected <br className="hidden md:block" />
                    <span className="text-transparent stroke-black [-webkit-text-stroke:1.5px_black]">Works</span>
                </h1>
            </div>
            <CoreProjects showCoreProjects={true} showLiveWebsites={true} />
            <Work />
        </div>
    );
};
export default WorkPage;
