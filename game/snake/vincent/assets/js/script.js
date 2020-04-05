//On load call init function
window.onload = init;
window.onresize = init;

function init() {
  let maxWidth = 800;
  let maxHeight = 600;

  let widthSnake = window.innerWidth - 300;
  if(widthSnake > maxWidth)
    widthSnake = maxWidth;

  let heightSnake = window.innerHeight - document.querySelector("body>header").clientHeight - 300;
  if(heightSnake > maxHeight)
    heightSnake = maxHeight;

  new SnakeGame("#canvas", widthSnake,heightSnake);
}
