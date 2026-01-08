import { db } from "./firebase.js";
import { ref, onValue, update } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

const captionsRef = ref(db, "captions");
let allCaptions = [];

onValue(captionsRef, snap => {
  allCaptions = [];
  snap.forEach(c => allCaptions.push({id:c.key,...c.val()}));
  localStorage.setItem("cache", JSON.stringify(allCaptions));
  render(allCaptions);
});

window.addEventListener("offline", () => {
  const c = localStorage.getItem("cache");
  if(c) render(JSON.parse(c));
});

function render(list){
  const box = document.getElementById("captionList");
  box.innerHTML="";
  list.forEach(c=>{
    box.innerHTML+=`
      <div class="card">
        <p>${c.text}</p>
        <div class="actions">
          <button onclick="copyText('${c.text}')">📋</button>
          <button onclick="fav('${c.id}')">❤️ ${c.likes||0}</button>
          <button onclick="makeImg('${c.text}')">🖼</button>
        </div>
      </div>`;
  });
}

window.copyText = t=>{
  navigator.clipboard.writeText(t);
  toast("Copied!");
};

window.fav = id=>{
  const c = allCaptions.find(x=>x.id===id);
  update(ref(db,"captions/"+id),{likes:(c.likes||0)+1});
};

window.filterCat = cat=>{
  render(cat==="all"?allCaptions:allCaptions.filter(c=>c.category===cat));
};

window.searchCaptions = ()=>{
  const q = search.value.toLowerCase();
  render(allCaptions.filter(c=>c.text.includes(q)));
};

function toast(m){
  const t=document.getElementById("toast");
  t.innerText=m;
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),1500);
}
