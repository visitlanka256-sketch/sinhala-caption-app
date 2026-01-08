import { db } from "./firebase.js";
import { ref, onValue, update } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

const list = document.getElementById("captionList");
const skeleton = document.getElementById("skeleton");
const toast = document.getElementById("toast");

let captions = [];
let currentCategory = "all";

const captionsRef = ref(db, "captions");

onValue(captionsRef, snap => {
  const list = [];
  snap.forEach(c => list.push({ id: c.key, ...c.val() }));
  saveCache(list);
  renderCaptions(list);
});

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
    function saveCache(data) {
  localStorage.setItem("captions_cache", JSON.stringify(data));
}

function loadCache() {
  const cached = localStorage.getItem("captions_cache");
  if (cached) renderCaptions(JSON.parse(cached));
}

  });
}

window.copyText = txt => {
  navigator.clipboard.writeText(txt);
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),1500);
  window.addEventListener("offline", loadCache);

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
