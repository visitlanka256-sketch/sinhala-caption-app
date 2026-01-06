// js/admin.js
import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

import {
  ref,
  push,
  onValue,
  remove
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

/* 🔐 ADMIN UID */
const ADMIN_UID = "s2Zh0vPavuWCArFDCsBSAjKCCns2";

const loginBox = document.getElementById("login");
const panel = document.getElementById("panel");

/* ---------- LOGIN ---------- */
document.getElementById("loginBtn").onclick = () => {
  const email = document.getElementById("email").value.trim();
  const pass = document.getElementById("password").value.trim();

  signInWithEmailAndPassword(auth, email, pass)
    .then(() => {
      // handled by onAuthStateChanged
    })
    .catch(err => alert("❌ " + err.message));
};

/* ---------- LOGOUT ---------- */
document.getElementById("logoutBtn").onclick = () => {
  signOut(auth);
};

/* ---------- AUTH CHECK ---------- */
onAuthStateChanged(auth, user => {
  if (!user) {
    loginBox.style.display = "block";
    panel.style.display = "none";
    return;
  }

  // ✅ UID check
  if (user.uid !== ADMIN_UID) {
    alert("⛔ Access denied: Not admin");
    signOut(auth);
    return;
  }

  // ✅ ADMIN ACCESS
  loginBox.style.display = "none";
  panel.style.display = "block";
  loadCaptions();
});

/* ---------- CAPTIONS ---------- */
const captionsRef = ref(db, "captions");

window.addCaption = () => {
  const text = captionText.value.trim();
  const category = captionCategory.value;

  if (!text) return;

  push(captionsRef, {
    text,
    category,
    time: Date.now()
  });

  captionText.value = "";
};

function loadCaptions() {
  onValue(captionsRef, snap => {
    captionList.innerHTML = "";
    snap.forEach(c => {
      captionList.innerHTML += `
        <div class="cap-card">
          <p>${c.val().text}</p>
          <small>${c.val().category}</small>
          <button onclick="deleteCaption('${c.key}')">🗑</button>
        </div>
      `;
    });
  });
}

window.deleteCaption = id => {
  if (confirm("Delete caption?")) {
    remove(ref(db, "captions/" + id));
  }
};
