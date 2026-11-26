import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import {
  profile,
  coreCompetencies,
  tools,
  capabilityPillars,
  coreProjects,
  liveWebsites,
  caseStudies,
  upcomingCaseStudies,
  projects,
  experiences,
  education,
  certifications,
  blogPosts,
  socials,
  skills,
  languages,
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
        else if (item[platformKey] === 'Dribbble') iconName = 'Dribbble';
        else if (item.label?.includes('Driving')) iconName = 'Car';
        else if (item.label?.includes('Badminton')) iconName = 'Trophy';
        else if (item.label?.includes('Tech')) iconName = 'Cpu';
        else if (item.label?.includes('Exploring')) iconName = 'Compass';
        else if (item.label?.includes('Culinary')) iconName = 'Utensils';

        const newItem = { ...item };
        if (iconName) {
            newItem.icon = iconName;
        } else if (newItem.icon) {
            delete newItem.icon;
        }
        return newItem;
    });
};

const migrateData = async () => {
    try {
        console.log("Starting migration to Firestore (schemaVersion 6)...");

        const projectsRef = collection(db, "projects");
        for (const project of projects) {
            await setDoc(doc(projectsRef, project.id), { ...project, schemaVersion: 6 });
        }
        console.log("Migrated projects.");

        const moreWorkRef = collection(db, "moreWork");
        for (const work of moreWork) {
            await setDoc(doc(moreWorkRef, work.id), { ...work, schemaVersion: 6 });
        }
        console.log("Migrated moreWork.");

        const blogPostsRef = collection(db, "blogPosts");
        for (const post of blogPosts) {
            await setDoc(doc(blogPostsRef, post.id.toString()), { ...post, schemaVersion: 6 });
        }
        console.log("Migrated blogPosts.");

        const siteDataRef = doc(db, "siteData", "general");
        await setDoc(siteDataRef, {
            schemaVersion: 6,
            profile,
            heroBio: profile.heroBio,
            coreCompetencies,
            tools,
            capabilityPillars,
            coreProjects,
            liveWebsites,
            caseStudies,
            upcomingCaseStudies,
            experiences,
            education,
            certifications,
            socials: convertIconsToStrings(socials),
            skills,
            languages,
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
