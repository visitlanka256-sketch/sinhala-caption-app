let favs = JSON.parse(localStorage.getItem("favs")||"[]");

window.toggleFav = id =>{
  favs.includes(id)
    ? favs=favs.filter(x=>x!==id)
    : favs.push(id);

  localStorage.setItem("favs",JSON.stringify(favs));
};

window.loadFavorites = ()=>{
  alert("Favorites loaded locally");
};
