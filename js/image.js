window.makeImg = text=>{
  const c=document.createElement("canvas");
  c.width=800;c.height=800;
  const x=c.getContext("2d");
  x.fillStyle="#111";x.fillRect(0,0,800,800);
  x.fillStyle="#fff";
  x.font="40px sans-serif";
  x.textAlign="center";
  x.fillText(text,400,400,700);
  const a=document.createElement("a");
  a.href=c.toDataURL();
  a.download="caption.png";
  a.click();
};
