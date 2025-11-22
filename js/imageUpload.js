const fileInput = document.getElementById('fileInput');

fileInput.addEventListener('change',(e)=>{
  const file=e.target.files[0];
  if(!file) return;
  const reader=new FileReader();
  reader.onload=function(evt){
    const img=new Image();
    img.onload=()=>{
      originalCtx.clearRect(0,0,width,height);
      originalCtx.drawImage(img,0,0,width,height);

      for(let key in canvases){
        ctxs[key].clearRect(0,0,width,height);
        ctxs[key].drawImage(img,0,0,width,height);
        let imgData=ctxs[key].getImageData(0,0,width,height);
        switch(key){
          case 'canvasThreshold': imgData=thresholdDither(imgData); break;
          case 'canvasFS': imgData=floydSteinberg(imgData,width,height); break;
          case 'canvasAtkinson': imgData=atkinson(imgData,width,height); break;
          case 'canvasBayer': imgData=bayerDither(imgData,width,height); break;
          case 'canvasJJN': imgData=jjn(imgData,width,height); break;
          case 'canvasStucki': imgData=stucki(imgData,width,height); break;
        }
        ctxs[key].putImageData(imgData,0,0);
      }
    };
    img.src=evt.target.result;
  };
  reader.readAsDataURL(file);
});
