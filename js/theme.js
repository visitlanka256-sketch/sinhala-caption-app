window.toggleTheme = ()=>{
  const t=document.documentElement.getAttribute("data-theme");
  const n=t==="light"?"dark":"light";
  document.documentElement.setAttribute("data-theme",n);
  localStorage.setItem("theme",n);
};

const s=localStorage.getItem("theme");
if(s) document.documentElement.setAttribute("data-theme",s);
