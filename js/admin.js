// 🔥 Firebase imports (v9 compat)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

/* 🔥 FIREBASE CONFIG */
const firebaseConfig = {
  apiKey: "AIzaSyD_CBwtnOiU4zta9hQOAV_Pybxju0cYlEg",
  authDomain: "sinhala-caption-app-e8ae2.firebaseapp.com",
  databaseURL: "https://sinhala-caption-app-e8ae2-default-rtdb.firebaseio.com",
  projectId: "sinhala-caption-app-e8ae2",
  storageBucket: "sinhala-caption-app-e8ae2.firebasestorage.app",
  messagingSenderId: "1078942154546",
  appId: "1:1078942154546:web:050f46b43d777b8cdb212b"
};

// Init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Helpers
const captionList = () => document.getElementById("captionList");

/* ---------- AUTH ---------- */
window.login = () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      document.getElementById("loginBox").style.display = "none";
      document.getElementById("adminPanel").style.display = "block";
      loadCaptions();
    })
    .catch(err => alert("❌ Login failed\n" + err.message));
};

window.logout = () => {
  signOut(auth).then(() => location.reload());
};

onAuthStateChanged(auth, user => {
  if (user) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    loadCaptions();
  }
});

/* ---------- ADD CAPTION ---------- */
window.addCaption = () => {
  const text = captionText.value.trim();
  const category = captionCategory.value;

  if (!text) return alert("Caption empty ❌");

  push(ref(db, "captions"), {
    text,
    category,
    premium: false,
    daily: false,
    likes: 0,
    time: Date.now()
  });

  captionText.value = "";
};

/* ---------- LOAD CAPTIONS + STATS ---------- */
function loadCaptions() {
  onValue(ref(db, "captions"), snap => {
    captionList().innerHTML = "";

    let total = 0, premium = 0, daily = 0;

    snap.forEach(c => {
      total++;
      const d = c.val();

      if (d.premium) premium++;
      if (d.daily) daily++;

      const div = document.createElement("div");
      div.className = "card caption-item";
      div.innerHTML = `
        <b>${d.text}</b><br>
        <small>${d.category} ${d.premium ? "⭐ Premium" : ""}</small>
        <div class="row">
          <button class="small-btn danger" onclick="deleteCaption('${c.key}')">
            Delete
          </button>
        </div>
      `;
      captionList().appendChild(div);
    });

    document.getElementById("totalCount").innerText = total;
    document.getElementById("premiumCount").innerText = premium;
    document.getElementById("dailyCount").innerText = daily;
  });
}

/* ---------- DELETE ---------- */
window.deleteCaption = id => {
  if (confirm("Delete this caption?")) {
    remove(ref(db, "captions/" + id));
  }
};
