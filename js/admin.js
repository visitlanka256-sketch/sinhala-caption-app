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

/* ---------- ELEMENTS ---------- */
const loginBox = document.getElementById("login");
const panel = document.getElementById("panel");

const emailEl = document.getElementById("email");
const passEl = document.getElementById("password");

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const addBtn = document.getElementById("addBtn");

const captionText = document.getElementById("captionText");
const captionCategory = document.getElementById("captionCategory");
const captionList = document.getElementById("captionList");

/* ---------- LOGIN ---------- */
loginBtn.onclick = () => {
  signInWithEmailAndPassword(
    auth,
    emailEl.value,
    passEl.value
  ).catch(err => alert(err.message));
};

/* ---------- LOGOUT ---------- */
logoutBtn.onclick = () => {
  signOut(auth);
};

/* ---------- AUTH STATE ---------- */
onAuthStateChanged(auth, user => {
  if (user) {
    loginBox.style.display = "none";
    panel.style.display = "block";
    loadCaptions();
  } else {
    loginBox.style.display = "block";
    panel.style.display = "none";
  }
});

/* ---------- DATABASE ---------- */
const captionsRef = ref(db, "captions");

addBtn.onclick = () => {
  if (!captionText.value.trim()) return;

  push(captionsRef, {
    text: captionText.value,
    category: captionCategory.value,
    time: Date.now()
  });

  captionText.value = "";
};

function loadCaptions() {
  onValue(captionsRef, snap => {
    captionList.innerHTML = "";
    snap.forEach(child => {
      captionList.innerHTML += `
        <div class="cap-card">
          <p>${child.val().text}</p>
          <small>${child.val().category}</small>
          <button onclick="deleteCaption('${child.key}')">🗑</button>
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
