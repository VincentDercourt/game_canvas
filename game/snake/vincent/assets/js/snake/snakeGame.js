/**
 * Use class
 *    snake and snakePart in snake.js
 *    food in food.js
 *    canvas in canvas.js
 */

let snake;
let food;
let canvas;
let canvasHtml;
let direction;
let intervalId;

let headSnake;
let secondPartSnake;
let step;
let eat;

/**
 * @param [canvasSelector] {String} | Selector css of canvas
 * @param [width] {Number} | Width of canvas
 * @param [height] {Number} | Height of canvas
 * @constructor
 */
function SnakeGame(canvasSelector, width, height) {
  canvasHtml = document.querySelector(canvasSelector || "#canvas");
  canvas = new Canvas(canvasHtml, width, height);
  snake = new Snake();
  food = new Food(canvas, snake);
  direction = "right";
  headSnake = snake.snakeParts[0];
  secondPartSnake = snake.snakeParts[1];
  step = headSnake.size;
  eat = false;

  // Draw snake in canvas
  drawSnake();
  //Draw Food in canvas
  drawFood();
  listener();
  advancedSnake(direction);
}

/**
 * @method
 * Draw snake in canvas
 */
function drawSnake(){
  // Repeat as many times as SnakePart in snake array
  snake.snakeParts.forEach(function (snakePart) {
    // If the object has the property x and y and if upper to 0
    if(snakePart.hasOwnProperty("x") && snakePart.hasOwnProperty("y") && snakePart.x > 0 && snakePart.y > 0) {
      // Call method draw in canvas for draw snake
      canvas.drawRect(snakePart.x, snakePart.y, snakePart.size, snakePart.size, snakePart.color, snakePart.borderColor);
    }
  }, this); // Return class in anonymous function
}


/**
 * @method
 * Draw food in canvas
 */
function drawFood(){
  if(canvas.collisionRect(headSnake, food)) {
    eat = true;
    //Change position of the food
    food.positionFood(canvas, snake);
  }
  //Call method draw in canvas for draw food
  canvas.drawRect(food.x, food.y, food.width, food.height, food.color, food.borderColor);
}

function listener(){
  window.onkeydown = eventAction;
  canvasHtml.onclick = eventAction;
}

function eventAction(event){
  headSnake = snake.snakeParts[0];
  secondPartSnake = snake.snakeParts[1];

  // Si direction droite ou gauche
  if(direction === "right" || direction === "left") {
    // Si flèche bas ou touche "s" ou click bas
    if ((event.key === "ArrowDown" || event.key === "s" || event.y > snake.snakeParts[0].y) && !snake.checkSnakePart(headSnake.x - step, headSnake.y)) {
      direction="down";
      advancedSnake("down");
    }
    // Si flèche haut ou touche "z" ou touche "w" ou click haut
    if ((event.key === "ArrowUp" || event.key === "z" || event.key === "w" || event.y < snake.snakeParts[0].y) && !snake.checkSnakePart(headSnake.x,snake.snakeParts[0].y - step)) {
      direction="up";
      advancedSnake("up");
    }
  }
  // Si direction haut ou bas
  else if(direction === "up" || direction === "down") {
    // Si flèche gauche ou touche "q" ou touche "a" ou click gauche
    if ((event.key === "ArrowLeft" || event.key === "q" || event.key === "a" || event.x < snake.snakeParts[0].x) && !snake.checkSnakePart(headSnake.x ,headSnake.y + step)) {
      direction="left";
      advancedSnake("left");
    }
    // Si flèche droite ou touche "d" ou click droite
    if ((event.key === "ArrowRight" || event.key === "d" || event.x > snake.snakeParts[0].x) && !snake.checkSnakePart(headSnake.x + step, headSnake.y)) {
      direction="right";
      advancedSnake("right");
    }
  }
}

function advancedSnake(direction){
  headSnake = snake.snakeParts[0];
  secondPartSnake = snake.snakeParts[1];

  let dx = snake.snakeParts[0].x + (direction === "left" ? - step : (direction === "right" ? step : 0) );
  let dy = snake.snakeParts[0].y + (direction === "up" ? - step : (direction === "down" ? step : 0) );

  if(direction === "right" && dx >= canvas.width - 10){
    dx = 10;
  }
  if(direction === "left" && dx <= 10){
    dx = canvas.width - 10;
  }
  if(direction === "up" && dy <= 10){
    dy = canvas.height - 10;
  }
  if(direction === "down" && dy >= canvas.height - 10){
    dy = 10;
  }
  let newPart = new SnakePart(dx, dy);

  if(snake.checkSnakePart(newPart)){
    alert("Try again !!");
    location.reload();
  }

  snake.advanceSnake(newPart, eat);
  eat = false;

  canvas.clearRect();
  drawSnake();
  drawFood();

  clearInterval(intervalId);
  intervalId = setInterval(advancedSnake,100, direction);

}





/**
 * ERROR WITH SETINTERVAL AND CLASS. CTX FORBIDDEN EACH INTERVAL.
 */
/**
 * @param snake {Snake}
 * @param food {Food}
 * @param canvas {Canvas}
 * @class
 */
