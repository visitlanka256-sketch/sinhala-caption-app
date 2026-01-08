import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

export const firebaseConfig = {
  apiKey: "AIzaSyD_CBwtnOiU4zta9hQOAV_Pybxju0cYlEg",
  authDomain: "sinhala-caption-app-e8ae2.firebaseapp.com",
  databaseURL: "https://sinhala-caption-app-e8ae2-default-rtdb.firebaseio.com",
  projectId: "sinhala-caption-app-e8ae2",
  storageBucket: "sinhala-caption-app-e8ae2.appspot.com",
  messagingSenderId: "1078942154546",
  appId: "1:1078942154546:web:050f46b43d777b8cdb212b"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
