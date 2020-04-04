const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = "600";
canvas.height = "600";
canvas.style.border = '10px solid gray';
gameOverLose = document.getElementById('gameOverLose');
gameOverWin = document.getElementById('gameOverWin');


// INITIALISATION AUDIO
const shootPlayer = new Audio();
shootPlayer.src = "shoot.wav";
const death = new Audio();
death.src = "invaderkilled.wav";
const movingInvader = new Audio();
movingInvader.src = "fastinvader1.wav";
const gameOver = new Audio();
gameOver.src = "explosion.wav"


// INITIALISATION VARIABLES UNITE Px / SCORE / VIES / VAISSEAU / ALIENS / MISSILES / TOUCHE DIRECTIONNELLE
const box = 10;

// INITIALISATION DE score QUI DEVRA S'INCREMENTER A CHAQUE FOIS QUE L'ON TUERA UN ALIEN
// SCORE
let score = 0;

// VIES
let vie = 3;

// VAISSEAU
let player = new Player();
console.log("playerX égal " +player.x);
console.log("playerY égal " +player.y);
console.log((player.x + player.width));


// INITIALISATION TAB ALIENS
const aliens = [];
for (let i = 0; i < 20; i++){
    let alien = new Aliens(i * 50 + 50, 40);
    aliens.push(alien)
    if(aliens[i].x >= canvas.width - 50 || aliens[i].x === 0){
        aliens[i].x -= canvas.width - 100
        aliens[i].y += 40
    }
}

// MISSILES PLAYER
const missilesPlayer = [];

// MISSILES ALIENS
const missilesAliens = [];

// TOUCHE DIRECTIONNELLE
let toucheDirectionnelle;


