// Firebase configuration for InsightEdge
// This file prepares Firebase for future features like authentication and database

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const isValidFirebaseField = (value: string | undefined) => {
    return Boolean(value) && !value.includes('YOUR_') && !value.includes('example');
};

const shouldInitializeFirebase = [
    firebaseConfig.apiKey,
    firebaseConfig.authDomain,
    firebaseConfig.projectId,
    firebaseConfig.storageBucket,
    firebaseConfig.messagingSenderId,
    firebaseConfig.appId,
].every(isValidFirebaseField) && firebaseConfig.apiKey.startsWith('AIza');

// Initialize Firebase only if config looks valid
const app = shouldInitializeFirebase ? initializeApp(firebaseConfig) : null;

// Export services for future use
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export const googleProvider = app ? new GoogleAuthProvider() : null;
export default app;
