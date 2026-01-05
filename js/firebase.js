import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";

import { getAuth } from
"https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

import { getDatabase } from
"https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "PASTE_HERE",
  authDomain: "PASTE_HERE",
  databaseURL: "PASTE_HERE",
  projectId: "PASTE_HERE",
  storageBucket: "PASTE_HERE",
  messagingSenderId: "PASTE_HERE",
  appId: "PASTE_HERE"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);

