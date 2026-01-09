/* ==============================
   Firebase Imports
================================ */
import { app, auth, db, storage } from "./firebase.js";

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

import {
  ref as stRef,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

/* ==============================
   DOM Shortcuts
================================ */
const loginBox = document.getElementById("loginBox");
const adminPanel = document.getElementById("adminPanel");

const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");

const captionText = document.getElementById("captionText");
const captionCategory = document.getElementById("captionCategory");
const captionImage = document.getElementById("captionImage");
const previewImg = document.getElementById("previewImg");

const captionList = document.getElementById("captionList");

const totalCount = document.getElementById("totalCount");
const premiumCount = document.getElementById("premiumCount");
const dailyCount = document.getElementById("dailyCount");

/* ==============================
   AUTH
================================ */
window.login = () => {
  const email = emailInput.value.trim();
  const password = passInput.value.trim();

  if (!email || !password) {
    alert("Email & Password required");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      loginBox.style.display = "none";
      adminPanel.style.display = "block";
    })
    .catch(err => {
      alert("Login failed ❌");
      console.error(err);
    });
};

window.logout = () => {
  signOut(auth).then(() => location.reload());
};

onAuthStateChanged(auth, user => {
  if (user) {
    loginBox.style.display = "none";
    adminPanel.style.display = "block";
    loadCaptions();
  } else {
    loginBox.style.display = "block";
    adminPanel.style.display = "none";
  }
});

/* ==============================
   ADD CAPTION (TEXT + IMAGE)
================================ */
window.addCaption = async () => {
  const text = captionText.value.trim();
  const category = captionCategory.value;
  const imgFile = captionImage.files[0];

  if (!text) {
    alert("Caption text required");
    return;
  }

  let imageUrl = "";

  try {
    if (imgFile) {
      const imgRef = stRef(
        storage,
        "captions/" + Date.now() + "_" + imgFile.name
      );

      await uploadBytes(imgRef, imgFile);
      imageUrl = await getDownloadURL(imgRef);
    }

    await push(ref(db, "captions"), {
      text: text,
      category: category,
      image: imageUrl,
      premium: false,
      daily: false,
      likes: 0,
      time: Date.now()
    });

    captionText.value = "";
    captionCategory.value = "love";
    captionImage.value = "";
    previewImg.style.display = "none";

  } catch (e) {
    console.error(e);
    alert("Error adding caption");
  }
};

/* ==============================
   LOAD + STATS
================================ */
window.loadCaptions = () => {
  const captionsRef = ref(db, "captions");

  onValue(captionsRef, snap => {
    captionList.innerHTML = "";

    let total = 0;
    let premium = 0;
    let daily = 0;

    snap.forEach(c => {
      total++;
      const d = c.val();

      if (d.premium) premium++;
      if (d.daily) daily++;

      const div = document.createElement("div");
      div.className = "card caption-item";

      div.innerHTML = `
        ${d.image ? `<img src="${d.image}" class="cap-img">` : ""}
        <b>${d.text}</b><br>
        <small>${d.category}
          ${d.premium ? "⭐ Premium" : ""}
          ${d.daily ? "📅 Daily" : ""}
        </small>

        <div class="row">
          <button class="small-btn danger"
            onclick="deleteCaption('${c.key}')">
            Delete
          </button>
        </div>
      `;

      captionList.appendChild(div);
    });

    totalCount.innerText = total;
    premiumCount.innerText = premium;
    dailyCount.innerText = daily;
  });
};

/* ==============================
   DELETE
================================ */
window.deleteCaption = id => {
  if (!confirm("Delete this caption?")) return;
  remove(ref(db, "captions/" + id));
};

/* ==============================
   IMAGE PREVIEW
================================ */
if (captionImage) {
  captionImage.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;

    previewImg.src = URL.createObjectURL(file);
    previewImg.style.display = "block";
  };
}
