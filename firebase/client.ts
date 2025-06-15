// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCZmrUnEyubtwBUTJdu60_5eY6gFLE4dwA",
    authDomain: "aiinterviewer-e099f.firebaseapp.com",
    projectId: "aiinterviewer-e099f",
    storageBucket: "aiinterviewer-e099f.firebasestorage.app",
    messagingSenderId: "718141666460",
    appId: "1:718141666460:web:1afa79f9dbd8c29526a959",
    measurementId: "G-BW4Z44MY92"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
