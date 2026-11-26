import Hero from '../components/Hero';
import Stats from '../components/Stats';
import FeaturedCaseStudy from '../components/FeaturedCaseStudy';
import CoreProjects from '../components/CoreProjects';
import Work from '../components/Work';
import Experience from '../components/Experience';
import Expertise from '../components/Expertise';
import Education from '../components/Education';
import Certifications from '../components/Certifications';
import Blog from '../components/Blog';

const Home = () => {
    return (
        <>
            <Hero />
            <Stats />
            <FeaturedCaseStudy />
            <CoreProjects coreLimit={6} showLiveWebsites={true} />
            <Work limit={4} />
            <Expertise />
            <Experience />
            <Education />
            <Certifications />
            <Blog limit={3} />
        </>
    );
};
export default Home;
