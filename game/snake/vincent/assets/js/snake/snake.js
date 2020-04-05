/**
 * @property x {number} | Position X
 * @property y {number} | Position y
 * @param [size] {number} | Size in pixel for width and height of parts of snake
 * @property color {string} | Color rgb or hex or english name for color of snake
 * @property borderColor {string} | Color rgb or hex or english name for border color of snake
 * @class
 */
class SnakePart {
  x;
  y;
  size;
  color;
  borderColor;

  /**
   * @param x {number} | Position x
   * @param y {number} | Position y
   * @param [size] {number} | Size in pixel for width and height of parts of snake
   * @param [color] {string} | Color rgb or hex or english name for color of snake
   * @param [borderColor] {string} | Color rgb or hex or english name for border color of snake
   * @constructor
   */
  constructor(x,y, size, color, borderColor) {
    this.x = x;
    this.y = y;
    this.size = size || 10;
    this.color = color || "#FFFFFF";
    this.borderColor = borderColor || "#090FFF";
  }
}

/**
 * @property snakeColor {string} | Color rgb or hex or english name for color of snake
 * @property snakeBorderColor {string} | Color rgb or hex or english name for border color of snake
 * @property widthOfParts {number} | Size in pixel of height and width of parts of snake
 * @property snake {array,SnakePart} | Array of object of parts of snake
 * @class
 */
class Snake{
  snakeParts;

  /**
   * @param [snakeParts] {array,SnakePart} | Array of object of parts of snake
   * @constructor
   */
  constructor(snakeParts) {
    this.snakeParts = snakeParts || [
      new SnakePart(300,150), new SnakePart(290, 150), new SnakePart(280,150),
    ];
    return this;
  }

  /**
   * @param part {SnakePart|object} | Instance of snakePart or object with property x and y
   * @param [end] {boolean} | if add to end of snake or first [Default add to first]
   * @method
   */
  addPart(part, end){
    // If end is define or false
    end = end || false;
    // If end equal true
    if(end){
      // Add part at end of snake
      this.snakeParts.push(part);
    }
    else {
      // Add part at start of snake
      this.snakeParts.unshift(part);
    }

    return this;
  }

  /**
   * @param [position] {number} | Position of the part to be deleted
   * @method
   */
  deletePart(position){
    // If position is lower to length of array af snake or is upper or equal to zero or snake array length -1
    position = position < this.snakeParts.length && position >= 0 ? position : this.snakeParts.length-1;

    // Delete one element of array snake at the position selected
    this.snakeParts.splice(position, 1);

    return this;
  }

  /**
   * move snake to new position
   * @param snakePart {SnakePart} | Object of type SnakePart
   * @method
   */
  advanceSnake(snakePart, eat){
    // Create new part of snake and add to snake array
    this.addPart(snakePart);
    if(!eat) {
      // Delete last part of snake
      this.deletePart();
    }
    return this;
  }

  checkSnakePart(element) {
    for(let snakePart of this.snakeParts){
      if(
        (element.x < (snakePart.x + (snakePart.width || snakePart.size))) && ((element.x + (element.width || element.size)) > snakePart.x) &&
        (element.y < (snakePart.y + (snakePart.height || snakePart.size))) && ((element.y + (element.height || element.size)) > snakePart.y)
      ){
        return true;
      }
    }
    return false
  }

  reset(snakeParts){
    this.snakeParts = snakeParts || [new SnakePart(1680,150), new SnakePart(1670, 150), new SnakePart(1660,150)];
  }
}