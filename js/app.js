import { db } from "./firebase.js";
import { ref, onValue, update } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

const list = document.getElementById("captionList");
const skeleton = document.getElementById("skeleton");
const toast = document.getElementById("toast");

let captions = [];
let currentCategory = "all";

const captionsRef = ref(db, "captions");

onValue(captionsRef, snap => {
  captions = [];
  snap.forEach(c => {
    captions.push({ id: c.key, ...c.val() });
  });
  skeleton.style.display = "none";
  render(captions);
});

function render(data) {
  list.innerHTML = "";
  data.forEach(c => {
    list.innerHTML += `
      <div class="caption-card">
        <p>${c.text}</p>
        <div class="actions">
          <button onclick="copyText('${c.text}')">📋</button>
          <button onclick="like('${c.id}', ${c.likes||0})">❤️ ${c.likes||0}</button>
        </div>
      </div>`;
  });
}

window.copyText = txt => {
  navigator.clipboard.writeText(txt);
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),1500);
};

window.like = (id, likes) => {
  update(ref(db,"captions/"+id),{likes:likes+1});
};

window.filterCat = cat => {
  currentCategory = cat;
  if(cat==="all") render(captions);
  else render(captions.filter(c=>c.category===cat));
};

document.getElementById("searchBox").oninput = e => {
  const q = e.target.value.toLowerCase();
  render(captions.filter(c=>c.text.toLowerCase().includes(q)));
};
