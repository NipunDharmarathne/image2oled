const output = document.getElementById('output');
const canvasSelect = document.getElementById('canvasSelect');
const copyBtn = document.getElementById('copyBtn');

document.getElementById('convert').addEventListener('click',()=>{
  const selected=canvasSelect.value;
  const ctx=ctxs[selected];
  const imgData=ctx.getImageData(0,0,width,height);
  const data=imgData.data;
  let bytes=[];
  for(let y=0;y<height;y++){
    for(let x=0;x<width;x+=8){
      let byte=0;
      for(let bit=0;bit<8;bit++){
        const px=x+bit;
        const offset=(y*width+px)*4;
        const val=data[offset];
        const isBlack=val<128;
        byte|=(isBlack?0:1)<<(7-bit);
      }
      bytes.push(byte);
    }
  }
  let cCode=`static const unsigned char PROGMEM image_data_array[] = {\n`;
  for (let i = 0; i < bytes.length; i++) {
    if ((i % (width / 8)) === 0) cCode += "\t";   // add tab only at start of each row
    cCode += "0x" + bytes[i].toString(16).padStart(2, "0") + ",";
    if ((i + 1) % (width / 8) === 0) cCode += "\n";
  }
  cCode+="};";
  output.value=cCode;
});

copyBtn.addEventListener('click',()=>{
  output.select();
  document.execCommand('copy');
});
