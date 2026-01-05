import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";

import { getDatabase } from
"https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

import { getAuth } from
"https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "PROJECT.firebaseapp.com",
  databaseURL: "https://PROJECT.firebaseio.com",
  projectId: "PROJECT"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
