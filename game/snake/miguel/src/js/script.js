const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


// Game options
const scale = 30;
const speed = 1;
let gameLoopSpeed = 90;
let score = 0;
let lastScore = 0;

let snake = new Snake(canvas, scale);

let food;
food = new Food(canvas, scale);

let collision = new Collision(snake, canvas, scale);
new InputHandler(snake, speed);


// IMAGES



// GAME LOOP
// let lastTime = 0;
// function gameLoop(timeStamp) {

//     let deltaTime = timeStamp - lastTime;
//     lastTime = timeStamp;



//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     snake.update(deltaTime);
//     snake.draw(ctx);

//     if (food.draw(ctx)) console.log("Miam !");
    

//     requestAnimationFrame(gameLoop);
// }

// gameLoop();

// let game = setInterval(() => {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     snake.update();
//     collision.update();
//     snake.draw(ctx);
//     food.draw(ctx);

//     if (snake.eat(food)) {
//         food = new Food(canvas, scale);
//         snake.grow();
//         score++;
//         console.log(score)
        

//     };

//     if ((score % 5) === 0) gameLoopSpeed -= 20;

// }, gameLoopSpeed);




let game = setInterval(gameLoop, gameLoopSpeed);

function gameLoop() {

    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = "#8ecc39";
    // ctx.fillRect(0, 0, canvas.width, canvas.height)
    


    // Draw board
    for (let i = 0; i < canvas.width / scale; i++) {
        
        for (let j = 0; j < canvas.height / scale; j++) {

            ctx.fillStyle = ((i + j ) % 2 == 0) ? "#aad751" : "#a2d149";
            ctx.fillRect(j * scale, i * scale, scale, scale);

        }
    }

    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, scale * (canvas.width / scale), scale * (canvas.height / scale));



    snake.update();
    collision.update();
    snake.draw(ctx);
    food.draw(ctx);

    // Quand le serpent mange 
    if (snake.eat(food)) {
        food = new Food(canvas, scale);
        snake.grow();
        score++;
        console.log(`Score: ${score}`);
    
    };

    // Tout les 5 points on augmente la vitesse de 1 max 45
    if ((score % 5) === 0 && score >= 1 && lastScore !== score && gameLoopSpeed > 45) {
        lastScore = score;
        gameLoopSpeed--;
        console.log(`Game loop speed : ${gameLoopSpeed}`);

        // Obligé de faire ça pour changer la valeur de la boucle de jeu.
        clearInterval(game);
        game = setInterval(gameLoop, gameLoopSpeed);

    }
}