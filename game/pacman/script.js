const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

//Dessiner la map, la nourriture et le Pacman 
let imgMap = new Image();
  imgMap.src = "img/map.png";
  imgMap.onload = function() {
    ctx.drawImage(imgMap,0,0);
    drawPacman()
    for (let i = 0; i<map.length;i++){
      for (let j = 0; j<map[i].length;j++){
        if (map[i][j] == 0){
          ctx.fillStyle = "orange";
          ctx.fillRect(j*box+(box/3),i*box+(box/3),box/4,box/4)
        }
      }
    }
  };
// initialise la taille d'un carré (box), la taille du pacman 
// et les coordonnées des carré de la map
let box = 20;
let pacman = [];
  pacman[0] = {x: 13*box, y: 17*box}
let pacmanPositions = []
  pacmanPositions[0] = {x: 13*box, y: 17*box}

let map = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
  [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
  [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
  [1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
  [0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
  [1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
  [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
  [1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1], //
  [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
  [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
  [1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
  [1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]
// Creation des variable de position X et Y du Pacman
let pacmanX = pacman[0].x;
let pacmanY = pacman[0].y;
let pacmanDirection;
document.addEventListener("keydown",direction);

function drawPacman(){  
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(pacmanX+(box/2), pacmanY +(box/2), box/2, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
  
}

function direction(event, pacmanDirection){ 
  
  if(event.keyCode == 37 && event.keyCode !== 39 && map[pacmanY/box][(pacmanX-box)/box] == 0){ // LEFT
    ctx.fillStyle = "black";
    ctx.fillRect(pacmanX,pacmanY,box,box)
    pacmanX -= box
    drawPacman()
    pacmanDirection = "LEFT"
    pacman.push({pacmanX, pacmanY})
  }
  else if (event.keyCode == 38 && event.keyCode !== 40 && map[(pacmanY-box)/box][pacmanX/box] == 0){ // UP
    ctx.fillStyle = "black";
    ctx.fillRect(pacmanX,pacmanY,box,box)
    pacmanY -= box
    drawPacman()
    pacmanDirection = "UP"
    pacman.push({pacmanX, pacmanY})
  }
  else if (event.keyCode == 39 && event.keyCode !== 37 && map[pacmanY/box][(pacmanX+box)/box] == 0){ // RIGHT
    ctx.fillStyle = "black";
    ctx.fillRect(pacmanX,pacmanY,box,box)
    pacmanX += box
    drawPacman()
    pacmanDirection = "RIGHT"
    pacman.push({pacmanX, pacmanY})
  }
  else if (event.keyCode == 40 && event.keyCode !== 38 && map[(pacmanY+box)/box][pacmanX/box] == 0){ // DOWN
    ctx.fillStyle = "black";
    ctx.fillRect(pacmanX,pacmanY,box,box)
    pacmanY += box
    drawPacman()
    pacmanDirection = "DOWN"
    pacman.push({pacmanX, pacmanY})
  }
  else if (pacmanX/box == 27 && pacmanY/box == 14 && event.keyCode == 39 && event.keyCode !== 37){ // sRIGHT
    ctx.fillStyle = "black";
    ctx.fillRect(pacmanX,pacmanY,box,box)
    pacmanX = 0
    drawPacman()
    pacmanDirection = "sRIGHT"
    pacman.push({pacmanX, pacmanY})
  }
  else if (pacmanX/box == 0 && pacmanY/box == 14 && event.keyCode == 37 && event.keyCode !== 39){ // sLEFT
    ctx.fillStyle = "black";
    ctx.fillRect(pacmanX,pacmanY,box,box)
    pacmanX = 27*box
    drawPacman()
    pacmanDirection = "sLEFT"
    pacman.push({pacmanX, pacmanY})
  }  
  let score = pacman.length - 1;
  document.querySelector(".score").innerText = "Score : " + score * 10;
}

function ghostBlinky(x,y){  
  let blinkyImg = new Image();
    blinkyImg.src = "img/Blinky.png"
    blinkyImg.onload = function() {
      ctx.drawImage(blinkyImg,x,y);
    }
}
function ghostPinky(x,y){
  let pinkyImg = new Image();
    pinkyImg.src = "img/Pinky.png"
    pinkyImg.onload = function() {
      ctx.drawImage(pinkyImg,x,y);
    }
}
function ghostInky(x,y){  
  let inkyImg = new Image();
    inkyImg.src = "img/Inky.png"
    inkyImg.onload = function() {
      ctx.drawImage(inkyImg,x,y);
    }
}
function ghostClyde(x,y){  
  let clydeImg = new Image();
    clydeImg.src = "img/Clyde.png"
    clydeImg.onload = function() {
      ctx.drawImage(clydeImg,x,y);
    }
}
let blinky = [];
  blinky[0] = {x:13*box, y:14*box};

let pinky = [];
  pinky[0] = {x:12*box, y:14*box};

let inky = [];
  inky[0] = {x:14*box, y:14*box};

let clyde = [];
clyde[0] = {x:15*box, y:14*box};

ghostBlinky(blinky[0].x, blinky[0].y)
ghostPinky(pinky[0].x, pinky[0].y)
ghostInky(inky[0].x, inky[0].y)
ghostClyde(clyde[0].x, clyde[0].y)
