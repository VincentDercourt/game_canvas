const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

let imgFood = new Image();
  imgFood.src = "img/food.png";
let imgGround = new Image();
  imgGround.src = "img/ground.png";

let audioDead = new Audio();
  audioDead.src = "audio/dead.mp3";
let audioDown = new Audio();
  audioDown.src = "audio/down.mp3";
let audioEat = new Audio();
  audioEat.src = "audio/eat.mp3";
let audioLeft = new Audio();
  audioLeft.src = "audio/left.mp3";
let audioRight = new Audio();
  audioRight.src = "audio/right.mp3";
let audioUp = new Audio();
  audioUp.src = "audio/up.mp3";

let box = 32;
let snake = [];
  snake[0] = {x: 9*box, y: 10*box};
  // snake[1] = {x: 8*box, y: 10*box};
  console.log(snake)

let food = { 
  x : Math.floor(Math.random()*17+1)*box,
  y : Math.floor(Math.random()*15+3)*box
};
  console.log(food)
let score = 0;

document.addEventListener("keydown",direction);

let dir;
function direction(event){
  if(event.keyCode == 37 && dir !="RIGHT"){
    audioLeft.play();
    dir = "LEFT";
  }
  else if (event.keyCode == 38 && dir !="DOWN"){
    audioUp.play();
    dir = "UP";
  }
  else if (event.keyCode == 39 && dir !="LEFT"){
    audioRight.play();
    dir = "RIGHT";
  }
  else if (event.keyCode == 40 && dir !="UP"){
    audioDown.play()
    dir = "DOWN";
  }

}

// check collision function
function collision(head,array){
  for(let i=0;i<array.length;i++){
    if(head.x == array[i].x && head.y == array[i].y){
      return true;
    }
  }
  return false;
}


function draw(){
  ctx.drawImage(imgGround,0,0)
  for (let i = 0; i<snake.length;i++){
    ctx.fillStyle = (i==0) ?"green":"white";
    ctx.fillRect(snake[i].x,snake[i].y,box,box);
    ctx.strokeStyle="red";
    ctx.strokeRect(snake[i].x,snake[i].y,box,box);
  }
  ctx.drawImage(imgFood,food.x,food.y)

  // old hed position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // which direction
  if ( dir == "LEFT" ) snakeX -= box;
  if ( dir == "UP" ) snakeY -= box;
  if ( dir == "RIGHT" ) snakeX += box;
  if ( dir == "DOWN" ) snakeY += box;
  
  //if the snake eats the food
  if(snakeX == food.x && snakeY == food.y){
    score++;
    audioEat.play();
    food = { 
      x : Math.floor(Math.random()*17+1)*box,
      y : Math.floor(Math.random()*15+3)*box
    }
  }else{
    // remove the tail
    snake.pop();
  }
  
  // add newHead
  let newHead = {
    x: snakeX,
    y: snakeY
  }

  // Game over
  if(snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead,snake)){
    audioDead.play();
    clearInterval(game);
  }
  

  

  snake.unshift(newHead);

  ctx.fillStyle="white";
  ctx.font = "45px Changa One";
  ctx.fillText(score, 2*box, 1.6*box);
}

let game = setInterval(draw, 100);