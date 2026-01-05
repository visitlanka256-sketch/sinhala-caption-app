import { db } from "./firebase.js";
import { ref, onValue } from
"https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

const list = document.getElementById("captionList");
const search = document.getElementById("search");
let currentCategory = "all";

let favorites = JSON.parse(localStorage.getItem("favs") || "[]");

/* 🔥 LOAD FROM FIREBASE */
onValue(ref(db, "captions"), snap => {
  const data = snap.val() || {};
  render(Object.entries(data));
});

function render(items){
  list.innerHTML = "";
  items.forEach(([id, item])=>{
    if(currentCategory !== "all" && item.category !== currentCategory) return;
    if(search.value && !item.text.includes(search.value)) return;

    list.innerHTML += `
      <div class="caption-card">
        <div class="caption-text">${item.text}</div>
        <div class="caption-actions">
          <button onclick="copyText('${item.text}')">📋</button>
          <button onclick="toggleFav('${id}')"
            class="fav ${favorites.includes(id) ? "active":""}">
            ⭐
          </button>
        </div>
      </div>`;
  });
}

/* 🔎 SEARCH */
search?.addEventListener("input", ()=>renderCache());

/* 📂 CATEGORY */
window.setCategory = cat => {
  currentCategory = cat;
  renderCache();
};

let cache = [];
function renderCache(){
  render(cache);
}

/* ⭐ FAVORITES */
window.toggleFav = id => {
  favorites.includes(id)
    ? favorites = favorites.filter(x=>x!==id)
    : favorites.push(id);

  localStorage.setItem("favs", JSON.stringify(favorites));
  renderCache();
};

/* 📋 COPY */
window.copyText = text => {
  navigator.clipboard.writeText(text);
  showToast("Copied!");
};

/* 🔔 TOAST */
const toast = document.getElementById("toast");
function showToast(msg){
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),1500);
}
