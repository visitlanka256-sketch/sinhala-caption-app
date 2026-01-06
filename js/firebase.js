// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDghETttXFNP4NPH8Sfpsf6fCvQ4NHN45o",
  authDomain: "sinhalacaptionhub.firebaseapp.com",
  databaseURL: "https://sinhalacaptionhub-default-rtdb.firebaseio.com",
  projectId: "sinhalacaptionhub",
  storageBucket: "sinhalacaptionhub.firebasestorage.app",
  messagingSenderId: "852993684108",
  appId: "1:852993684108:web:eab802c0685a7e9fd581a9"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