// class SnakeGame {
//   snake;
//   food;
//   canvas;
//   canvasHtml;
//   direction;
//   intervalId;
//
//   headSnake;
//   secondPartSnake;
//   step;
//
//   /**
//    * @param [canvasSelector] {String} | Selector css of canvas
//    * @param [width] {Number} | Width of canvas
//    * @param [height] {Number} | Height of canvas
//    * @constructor
//    */
//   constructor(canvasSelector, width, height) {
//     this.canvasHtml = document.querySelector(canvasSelector || "#canvas");
//     this.canvas = new Canvas(this.canvasHtml, width, height);
//     this.snake = new Snake();
//     this.food = new Food(this.canvas, this.snake);
//     this.direction = "right";
//     console.log(this.snake);
//
//     // Draw snake in canvas
//     this.drawSnake();
//     //Draw Food in canvas
//     this.drawFood();
//
//     this.listener();
//
//     this.moveSnake("right");
//
//     //new SnakePart(this.snake[0].x+ dx, this.snake[0].y+ dy)
//   }
//
//   /**
//    * @method
//    * Draw snake in canvas
//    */
//   drawSnake(){
//     // Repeat as many times as SnakePart in snake array
//     this.snake.snakeParts.forEach(function (snakePart) {
//       // If the object has the property x and y and if upper to 0
//       if(snakePart.hasOwnProperty("x") && snakePart.hasOwnProperty("y") && snakePart.x > 0 && snakePart.y > 0) {
//         // Call method draw in canvas for draw snake
//         this.canvas.drawRect(snakePart.x, snakePart.y, snakePart.size, snakePart.size, snakePart.color, snakePart.borderColor);
//       }
//     }, this); // Return class in anonymous function
//     //return this for chaining
//     return this;
//   }
//
//
//   /**
//    * @method
//    * Draw food in canvas
//    */
//   drawFood(){
//     if(this.snake.snakeParts[0].x === this.food.x && this.snake.snakeParts[0].y === this.food.y) {
//       //Change position of the food
//       this.food.positionFood(this.canvas, this.snake);
//     }
//     //Call method draw in canvas for draw food
//     this.canvas.drawRect(this.food.x, this.food.y, this.food.width, this.food.height, this.food.color, this.food.borderColor);
//     //return this for chaining
//     return this;
//   }
//
//   listener(){
//     window.onkeydown = this.eventAction;
//     this.canvasHtml.onclick = this.eventAction;
//   }
//
//   eventAction(event){
//
//     // Si direction droite ou gauche
//     if(this.direction === "right" || this.direction === "left") {
//       // Si flèche bas ou touche "s" ou click bas
//       if (event.key === "ArrowDown" || event.key === "s" || event.y > this.snake.snakeParts[0].y) {
//         this.moveSnake("down");
//       }
//       // Si flèche haut ou touche "z" ou touche "w" ou click haut
//       if (event.key === "ArrowUp" || event.key === "z" || event.key === "w" || event.y < this.snake.snakeParts[0].y) {
//         this.moveSnake("up");
//       }
//     }
//     // Si direction haut ou bas
//     else if(this.direction === "up" || this.direction === "down") {
//       // Si flèche gauche ou touche "q" ou touche "a" ou click gauche
//       if (event.key === "ArrowLeft" || event.key === "q" || event.key === "a" || event.x < this.snake.snakeParts[0].x) {
//         this.moveSnake("left");
//       }
//       // Si flèche droite ou touche "d" ou click droite
//       if (event.key === "ArrowRight" || event.key === "d" || event.x > this.snake.snakeParts[0].x) {
//         this.moveSnake("right");
//       }
//     }
//   }
//
//   moveSnake(direction){
//     this.headSnake = this.snake.snakeParts[0];
//     this.secondPartSnake = this.snake.snakeParts[1];
//     this.step = this.headSnake.size;
//
//     this.direction=direction;
//     this[direction+"Snake"]();
//   }
//
//
//   downSnake() {
//     if(
//       /*snake[0].y >= snake[1].y &&*/ this.headSnake.y < canvas.height - this.step && !this.snake.checkSnakePart(this.headSnake.x ,this.headSnake.y + this.step)
//     ) {
//       this.advancedSnake();
//     }
//
//     return this;
//   }
//   leftSnake() {
//     if(
//       this.headSnake.x <= this.secondPartSnake.x && this.headSnake.x > 0 && !this.snake.checkSnakePart(this.headSnake.x - this.step, this.headSnake.y)
//     ) {
//       this.advancedSnake();
//     }
//
//     return this;
//   }
//
//   upSnake() {
//     if(
//       this.headSnake.y <= this.secondPartSnake.y && this.headSnake.y > 0 && !this.snake.checkSnakePart(this.headSnake.x,this.snake.snakeParts[0].y - this.step)
//     ) {
//       this.advancedSnake();
//     }
//
//     return this;
//   }
//   rightSnake() {
//     if(
//       this.headSnake.x >= this.secondPartSnake.x && this.headSnake.x < canvas.width - this.step && !this.snake.checkSnakePart(this.headSnake.x + this.step, this.headSnake.y)
//     ) {
//       this.advancedSnake();
//     }
//
//     return this;
//   }
//
//   advancedSnake(){
//
//     let dx = (this.direction === "left" ? - this.step : (this.direction === "right" ? this.step : 0) );
//     let dy = (this.direction === "up" ? - this.step : (this.direction === "down" ? this.step : 0) );
//
//     this.snake.advanceSnake(new SnakePart(this.snake.snakeParts[0].x + dx, this.snake.snakeParts[0].y + dy));
//     this.canvas.clearRect();
//     this.drawSnake();
//     this.drawFood();
//
//     clearInterval(this.intervalId);
//     let ctx = this;
//     console.log(ctx);
//     this.intervalId = setInterval(this.moveSnake,100, "right", ctx);
//
//   }
// }