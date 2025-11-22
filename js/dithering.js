function gray(r,g,b){ return 0.3*r+0.59*g+0.11*b; }

function thresholdDither(imgData){
  const d=imgData.data;
  for(let i=0;i<d.length;i+=4){
    const val=gray(d[i],d[i+1],d[i+2])<128?0:255;
    d[i]=d[i+1]=d[i+2]=val;
  }
  return imgData;
}

function floydSteinberg(imgData,w,h){
  const d=imgData.data;
  const idx=(x,y)=>(y*w+x)*4;
  for(let y=0;y<h;y++){
    for(let x=0;x<w;x++){
      const i=idx(x,y);
      const oldP=gray(d[i],d[i+1],d[i+2]);
      const newP=oldP<128?0:255;
      const e=oldP-newP;
      d[i]=d[i+1]=d[i+2]=newP;
      [[1,0,7/16],[-1,1,3/16],[0,1,5/16],[1,1,1/16]].forEach(([dx,dy,f])=>{
        const nx=x+dx, ny=y+dy;
        if(nx>=0&&nx<w&&ny>=0&&ny<h){
          let val=Math.max(0,Math.min(255,gray(d[idx(nx,ny)],d[idx(nx,ny)+1],d[idx(nx,ny)+2])+e*f));
          d[idx(nx,ny)]=d[idx(nx,ny)+1]=d[idx(nx,ny)+2]=val;
        }
      });
    }
  }
  return imgData;
}

function atkinson(imgData,w,h){
  const d=imgData.data;
  const idx=(x,y)=>(y*w+x)*4;
  for(let y=0;y<h;y++){
    for(let x=0;x<w;x++){
      const i=idx(x,y);
      const oldP=gray(d[i],d[i+1],d[i+2]);
      const newP=oldP<128?0:255;
      const e=(oldP-newP)/8;
      d[i]=d[i+1]=d[i+2]=newP;
      [[1,0],[2,0],[-1,1],[0,1],[1,1],[0,2]].forEach(([dx,dy])=>{
        const nx=x+dx, ny=y+dy;
        if(nx>=0&&nx<w&&ny>=0&&ny<h){
          let val=Math.max(0,Math.min(255,gray(d[idx(nx,ny)],d[idx(nx,ny)+1],d[idx(nx,ny)+2])+e));
          d[idx(nx,ny)]=d[idx(nx,ny)+1]=d[idx(nx,ny)+2]=val;
        }
      });
    }
  }
  return imgData;
}

const bayer4=[[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]];
function bayerDither(imgData,w,h){
  const d=imgData.data;
  for(let y=0;y<h;y++){
    for(let x=0;x<w;x++){
      const i=(y*w+x)*4;
      const threshold=(bayer4[y%4][x%4]+0.5)/16*255;
      const val=gray(d[i],d[i+1],d[i+2])<threshold?0:255;
      d[i]=d[i+1]=d[i+2]=val;
    }
  }
  return imgData;
}

function jjn(imgData,w,h){
  const d=imgData.data;
  const idx=(x,y)=>(y*w+x)*4;
  const m=[[0,0,0,7,5],[3,5,7,5,3],[1,3,5,3,1]];
  const div=48;
  for(let y=0;y<h;y++){
    for(let x=0;x<w;x++){
      const i=idx(x,y);
      const oldP=gray(d[i],d[i+1],d[i+2]);
      const newP=oldP<128?0:255;
      const e=oldP-newP;
      d[i]=d[i+1]=d[i+2]=newP;
      for(let dy=0;dy<3;dy++){
        for(let dx=-2;dx<=2;dx++){
          const nx=x+dx, ny=y+dy;
          if(nx>=0&&nx<w&&ny>=0&&ny<h){
            let val=Math.max(0,Math.min(255,gray(d[idx(nx,ny)],d[idx(nx,ny)+1],d[idx(nx,ny)+2])+e*m[dy][dx+2]/div));
            d[idx(nx,ny)]=d[idx(nx,ny)+1]=d[idx(nx,ny)+2]=val;
          }
        }
      }
    }
  }
  return imgData;
}

function stucki(imgData,w,h){
  const d=imgData.data;
  const idx=(x,y)=>(y*w+x)*4;
  const m=[[0,0,0,8,4],[2,4,8,4,2],[1,2,4,2,1]];
  const div=42;
  for(let y=0;y<h;y++){
    for(let x=0;x<w;x++){
      const i=idx(x,y);
      const oldP=gray(d[i],d[i+1],d[i+2]);
      const newP=oldP<128?0:255;
      const e=oldP-newP;
      d[i]=d[i+1]=d[i+2]=newP;
      for(let dy=0;dy<3;dy++){
        for(let dx=-2;dx<=2;dx++){
          const nx=x+dx, ny=y+dy;
          if(nx>=0&&nx<w&&ny>=0&&ny<h){
            let val=Math.max(0,Math.min(255,gray(d[idx(nx,ny)],d[idx(nx,ny)+1],d[idx(nx,ny)+2])+e*m[dy][dx+2]/div));
            d[idx(nx,ny)]=d[idx(nx,ny)+1]=d[idx(nx,ny)+2]=val;
          }
        }
      }
    }
  }
  return imgData;
}
