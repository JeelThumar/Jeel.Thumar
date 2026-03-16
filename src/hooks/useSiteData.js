import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

// Fallback static data
import {
    skills,
    interests,
    stats,
    experiences,
    education,
    marqueeItems,
    socials
} from '../data';

export const useSiteData = () => {
    const [data, setData] = useState({
        skills,
        interests,
        stats,
        experiences,
        education,
        marqueeItems,
        socials
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, "siteData", "general");
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    // Merge fetched data with the initial state structure
                    setData(prevData => ({
                        ...prevData,
                        ...docSnap.data()
                    }));
                }
            } catch (error) {
                console.error("Error fetching site data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading };
};
