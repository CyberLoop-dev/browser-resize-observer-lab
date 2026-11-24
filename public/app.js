const target=document.querySelector("#target");
const width=document.querySelector("#width");
const height=document.querySelector("#height");
const widthValue=document.querySelector("#widthValue");
const heightValue=document.querySelector("#heightValue");
const log=document.querySelector("#log");
const contentSize=document.querySelector("#contentSize");
const borderSize=document.querySelector("#borderSize");
const deviceSize=document.querySelector("#deviceSize");
function addLog(message){const item=document.createElement("li");item.textContent=message;log.prepend(item);while(log.children.length>30)log.lastElementChild.remove();}
function updateControls(){target.style.width=width.value+"px";target.style.height=height.value+"px";widthValue.value=width.value+"px";heightValue.value=height.value+"px";}
width.addEventListener("input",updateControls);height.addEventListener("input",updateControls);
document.querySelector("#clearLog").addEventListener("click",()=>{log.replaceChildren();});
if("ResizeObserver" in window){
 const observer=new ResizeObserver(entries=>{
  for(const entry of entries){
   const content=entry.contentRect;
   const border=entry.borderBoxSize?.[0];
   const device=entry.devicePixelContentBoxSize?.[0];
   contentSize.textContent=Math.round(content.width)+" × "+Math.round(content.height)+" px";
   borderSize.textContent=border?Math.round(border.inlineSize)+" × "+Math.round(border.blockSize)+" px":"not exposed";
   deviceSize.textContent=device?Math.round(device.inlineSize)+" × "+Math.round(device.blockSize)+" px":"not exposed";
   addLog("content "+Math.round(content.width)+"×"+Math.round(content.height)+" px");
  }
 });
 observer.observe(target,{box:"border-box"});
 addLog("ResizeObserver attached to target (border-box).");
}else{addLog("ResizeObserver is not supported by this browser.");}
updateControls();
