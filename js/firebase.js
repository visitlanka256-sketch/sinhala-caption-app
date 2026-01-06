// js/firebase.js (CDN version – GitHub Pages compatible)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

/* 🔥 YOUR REAL FIREBASE CONFIG */
const firebaseConfig = {
  apiKey: "AIzaSyDghETttXFNP4NPH8Sfpsf6fCvQ4NHN45o",
  authDomain: "sinhalacaptionhub.firebaseapp.com",
  databaseURL: "https://sinhalacaptionhub-default-rtdb.firebaseio.com",
  projectId: "sinhalacaptionhub",
  storageBucket: "sinhalacaptionhub.firebasestorage.app",
  messagingSenderId: "852993684108",
  appId: "1:852993684108:web:f54dc56ff462ebeed581a9"
};

/* ✅ INIT */
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
