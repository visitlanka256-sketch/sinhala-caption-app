import { db } from "./firebase.js";
import { ref, onValue } from
"https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

const list = document.getElementById("captionList");

window.loadCategory = cat => {
  onValue(ref(db,"captions/"+cat), snap => {
    list.innerHTML="";
    snap.forEach(c=>{
      const d=document.createElement("div");
      d.className="caption";
      d.innerHTML=`
        <p>${c.val().text}</p>
        <button onclick="copyText('${c.val().text}')">Copy</button>
        <button onclick="toggleFav('${c.key}')">⭐</button>
      `;
      list.appendChild(d);
    });
  });
};

window.copyText = t =>{
  navigator.clipboard.writeText(t);
  const toast=document.getElementById("toast");
  toast.style.display="block";
  setTimeout(()=>toast.style.display="none",1200);
};
