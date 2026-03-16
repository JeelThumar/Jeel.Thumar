import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import {
  projects,
  experiences,
  education,
  certifications,
  blogPosts,
  socials,
  skills,
  moreWork,
  interests,
  stats,
  marqueeItems
} from '../src/data/index.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA63xRdfoLjw3YiRsnzj7FdK2FHNoKEXpE",
  authDomain: "portfolio-dda80.firebaseapp.com",
  projectId: "portfolio-dda80",
  storageBucket: "portfolio-dda80.firebasestorage.app",
  messagingSenderId: "1039204165457",
  appId: "1:1039204165457:web:d39840226cee8e82105570",
  measurementId: "G-DXQSMGHWVJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Helper to convert Icon components to string names for DB storage
const convertIconsToStrings = (arr, platformKey = 'platform') => {
    return arr.map(item => {
        let iconName = null;
        if (item[platformKey] === 'LinkedIn') iconName = 'Linkedin';
        else if (item[platformKey] === 'Instagram') iconName = 'Instagram';
        else if (item[platformKey] === 'Figma') iconName = 'Figma';
        else if (item.label === 'Driving') iconName = 'Car';
        else if (item.label === 'Badminton') iconName = 'Trophy';
        else if (item.label === 'Tech') iconName = 'Cpu';
        
        const newItem = { ...item };
        if (iconName) {
            newItem.icon = iconName;
        } else if (newItem.icon) {
            delete newItem.icon; // Remove complex component objects if we can't map them
        }
        return newItem;
    });
};

const migrateData = async () => {
    try {
        console.log("Starting migration to Firestore...");

        // 1. Migrate Collections (Arrays of objects with IDs or indices)
        
        // Projects
        const projectsRef = collection(db, "projects");
        for (const project of projects) {
            await setDoc(doc(projectsRef, project.id), project);
        }
        console.log("Migrated projects.");

        // More Work
        const moreWorkRef = collection(db, "moreWork");
        for (const work of moreWork) {
            await setDoc(doc(moreWorkRef, work.id), work);
        }
        console.log("Migrated moreWork.");

        // Blog Posts
        const blogPostsRef = collection(db, "blogPosts");
        for (const post of blogPosts) {
            // Firestore IDs must be strings
            await setDoc(doc(blogPostsRef, post.id.toString()), post);
        }
        console.log("Migrated blogPosts.");

        // 2. Migrate Single Document Arrays (Store entire array in one document)
        // This is easier for small lists like experiences, education, etc.
        const siteDataRef = doc(db, "siteData", "general");
        
        await setDoc(siteDataRef, {
            experiences,
            education,
            certifications,
            socials: convertIconsToStrings(socials),
            skills,
            interests: convertIconsToStrings(interests, 'label'),
            stats,
            marqueeItems
        }, { merge: true });
        
        console.log("Migrated siteData.");

        console.log("Migration completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    }
};

migrateData();