// FONCTION DRAW DE MON CANVAS
function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height); // INDISPENSABLE POUR EFFET D'ANIMATION CANVAS

    // SCORE
    ctx.font = "bold 15px serif";
    ctx.fillStyle = "red";
    ctx.fillText('SCORE : ' + score , 10, 20);

    // VIE
    ctx.font = "bold 15px serif";
    ctx.fillStyle = "red";
    ctx.fillText('VIES : ' + vie , 540, 20);

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ PARTIE PLAYER ~~~~~~~~~~~~~~~~~~~~~~~*/    
    // VAISSEAU + CANON + ALGO DEPLACEMENT
    player.drawPlayer();
    player.move();


    // DIRECTION PLAYER 
    if (toucheDirectionnelle == "DROITE" && player.x != canvas.width - 50){
        player.x = player.x + 6;
        console.log("playerX égal " +player.x);
    }
    if (toucheDirectionnelle == "GAUCHE" && player.x !=0){
        player.x = player.x - 6;
        console.log("playerX égal " +player.x);
    }
    

    // ALGO TIRS MISSILES PLAYER
    for (let i = 0; i < missilesPlayer.length; i++){ 
        missilesPlayer[i].drawMissile();
        missilesPlayer[i].trajectoireMissile();        
    }


    let gameover = false;
    for (let i = 0; i < missilesPlayer.length; i++) {
        for (j = 0; j < aliens.length; j++) {
            if (missilesPlayer[i].checkedCollisionAlien(aliens[j])) {
                gameover = true;
                aliens.splice(j, 1); // SI COLLISION MISSILE => ALIEN = TRUE ON SUPPRIME L'ALIEN A L'INDICE J QUI A ETE TOUCHE
                missilesPlayer.splice(i, 1); // ==> PUIS ON SUPPRIME LE MISSILE QUI A PERCUTE L'ALIEN
                score = score + 20 // INCREMENTATION SCORE
                console.log(aliens);
                
                if (aliens.length === 0) { // SI ALIENS LENGTH EGAL 0 PARTIE GAGNEE
                    clearInterval(game)
                    gameOverWin.style.display = "block";
                }
            }
        }
    } 


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ PARTIE ALIENS ~~~~~~~~~~~~~~~~~~~~~~~*/ 
    // ALIENS
    let collision = false; // INITIALISATION VARIABLE DETECTION COLLISION POUR LE CHANGEMENT DE TRAJECTOIRE
    let alienRandomReadyToShoot = false;


    for (let i = 0; i < aliens.length; i++){ // AJOUT DES ALIENS
        aliens[i].drawAliens();
            aliens[i].trajectoireAliens();
            // movingInvader.play()

        // ALGO COLLISION ALIEN BORD CANVAS
        // DETECTION COLLISION BORD CANVAS
        if (aliens[i].x > canvas.width - 50 || aliens[i].x <= 20) {
            collision = true;
        }
        else if(aliens[i].y === (player.y - 40)) { // SI ALIENS ATTEINT ZONE PLAYER GAME OVER : PERDU !!
            score = "Game Over"
            console.log("GameOver");
            clearInterval(game)
            gameOverLose.style.display = "block";
        }
    }

    // SI COLLISION ALIEN/BORD CANVAS EST VRAI ALORS CHANGEMENT DE TRAJECTOIRE 
    for (let i = 0; i < aliens.length; i++){   
        if (collision) {
            aliens[i].trajectoireAliensDescendante();
        }
    }

    for (let i = 0; i < missilesAliens.length; i++){  // MISSILES DES ALIENS
            missilesAliens[i].drawMissile()
            missilesAliens[i].trajectoireMissileAlien()      
    }

    // ALGO TIR ALEATOIRE ALIENS
    if (Math.random() < 0.3 && aliens.length > 0){
        let a = aliens[Math.round(Math.random() * (aliens.length - 1))] // DEFINITION DES POSITIONS ALEATOIRES DE DEPART DES MISSILES DES ALIENS

        for(let i = 0; i < aliens.length; i++){
            let b = aliens[i];

            if(aliens[i].shootRandomAliens(a.x, a.y, a.width, a.height, b.x, b.y, b.width, b.height)){ 
                a = b; // ALIENS ALEATOIRES EGAL A ALIENS[i]
            }

            alienRandomReadyToShoot = true; 
        }

        if(alienRandomReadyToShoot === true){
            missilesAliens.push(new Missiles(a.x, a.y, "yellow"))
            console.log(missilesAliens);
            
        }

        for( let i = 0; i < missilesAliens.length; i++){ 
            if(missilesAliens[i].checkedCollisionPlayer(player) === true){  //  SI ALIEN SHOOT PLAYER 
                missilesAliens.splice(i, 1) // ON SUPPRIME LE MISSILE QUI A PERCUTE LE PLAYER
                score = score - 10 // DECREMENTATION SCORE
                vie = vie - 1 // DECREMENTATION VIE            
            }
            else if(missilesAliens[i].y > canvas.height){ // SI MISSILES ALIENS SORT DU CANVAS SUPPRIMER LE MISSILE
                missilesAliens.splice(i, 1)     // ON SUPPRIME LE MISSILE QUI A DEPASSE LA TAILLE MAX DU CANVAS          
            }
            else if(vie === 0 && missilesAliens[i].checkedCollisionPlayer(player) === true){  // SI ON A PLUS DE VIE ET MISSILE PERCUTE PLAYER GAME OVER PARTIE PERDU
                score = "Game Over"
                clearInterval(game)
                gameOverLose.style.display = "block";            
            }
        }   
    }
   
}
// BOUCLE DE JEU
let game = setInterval(draw, 90)



function Player() {
    this.x = canvas.width / 2;
    this.y = canvas.height - 20;
    this.direction = 2;
    this.width = 40;
    this.height = 20;
    
    this.drawPlayer = function(){
        // VAISSEAU + CANON
        ctx.beginPath()
        ctx.fillStyle = "red"
        ctx.fillRect(this.x + 15, this.y - 10, 10, 30) // CANON DU VAISSEAU
        ctx.fillRect(this.x, this.y, 40, 20)
        ctx.fill()
    }
    
    this.move = function(){
        document.addEventListener('keydown', (event)=>{
            if (event.key === "ArrowRight") {      // DEPLACEMENT VERS LA DROITE      
                toucheDirectionnelle = "DROITE";
            }
            else if (event.key === "ArrowLeft") {      // DEPLACEMENT VERS LA GAUCHE
                toucheDirectionnelle = "GAUCHE";
            }
        })
    }
}

