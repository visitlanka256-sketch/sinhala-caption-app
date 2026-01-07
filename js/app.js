import { db } from "./firebase.js";
import {
  ref,
  onValue
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

const list = document.getElementById("captions");
const search = document.getElementById("search");

let all = [];

onValue(ref(db, "captions"), snap => {
  all = Object.values(snap.val() || {});
  render(all);
});

search.oninput = () => {
  render(
    all.filter(c =>
      c.text.toLowerCase().includes(search.value.toLowerCase())
    )
  );
};

function render(data) {
  list.innerHTML = "";
  data.forEach(c => {
    const div = document.createElement("div");
    div.className = "card";
    div.textContent = c.text;
    list.appendChild(div);
  });
}
