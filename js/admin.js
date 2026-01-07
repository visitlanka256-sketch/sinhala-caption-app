import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

import {
  ref,
  push,
  set,
  onValue
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const adminPanel = document.getElementById("adminPanel");
const logoutBtn = document.getElementById("logoutBtn");

loginForm.addEventListener("submit", e => {
  e.preventDefault();

  signInWithEmailAndPassword(
    auth,
    emailInput.value,
    passInput.value
  )
    .then(() => {
      loginForm.style.display = "none";
      adminPanel.style.display = "block";
    })
    .catch(err => alert(err.message));
});

onAuthStateChanged(auth, user => {
  if (user) {
    loginForm.style.display = "none";
    adminPanel.style.display = "block";
  }
});

logoutBtn.onclick = () => signOut(auth);

// ADD CAPTION
document.getElementById("addBtn").onclick = () => {
  const text = document.getElementById("captionText").value;
  const cat = document.getElementById("category").value;

  if (!text) return alert("Caption empty");

  const id = push(ref(db, "captions")).key;
  set(ref(db, "captions/" + id), {
    text,
    category: cat
  });

  document.getElementById("captionText").value = "";
};
