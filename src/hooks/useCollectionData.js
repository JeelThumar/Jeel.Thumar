import { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export const useCollectionData = (collectionName, fallbackData = []) => {
    const [data, setData] = useState(fallbackData);
    const [loading, setLoading] = useState(true);
    const fallbackRef = useRef(fallbackData);
    fallbackRef.current = fallbackData;

    useEffect(() => {
        if (import.meta.env.VITE_CONTENT_SOURCE === 'local') {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, collectionName));
                const fetchedData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                const baseline = fallbackRef.current;

                if (fetchedData.length > 0) {
                    const cloudById = new Map(
                        fetchedData.map(item => [String(item.id), item])
                    );

                    // Merge baseline local items with v6+ cloud overrides, then append new cloud-only items
                    const mergedBaseline = baseline.map(localItem => {
                        const cloudItem = cloudById.get(String(localItem.id));
                        if (cloudItem && cloudItem.schemaVersion >= 6) {
                            return { ...localItem, ...cloudItem };
                        }
                        return localItem;
                    });

                    const baselineIds = new Set(baseline.map(item => String(item.id)));
                    const extraCloudItems = fetchedData.filter(
                        item => !baselineIds.has(String(item.id))
                    );

                    setData([...mergedBaseline, ...extraCloudItems]);
                }
            } catch (error) {
                console.error(`Error fetching ${collectionName} data (using local fallback):`, error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [collectionName]);

    return { data, loading };
};
