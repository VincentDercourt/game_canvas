// CREATION ZONE DE DESSEIN ET MON CONTEXTE 2dimensions
const canvas = document.getElementById('canvas');
canvas.width = 400;
canvas.height = 400;
canvas.style.border = "10px solid #ff05057d";
canvas.style.backgroundColor = "#86868694";
  
const ctx = canvas.getContext('2d');

/*------ INITIALISATION DES VARIABLES SONS / SCORE/ UNITE PX/ SERPENT/ POMME/ TOUCHE DIRECTIONNELLE / VITESSE  -------*/

/* Constantes Audios */
const miam = new Audio();
miam.src = "sounds/miam.mp3";

const gameover = new Audio();
gameover.src = "sounds/GameOver.mp3";
    
// INITIALISATION DE score QUI DEVRA S'INCREMENTER A CHAQUE FOIS QUE LE SERPENT MANGERA UNE POMME
//SCORE
    let score = 0;


// TAILLE D'UN ELEMENT EN PIXEL h=10px && w=10px
    let box = 10;


// INITIALISATION DE snake QUI SERA UN TABLEAU QUI GRANDIRA PLUS IL MANGERA DE FRUITS
//SERPENT
    let snake = [];
    snake[0] = {
        x : 9 * box, // Coordonnée X de départ de mon serpent
        y : 8 * box  // Coordonnée Y de départ de mon serpent
    };

//Sélection de la tête du serpent pour pouvoir le déplacer par la suite : SnakeHeadX(droite à gauche) ET SneakHeadY(haut en bas)
    let snakeHeadX = snake[0].x;
    let snakeHeadY = snake[0].y;

// POMME
// POSITION ALEATOIRE
    let apple = {
        x : Math.floor(Math.random() * 35 + 1 ) * box, 
        y : Math.floor(Math.random() * 25 + 9) * box 
    };

// TOUCHE DIRECTIONNELLE 
    let toucheDirectionnelle;

// INITIALISATION DE i POUR PARCOURIR MON TABLEAU snake
    let i;

// INITIALISATION DE LA VARIABLE VITESSE QUI CHANGERA DE VALEUR POUR AUGMENTER LA DIFFICULTE A CHAQUE MULTIPLE DE 5
    let vitesse = 0

// GAME OVER
    const gameOver = document.querySelector('#gameOver');


//------------- FONCTION DEPLACER ----------------//
    document.addEventListener('keydown', deplacer);
    function deplacer(){  
        
//  EVENEMENTS ATTENDUS / TOUCHES DE CONTROLES
        if (event.key === "ArrowRight" && toucheDirectionnelle !== "GAUCHE") {            
            toucheDirectionnelle = "DROIT";
        }
        else if (event.key === "ArrowLeft" && toucheDirectionnelle !== "DROIT") {
            toucheDirectionnelle = "GAUCHE";
        }
        else if (event.key === "ArrowUp" && toucheDirectionnelle !== "BAS") {
            toucheDirectionnelle = "HAUT";
        }
        else if (event.key === "ArrowDown" && toucheDirectionnelle !== "HAUT") {
            toucheDirectionnelle = "BAS";
        }

    }