// INITIALISATTION DE L'OBJET ALIENS QUI A POUR PARAMETRE LES COORDONEES X ET Y ET UNE IMAGE (REPRESENTANT UN ALIEN)
function Aliens(x, y) {
    this.img = new Image();
    this.img.src = 'alien.png'; 
    this.x = x;
    this.y = y;
    this.size = 30;  // DEFINITION DE LA TAILLE DE L'IMAGE EN LARGEUR ET EN HAUTEUR
    this.direction = 3; // DEFINITION DE LA DIRECTION PAR DEFAUT DE NOS ALIENS (1 est POSITIF donc direction VERS LA DROITE)

    // FONCTION DESSINER ALIENS
    this.drawAliens = function() {
        ctx.drawImage(this.img, this.x, this.y, this.size, this.size)
    }
  
    // FONCTION TRAJECTOIRE PAR DEFAUT ALIENS
    this.trajectoireAliens = function() {
        this.x = this.x + this.direction *2;
    }

    // FONCTION TRAJECTOIRE DESCENDANTE PUIS INVERSEE ALIENS
    this.trajectoireAliensDescendante = function() {
        this.direction *= -1;   // TRAJECTOIRE INVERSE (1 est NEGATIF donc VERS LA GAUCHE)
        this.y += box * 2;    // TRAJECTOIRE DESCENDANTE (INCREMENTATION DE Y DONC direction VERS LE BAS)
    }
    
    // TIR ALIENS ALEATOIRE
    this.shootRandomAliens = function(alienX, alienY, alienWidth, alienHeight, missileX, missileY, missileWidth, missileHeight){
    return alienX < missileX + missileWidth && missileX < alienX + alienWidth && alienY < missileY + missileHeight && missileY < alienY + alienHeight;

}


        
}
// INITIALISATTION DE L'OBJET MISSILES QUI A POUR PARAMETRE LES COORDONEES X ET Y
function Missiles(x, y, color) {
    this.x = x; // Coordonnée X du Missile
    this.y = y; // Coordonnée Y du Missile
    this.color = color // Couleur du missile
    this.rayon = 5; // Taille du Rayon du Missile
 

    // FONCTION DESSINER MISSILE
    this.drawMissile = function() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.rayon, 0, Math.PI * 2);
        ctx.fill();
    };
    
    // FONCTION TRAJECTOIRE MISSILE
    this.trajectoireMissile = function() {
        this.y -= box * 2; // EFFET D'ANIMATION EN DECREMENTANT "Y" ( DONC TRAJECTOIRE MONTANTE )
    };

    // FONCTION TRAJECTOIRE MISSILE ALIEN
    this.trajectoireMissileAlien = function() {
        this.y = this.y + (box * 2); // EFFET D'ANIMATION EN INCREMENTANT "Y" ( DONC TRAJECTOIRE DESCENDANTE )
    };

    // FONCTION COLLISION MISSILE PLAYER ALIEN
    this.checkedCollisionAlien = function(target) { // DEFINITION ZONE INTERVALLE DE PERCUTION DES ALIENS
    // SI LES COORDONNEES "X" ET "Y" DE MON MISSILE SONT EGALES AUX COORDONNEES "X" ET "Y" DE MON ALIEN return TRUE sinon FALSE
        if ((this.y === target.y && this.x === target.x) || (this.x <= target.x + 30 && this.x >= target.x && this.y == target.y) || (this.y === (target.y + 30) && this.x === (target.x + 30))) {
            console.log("boom");      
            return true;
        }else{
            return false;
        }
    }

    this.checkedCollisionPlayer = function(target) {  // DEFINITION ZONE INTERVALLE DE PERCUTION DU PLAYER
        if ((this.x >= target.x && this.x <= target.x + target.width) && this.y === target.y){
            console.log("booooooommmmm")
            return true;
        }else{
            return false;
        }
    }
}

//--------FONCTION TIR---------//
// TIR PLAYER
document.addEventListener('keydown', shooting) 
function shooting(){
    if (event.key === " ") {          // TOUCHE DE TIR DE MISSILES
        toucheDirectionnelle = "SPACE";
        let missile = new Missiles(player.x + 25, 560, "red");  // A L'APPUIE DE LA TOUCHE ON CREE UN NOUVEAU MISSILE
        missilesPlayer.push(missile); // PUIS ON RAJOUTE LE NOUVEAU MISSILE A NOTRE TABLEAU MISSILES PRECEDEMMENT DEFINI GLOBALEMENT
        // shootPlayer.play()   
    }    
}



