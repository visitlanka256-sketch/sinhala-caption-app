const toggleBtn = document.querySelector(".theme-toggle");

export function initTheme(){
  const saved = localStorage.getItem("theme");
  if(saved){
    document.documentElement.setAttribute("data-theme", saved);
  }
}

export function toggleTheme(){
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
}

if(toggleBtn){
  toggleBtn.addEventListener("click", toggleTheme);
}

initTheme();
