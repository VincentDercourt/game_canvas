
/**
 * @property ctx {CanvasRenderingContext2D}
 * @class
 */
class Canvas{
  ctx;
  width;
  height;

  /**
   * @param canvas {HTMLCanvasElement}
   * @param [width] {number}
   * @param [height] {number}
   * @constructor
   */
  constructor(canvas, width, height) {
    this.width = canvas.width = width | 200;
    this.height = canvas.height = height | 200;
    this.ctx = canvas.getContext("2d");
    return this;
  }


  /**
   * @param x {number} | Position to x
   * @param y {number} | Position to y
   * @param width {number} | Width of rectangle
   * @param height {number} | height of rectangle
   * @param color {string} | Color of rectangle
   * @param borderColor {string} | color of border of rectangle
   * @method
   */
  drawRect(x, y, width, height, color, borderColor){
    x = x || 0;
    y = y || 0;
    width = width || 10;
    height = height || 10;

    // Assign a color to background of snake
    this.ctx.fillStyle = color || "#FFFFFF";
    // Assign a border color to background of snake
    this.ctx.strokeStyle = borderColor || "#FF0000";
    // Assign width in px to border of snake
    this.ctx.lineWidth = 1;
    // Draw a rectangle in the canvas
    this.ctx.fillRect(x, y, width, height);
    // Draw a border of rectangle in the canvas
    this.ctx.strokeRect(x, y, width, height);

    return this
  }

  clearRect(x, y, width, height){
    x = x || 0;
    y = y || 0;
    width = width || this.width;
    height = height || this.width;

    this.ctx.clearRect(0,0, this.width, this.height);
  }

  collisionRect(rect1, rect2){
    return (rect1.x < (rect2.x + (rect2.width || rect2.size))) && ((rect1.x + (rect1.width || rect1.size)) > rect2.x) &&
      (rect1.y < (rect2.y + (rect2.height || rect2.size))) && ((rect1.y + (rect1.height || rect1.size)) > rect2.y);

  }
}