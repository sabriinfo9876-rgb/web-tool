// Firebase Client SDK Initializer
// Environment-safe configuration supporting VITE_ env variables with safe fallbacks
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import defaultConfigFile from "../firebase-applet-config.json" with { type: "json" };

const defaultCfg = defaultConfigFile || {};

const env = typeof import.meta !== "undefined" && import.meta.env ? import.meta.env : {};

export const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || defaultCfg.apiKey || "",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || defaultCfg.authDomain || "",
  projectId: env.VITE_FIREBASE_PROJECT_ID || defaultCfg.projectId || "",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || defaultCfg.storageBucket || "",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || defaultCfg.messagingSenderId || "",
  appId: env.VITE_FIREBASE_APP_ID || defaultCfg.appId || "",
};

const databaseId = env.VITE_FIREBASE_DATABASE_ID || defaultCfg.firestoreDatabaseId || undefined;

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app, databaseId);
export const auth = getAuth(app);

