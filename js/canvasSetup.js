const canvases = {
  canvasThreshold: document.getElementById('canvasThreshold'),
  canvasFS: document.getElementById('canvasFS'),
  canvasAtkinson: document.getElementById('canvasAtkinson'),
  canvasBayer: document.getElementById('canvasBayer'),
  canvasJJN: document.getElementById('canvasJJN'),
  canvasStucki: document.getElementById('canvasStucki')
};
const ctxs = {};
for(let key in canvases) ctxs[key] = canvases[key].getContext('2d');

const originalCanvas = document.getElementById('originalCanvas');
const originalCtx = originalCanvas.getContext('2d');

let width = 128, height = 64;

function setCanvasSize(res){
  const [w,h] = res.split("x").map(Number);
  width=w; height=h;
  for(let key in canvases){
    canvases[key].width=w;
    canvases[key].height=h;
  }
  originalCanvas.width=w;
  originalCanvas.height=h;
}

// Initialize default canvas size
setCanvasSize('128x64');

document.getElementById('resolutionSelect').addEventListener('change', e=>{
  setCanvasSize(e.target.value);
  if(document.getElementById('fileInput').files.length>0){
    document.getElementById('fileInput').dispatchEvent(new Event('change'));
  }
});
