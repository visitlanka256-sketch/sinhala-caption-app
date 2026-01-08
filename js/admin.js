const auth = firebase.auth();
const db = firebase.database();

function login(){
  const email = emailInput().value;
  const pass = passwordInput().value;

  auth.signInWithEmailAndPassword(email,pass)
    .then(()=>{
      document.getElementById("loginBox").style.display="none";
      document.getElementById("adminPanel").style.display="block";
      loadCaptions();
    })
    .catch(e=>alert(e.message));
}

function addCaption(){
  const text = captionText().value.trim();
  if(!text) return alert("Caption empty!");

  const data = {
    text,
    category: category().value,
    premium: premiumOnly().checked,
    daily: dailyCaption().checked,
    time: Date.now()
  };

  db.ref("captions").push(data);
  captionText().value="";
  premiumOnly().checked=false;
  dailyCaption().checked=false;
}

function loadCaptions(){
  db.ref("captions").on("value", snap=>{
    captionList().innerHTML="";
    snap.forEach(c=>{
      const d=c.val();
      const div=document.createElement("div");
      div.className="card";
      div.innerHTML=`
        <b>${d.text}</b><br>
        <small>${d.category} ${d.premium?"⭐":""}</small>
        <div class="row">
          <button class="small-btn" onclick="deleteCaption('${c.key}')">Delete</button>
        </div>`;
      captionList().appendChild(div);
    });
  });
}

function deleteCaption(id){
  if(confirm("Delete this caption?")){
    db.ref("captions/"+id).remove();
  }
}

/* helpers */
const emailInput=()=>document.getElementById("email");
const passwordInput=()=>document.getElementById("password");
const captionText=()=>document.getElementById("captionText");
const category=()=>document.getElementById("category");
const premiumOnly=()=>document.getElementById("premiumOnly");
const dailyCaption=()=>document.getElementById("dailyCaption");
const captionList=()=>document.getElementById("captionList");
