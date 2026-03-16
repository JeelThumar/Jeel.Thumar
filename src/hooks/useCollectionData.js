import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export const useCollectionData = (collectionName, fallbackData = []) => {
    const [data, setData] = useState(fallbackData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, collectionName));
                const fetchedData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                
                if (fetchedData.length > 0) {
                    setData(fetchedData);
                }
            } catch (error) {
                console.error(`Error fetching ${collectionName} data:`, error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [collectionName]);

    return { data, loading };
};
