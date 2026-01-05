// js/firebase.js
import { initializeApp } from
  "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";

import { getAuth } from
  "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

import { getDatabase } from
  "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

/* 🔥 YOUR FIREBASE CONFIG */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

/* INIT */
const app = initializeApp(firebaseConfig);

/* EXPORTS */
export const auth = getAuth(app);
export const db   = getDatabase(app);
