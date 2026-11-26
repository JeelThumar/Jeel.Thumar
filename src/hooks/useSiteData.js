import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

// Fallback static data
import {
    profile,
    coreCompetencies,
    tools,
    capabilityPillars,
    coreProjects,
    liveWebsites,
    caseStudies,
    upcomingCaseStudies,
    skills,
    languages,
    interests,
    stats,
    experiences,
    education,
    certifications,
    marqueeItems,
    socials
} from '../data';

export const useSiteData = () => {
    const [data, setData] = useState({
        profile,
        heroBio: profile.heroBio,
        coreCompetencies,
        tools,
        capabilityPillars,
        coreProjects,
        liveWebsites,
        caseStudies,
        upcomingCaseStudies,
        skills,
        languages,
        interests,
        stats,
        experiences,
        education,
        certifications,
        marqueeItems,
        socials
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (import.meta.env.VITE_CONTENT_SOURCE === 'local') {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const docRef = doc(db, "siteData", "general");
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const cloudData = docSnap.data();
                    // Only apply cloud overrides if migrated/saved under v6+ schema
                    if (cloudData.schemaVersion >= 6) {
                        setData(prevData => ({
                            ...prevData,
                            ...cloudData
                        }));
                    }
                }
            } catch (error) {
                console.error("Error fetching site data (using local fallback):", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading };
};