//------------ FONCTION DESSINER -----------//
    function draw () { 
    // ON EFFACE NOTRE CANVAS AVEC UN clearRect POUR GARDER CET EFFET D'ANIMATION
    // SI ON NE LE FAIT PAS LES ELEMENTS DESSINER SUR LE CANVAS S'ACCUMULERONT ET L'ON AURA PAS D'EFFET D'ANIMATION ATTENDU
        ctx.clearRect(0, 0, canvas.width, canvas.height);

    // SCORE
        ctx.strokeStyle = 'red';
        ctx.strokeRect(0, 0, canvas.width, 28);
        ctx.font = "15px Arial";
        ctx.fillStyle = "#2a0438";
        ctx.fillText('SCORE : ' + score, 10, 20);
        


    // INITIALISATION DE apple QUI DISPARAITRA QUAND ON LA MANGERA ET SERA REGENERER A DE NOUVELLES COORDONNEES ALEATOIRES DANS LE CANVAS
    //POMME    
        ctx.beginPath();
        ctx.fillStyle = 'red' ;
        ctx.fillRect(apple.x, apple.y, box, box);  
        ctx.fill();

    // ALGO MANGER POMME
        if(snakeHeadX === apple.x && snakeHeadY === apple.y) { // SI LA TETE DE MON SERPENT EST EGAL AUX COORDONNEES DE MA POMME ALORS
            score++ // INCREMENTATION DE SCORE
            apple = { // REGENERATION D'UNE NOUVELLE POMME
            x : Math.floor(Math.random() * 35 + 1 ) * box, 
            y : Math.floor(Math.random() * 25 + 9) * box 
            }
            snake.unshift(snakeHeadX + snakeHeadY); // ON AJOUTE UNE BOX A NOTRE TABLEAU SERPENT
            miam.play()
        }


    // INITIALISATION DE i POUR PARCOURIR MON TABLEAU snake // ALGORITHMES (ajouter / supprimer contenu(déplacements et manger), détecter collisions)
    // CORPS DU SERPENT (TETE ROUGE / CORPS NOIR)
        for(let i = 0; i < snake.length; i++){ 
            i == 0 ? ctx.strokeStyle = '#2a0438': ctx.strokeStyle = 'black'; 
            i == 0 ? ctx.fillStyle = '#ffffff00': ctx.fillStyle = 'black';
                ctx.beginPath();
                ctx.strokeRect(snake[i].x, snake[i].y, box, box);  
                ctx.fillRect(snake[i].x, snake[i].y, box, box);  
        }



    // ALGO DEPLACEMENT 
    // TOUCHES DE CONTROLES DU SERPENT
        if (toucheDirectionnelle === "DROIT") {
            snakeHeadX += box + vitesse; // ** =>> ON AJOUTE A NOTRE SERPENT UN ELEMENT SUR L'AXE X DE NOTRE CANVAS
        }
        if (toucheDirectionnelle === "GAUCHE") {
            snakeHeadX -= box + vitesse; // ** =>> ON RETIRE A NOTRE SERPENT UN ELEMENT SUR L'AXE X DE NOTRE CANVAS
        }
        if (toucheDirectionnelle === "HAUT") {
            snakeHeadY -= box + vitesse; // ** =>> ON RETIRE A NOTRE SERPENT UN ELEMENT SUR L'AXE Y DE NOTRE CANVAS
        }
        if (toucheDirectionnelle === "BAS") {
            snakeHeadY += box + vitesse; // ** =>> ON AJOUTE A NOTRE SERPENT UN ELEMENT SUR L'AXE Y DE NOTRE CANVAS
        }

        snake.pop() // 1 =>> ON EFFACE LE DERNIER ELEMENT DU SERPENT

    // NOUVELLE TETE DE NOTRE SERPENT POUR L'EFFET DE DEPLACEMENT
        let snakeHead = {    // 2 =>> STOCKAGE DE NOTRE TETE DE SERPENT DANS UNE VARIABLE
            x : snakeHeadX,
            y : snakeHeadY
        }

    //     ALGO COLLISION / GAME OVER
        if(snakeHeadX < box - box || snakeHeadY <= box * 2 || snakeHeadX >= canvas.width || snakeHeadY >= canvas.height || collision(snakeHead, snake)){
            console.log("collision")
            score = "GAME OVER";
            clearInterval(game)
        }
        snake.unshift(snakeHead)  // ON AJOUTE NOTRE TETE DE SERPENT A NOTRE TABLEAU SERPENT
        
        
        if (score === "GAME OVER"){
            gameOver.style.display = "block";
            gameover.play();  
        }
    }

//-------FONCTION COLLISION SERPENT SERPENT---------//
function collision(head, tabSnake){
    for(let i = 0; i < tabSnake.length; i++){
        if(head.x == tabSnake[i].x && head.y == tabSnake[i].y){               
            return true;
        }
        
    }return false
}



//----------- BOUCLE DE JEU --------------//
    let game = setInterval(draw, 100) 



    

