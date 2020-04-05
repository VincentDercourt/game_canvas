class InputHandler {

    constructor(snake, speed) {
        document.addEventListener('keydown', event => {
            switch (event.key) {
                case "z":
                case "ArrowUp":
                    snake.direction(0, -speed, 270);
                    break;
                case "q":
                case "ArrowLeft":
                    snake.direction(-speed, 0, 180);
                    break;
                case "s":
                case "ArrowDown":
                    snake.direction(0, speed, 90);
                    break;
                case "d":
                case "ArrowRight":
                    snake.direction(speed, 0, 0);
                    break;
                case " ":
                    // debug rapide pour agrandir le serpent
                    snake.grow();
                    score++
            }
        });
    }
}