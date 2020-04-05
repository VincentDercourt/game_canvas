class Collision {
    constructor(snake, canvas, scale) {
        
        this.gameWidth = canvas.width;
        this.gameHeight = canvas.height;



        this.scale = scale;
        this.snake = snake;

    }

    update() {

        // collision
        for (let i = 1; i < this.snake.body.length; i++) {

            // reset game
            if (this.snake.body[0].x === this.snake.body[i].x && this.snake.body[0].y === this.snake.body[i].y) {
                console.log("Perdu.");
                clearInterval(game);
            }
        }

        // Check mur coté gauche && coté droit
        // if (this.snake.position.x < 0) this.snake.position.x = 0;
        // if (this.snake.position.x + this.scale > this.gameWidth) this.snake.position.x = this.gameWidth - this.scale;

        if (this.snake.position.x < 0) clearInterval(game);
        if (this.snake.position.x + this.scale > this.gameWidth) clearInterval(game);

        // Check mur en haut && en bas
        // if (this.snake.position.y < 0) this.snake.position.y = 0;
        // if (this.snake.position.y + this.scale > this.gameHeight) this.snake.position.y = this.gameHeight - this.scale

        if (this.snake.position.y < 0) clearInterval(game);
        if (this.snake.position.y + this.scale > this.gameHeight) clearInterval(game);
                
    }
}