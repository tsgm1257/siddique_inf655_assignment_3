// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5lt0IlyFoBQrtWPzUupODaExNKuXWv-I",
  authDomain: "taskmanager-1cd93.firebaseapp.com",
  projectId: "taskmanager-1cd93",
  storageBucket: "taskmanager-1cd93.firebasestorage.app",
  messagingSenderId: "709375549392",
  appId: "1:709375549392:web:2ad56378b9e31a517ca3d5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
