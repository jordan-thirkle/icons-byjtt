figma.showUI(__html__,{width:420,height:640,title:"JTT Icons",themeColors:true});
figma.ui.onmessage=async msg=>{
 if(msg.type==="insert"){
  const res=await fetch("https://icons.byjtt.com/api/icons.json");
  const data=await res.json();
  const icon=data.icons.find(x=>x.name===msg.name);
  if(!icon){figma.ui.postMessage({type:"error",message:"Icon not found"});return;}
  const svgRes=await fetch("https://icons.byjtt.com"+icon.path);
  const svg=await svgRes.text();
  const node=figma.createNodeFromSvg(svg);
  node.name="JTT / "+icon.name;
  figma.currentPage.appendChild(node);
  figma.viewport.scrollAndZoomIntoView([node]);
  figma.ui.postMessage({type:"inserted",name:icon.name});
 }
};
