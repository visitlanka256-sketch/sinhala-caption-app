// js/firebase.js (GitHub Pages compatible)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyABWsasIo80hJhsIcnv-S3FZqjL3wWG_8w",
  authDomain: "sinhala-caption-app-728f9.firebaseapp.com",
  databaseURL: "https://sinhala-caption-app-728f9-default-rtdb.firebaseio.com",
  projectId: "sinhala-caption-app-728f9",
  storageBucket: "sinhala-caption-app-728f9.firebasestorage.app",
  messagingSenderId: "278795939200",
  appId: "1:278795939200:web:d3554344be4e8453f56565",
  measurementId: "G-M8HHTLPV3M"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
