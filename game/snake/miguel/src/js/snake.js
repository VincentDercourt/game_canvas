class Snake {

    constructor(canvas, scale) {

        // IMAGES
        this.head = new Image();
        this.head.src = 'src/sprites/head.png';

        this.bd = new Image();
        this.bd.src = 'src/sprites/body.png';

        this.tail = new Image();
        this.tail.src = 'src/sprites/tail.png';

        this.angle = 0;

        // Taille du canvas
        this.gameWidth = canvas.width;
        this.gameHeight = canvas.height;

        this.scale = scale;


        // Base speed pour eviter le perdu au debutw
        this.speed = {
            x: 1,
            y: 0
        }

        this.body = [];
        this.len = 4;


        // Position de départ du serpent
        this.position = {
            x: 9 * this.scale, 
            y: 5 * this.scale
        }

    }

    // Vincent inspiration
    // function advanceSnake(){
    //     const head= {x: snake[0].x+ dx, y: snake[0].y+ dy};
    //     const lastPart = snake[snake.length-1];
    //     // Ajoute une ligne au début du tableau
    //     snake.unshift(head);
    //     if(snake[0].x === foodX && snake[0].y === foodY){
    //       createFood();
    //     }else {
    //       // Efface la dernière partie du snake sur le canvas
    //       ctx.clearRect(lastPart.x, lastPart.y, widthOfParts, canvas.height);
    //       // Enlève une ligne à la fin du tableau snake
    //       snake.pop();
    //     }
    //     drawFood();
    //     drawSnake();
    // }

    grow() {
        this.len++;
    }

    eat(food) {

        if (this.position.x === food.position.x && this.position.y === food.position.y) {
            return true;
        } else {
            return false;
        }
        
    }

    direction(x, y, angle) {

        // ctx.rotate(angle*Math.PI/180);

        this.angle = angle;
        // Empecher le serpent d'aller dans le sens oposé
        if (!(this.speed.x !== x && this.speed.y !== y)) return

        this.speed.x = x;
        this.speed.y = y;

    }

    draw(ctx) {
        // this.body.forEach(function(body) {
        //     ctx.fillStyle = "#7D8545";
        //     ctx.fillRect(body.x, body.y, this.scale, this.scale);
        // })



        for (let i = 0; i < this.body.length; i++) {

        
            // ctx.fillStyle = "#7D8545";
            // ctx.fillStyle = (i === 0) ? "#426fe3" : "#7D8545";

            // (i === 0) ? ctx.drawImage(head, this.body[i].x, this.body[i].y, this.scale, this.scale) : ctx.drawImage(bd, this.body[i].x, this.body[i].y, this.scale, this.scale)

            // ctx.save();
            // ctx.translate(this.gameWidth/2, this.gameHeight/2);
            // ctx.rotate(this.angle*Math.PI/180);
            // ctx.drawImage(this.head,-this.head.width/2,-this.head.width/2);
            // ctx.restore();

            switch (i) {
                case 0:
                    // ctx.rotate(this.angle*Math.PI/180);
                    ctx.drawImage(this.head, this.body[i].x, this.body[i].y, this.scale, this.scale);
                    break;
            
                case this.body.length - 1:
                    // ctx.rotate(this.angle*Math.PI/180);
                    ctx.drawImage(this.tail, this.body[i].x, this.body[i].y, this.scale, this.scale);
                    break;

                default:
                    // ctx.rotate(this.angle*Math.PI/180);
                    ctx.drawImage(this.bd, this.body[i].x, this.body[i].y, this.scale, this.scale);
                    break;
            }

            // if (i === this.body.length - 1) ctx.drawImage(tail, this.body[i].x, this.body[i].y, this.scale, this.scale)
            
            // ctx.fillRect(this.body[i].x, this.body[i].y, this.scale, this.scale);
        }

    }

    update() {

        // Taille serpent
        this.body.unshift({x: this.position.x, y: this.position.y});
        if (this.body.length > this.len) this.body.pop();

        // Speed
        this.position.x = this.position.x + this.speed.x * this.scale;
        this.position.y = this.position.y + this.speed.y * this.scale;
    }

}