
class Food {
  color;
  borderColor;
  width;
  height;
  x;
  y;

  constructor(canvas, snake, color, borderColor, width, height) {
    this.color = color || "#FF0000";
    this.borderColor = borderColor || "#FF0000";
    this.width = width || 10;
    this.height = height || 10;

    this.positionFood(canvas, snake);

    return this;
  }

  /**
   * @param canvas {Canvas}
   * @param snake {Snake}
   * @returns {Food}
   */
  positionFood(canvas, snake){
    this.x = this.randomNumber(canvas.width-10, snake.snakeParts[0].size);
    this.y = this.randomNumber(canvas.height-10, snake.snakeParts[0].size);
    if (snake.checkSnakePart(this, this)) {
      this.positionFood(canvas, snake);
    }
    return this;
  }

  /**
   * @param max {number}
   * @param scale {number}
   * @returns {number}
   * @private
   */
  randomNumber(max, scale){
    let min = 20;
    return Math.round((Math.random() * (max-min) + min) / scale) * scale;
  }
}
