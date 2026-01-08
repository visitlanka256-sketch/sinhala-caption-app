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
  remove,
  update
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

// DOM
const loginBox = document.getElementById("login");
const panelBox = document.getElementById("panel");

window.login = () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("❗ Email & Password required");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("✅ Login Successful");
    })
    .catch(err => {
      alert("❌ Login Failed\n" + err.message);
    });
};

onAuthStateChanged(auth, user => {
  if (user) {
    loginBox.style.display = "none";
    panelBox.style.display = "block";
    loadCaptions();
  } else {
    loginBox.style.display = "block";
    panelBox.style.display = "none";
  }
});

window.logout = () => {
  signOut(auth).then(() => location.reload());
};

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
const captionsRef = ref(db, "captions");

window.addCaption = () => {
  const text = captionText.value.trim();
  const category = captionCategory.value;

  if (!text) return alert("❗ Caption empty");

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

    snap.forEach(child => {
      const id = child.key;
      const data = child.val();

      captionList.innerHTML += `
        <div class="cap-card">
          <p contenteditable="true" 
             onblur="editCaption('${id}', this.innerText)">
            ${data.text}
          </p>
          <small>${data.category}</small>
          <button onclick="deleteCaption('${id}')">🗑 Delete</button>
        </div>
      `;
    });
  });
}

window.deleteCaption = id => {
  if (confirm("Delete this caption?")) {
    remove(ref(db, "captions/" + id));
  }
};

window.editCaption = (id, newText) => {
  update(ref(db, "captions/" + id), {
    text: newText
  });
};
