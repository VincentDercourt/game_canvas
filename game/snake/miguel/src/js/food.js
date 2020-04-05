class Food {
    constructor(canvas, scale) {

        // IMAGES
        this.food = new Image();
        this.food.src = 'src/sprites/food.png';

        this.gameWidth = canvas.width;
        this.gameHeight = canvas.height;
        this.scale = scale


        this.position = {
            x: Math.floor(Math.random() * (this.gameWidth/ this.scale)) * this.scale, 
            y: Math.floor(Math.random() * (this.gameHeight / this.scale)) * this.scale
        }

    }

    draw(ctx) {
        ctx.drawImage(this.food, this.position.x, this.position.y, this.scale, this.scale);
        // ctx.fillStyle = "#e74c3c";
        // ctx.fillRect(this.position.x, this.position.y, this.scale, this.scale);
    }

}