// js/admin.js
import { auth, db } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

import {
  ref,
  push,
  onValue,
  remove
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

/* ELEMENTS */
const loginBox   = document.getElementById("loginBox");
const dashboard  = document.getElementById("dashboard");
const list       = document.getElementById("captionList");

/* 🔐 AUTH STATE */
onAuthStateChanged(auth, user => {
  if (user) {
    loginBox.classList.add("hidden");
    dashboard.classList.remove("hidden");
    loadCaptions();
  } else {
    loginBox.classList.remove("hidden");
    dashboard.classList.add("hidden");
  }
});

/* 🔑 LOGIN */
window.adminLogin = () => {
  const email = document.getElementById("email").value;
  const pass  = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, pass)
    .catch(() => alert("❌ Login failed"));
};

/* 🚪 LOGOUT */
window.logout = () => {
  signOut(auth);
};

/* ➕ ADD CAPTION */
window.addCaption = () => {
  const text = document.getElementById("captionText").value.trim();
  const cat  = document.getElementById("category").value;

  if (!text) return alert("Caption empty!");

  push(ref(db, "captions"), {
    text,
    category: cat,
    createdAt: Date.now()
  });

  document.getElementById("captionText").value = "";
};

/* 📋 LOAD & MANAGE */
function loadCaptions(){
  onValue(ref(db, "captions"), snap => {
    const data = snap.val() || {};
    list.innerHTML = "";

    Object.entries(data).reverse().forEach(([id, item]) => {
      list.innerHTML += `
        <div style="margin-bottom:10px">
          <b>${item.category}</b>
          <p>${item.text}</p>
          <button onclick="deleteCaption('${id}')">🗑 Delete</button>
          <hr>
        </div>
      `;
    });
  });
}

/* 🗑 DELETE */
window.deleteCaption = id => {
  if (confirm("Delete this caption?")) {
    remove(ref(db, "captions/" + id));
  }
};
