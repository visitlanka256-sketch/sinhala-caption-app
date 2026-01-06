// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAODNsLvrVieXeSVIj2Wd4o1jJO7n_sg6k",
  authDomain: "sinhala-caption-app.firebaseapp.com",
  databaseURL: "https://sinhala-caption-app-default-rtdb.firebaseio.com",
  projectId: "sinhala-caption-app",
  storageBucket: "sinhala-caption-app.firebasestorage.app",
  messagingSenderId: "534197636566",
  appId: "1:534197636566:web:aa8767b5b8e21eb3e66877"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
