const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// INITIALISATION VARIABLES UNITE Px / SCORE/ VAISSEAU / MISSILES / TOUCHE DIRECTIONNELLE
const box = 10;

// INITIALISATION DE score QUI DEVRA S'INCREMENTER A CHAQUE FOIS QUE L'ON TUERA UN ALIEN
// SCORE
let score = 0;

// VAISSEAU
let vaisseau = {
    x : box * 30,
    y : box * 59
};



// MISSILE
const missiles = [];
const missilesAliens = [];


// TOUCHES DIRECTIONNELLES POUR DIRIGER MON VAISSEAU ET LANCER DES MISSILES
let toucheDirectionnelle;

// ALIENS
const aliens = [];
let alien = new Image();
alien.src = 'alien.png';
for (let i = 0; i < 18; i++){
    aliens[i] = new Aliens(alien, i * 80 + 80, 60);

    if( aliens[i].x > 480){
        aliens[i].x -= 480
        aliens[i].y += 40
    }
    if( aliens[i].x > 480){
        aliens[i].x -= 480
        aliens[i].y += 40
    }
    // console.log(aliens[i].y);
    // console.log(Math.floor(Math.random() * (18)));
    // console.log(i % 18);
    
}


// FONCTION DRAW DE MON CANVAS
function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    canvas.width = "600";
    canvas.height = "600";
    canvas.style.border = '10px solid gray';

    // SCORE
    ctx.font = "26px serif";
    ctx.fillStyle = "red";
    ctx.fillText('SCORE : ' + score , 10, 20);

    // VAISSEAU + CANON
    ctx.beginPath()
    ctx.fillStyle = "white"
    ctx.fillRect(vaisseau.x, vaisseau.y, 50, 20)
    ctx.fillRect(vaisseau.x + 20, vaisseau.y - 10, 10, 30) // CANON DU VAISSEAU
    ctx.fill()

    // ALIENS
    let collision = false; // INITIALISATION VARIABLE DETECTION COLLISION POUR LE CHANGEMENT DE TRAJECTOIRE

    // ALGO POUR DESSINER ALIENS ET TRAJECTOIRE ALIENS PAR DEFAUT
    for (i = 0; i < aliens.length; i++){
        aliens[i].drawAliens();
        // aliens[i].trajectoireAliens();
       
    // ALGO COLLISION ALIEN BORD CANVAS
        // DETECTION COLLISION BORD CANVAS
        if (aliens[i].x === canvas.width - 30 || aliens[i].x === 0) {
            collision = true;
        }
    }
       
    // SI COLLISION ALIEN/BORD CANVAS EST VRAI ALORS CHANGEMENT DE TRAJECTOIRE 
    for (i = 0; i < aliens.length; i++){   
        if (collision) {
            aliens[i].trajectoireAliensDescendante();
        }
            // CREATION ET LANCEMENT DES MISSILES DES ALIENS
    }


    // ALGO POUR LANCER DES MISSILES
    // QUAND TOUCHE DIRECTIONNELLE ESPACE APPUYER ALORS DESSINER MISSILE PUIS LANCER MISSILE
    for (let i = 0; i < missiles.length; i++) {
        // CREATION ET LANCEMENT DES MISSILES DU JOUEUR
        missiles[i].drawMissile();
        missiles[i].trajectoireMissile();
    }

    for (let i = 0; i < missiles.length; i++) {
        for (let j = 0; j < aliens.length; j++) {
            if (missiles[i].shoot(aliens[j])) {
                aliens.splice(j, 1); // SI COLLISION MISSILE => ALIEN = TRUE ON SUPPRIME L'ALIEN A L'INDICE J QUI A ETE TOUCHE
                missiles.splice(i, 1); // ==> PUIS ON SUPPRIME LE MISSILE QUI A PERCUTE L'ALIEN
                if (j >= 0 && j < 6){
                    score = score + 30
                }
                else if (j >= 6 && j < 12){
                    score = score + 20
                }
                else if (j >= 12 && j < 18){
                    score = score + 10
                }
            }
        }
    } 
    
}
// BOUCLE DE JEU
setInterval(draw, 90)



// ------------DEFINITION DES FONCTIONS------------- //


// INITIALISATTION DE L'OBJET MISSILES QUI A POUR PARAMETRE LES COORDONEES X ET Y
function Missiles(x, y) {
    this.playerX = canvas.width / 2;
    this.playerY = canvas.height - 10;

    this.drawPlayer = function(){
        ctx.beginPath()
        ctx.fillStyle = "white"
        ctx.fillRect(this.playerX, this.playerY, 50, 20)
        ctx.fillRect(this.playerX + 20, this.playerY - 10, 10, 30) // CANON DU VAISSEAU
        ctx.fill()
    }

    this.x = x; // Coordonnée X du Missile
    this.y = y; // Coordonnée Y du Missile
    this.rayon = 5; // Taille du Rayon du Missile

    // FONCTION DESSINER MISSILE
    this.drawMissile = function() {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(this.x, this.y, this.rayon, 0, Math.PI * 2);
        ctx.fill();
    };
    
    // FONCTION TRAJECTOIRE MISSILE
    this.trajectoireMissile = function() {
        this.y -= box * 2; // EFFET D'ANIMATION EN DECREMENTANT "Y" ( DONC TRAJECTOIRE MONTANTE )
    };
        
    // FONCTION TRAJECTOIRE MISSILE ALIEN
    this.trajectoireMissileAlien = function() {
        this.y = this.y + box; // EFFET D'ANIMATION EN INCREMENTANT "Y" ( DONC TRAJECTOIRE DESCENDANTE )
    };

    // FONCTION COLLISION MISSILE ALIEN
    this.shoot = function(ennemy) {
    // SI LES COORDONNEES "X" ET "Y" DE MON MISSILE SONT EGALES AUX COORDONNEES "X" ET "Y" DE MON ALIEN return TRUE sinon FALSE
        if ((this.y === ennemy.y && this.x === ennemy.x) || (this.x < ennemy.x + 40 && this.x > ennemy.x && this.y == ennemy.y) || (this.y === (ennemy.y + 40) && this.x === (ennemy.x + 40))) {
            console.log("boom");      
            return true;
        }else{
            return false;
        }
    }
}


// INITIALISATTION DE L'OBJET ALIENS QUI A POUR PARAMETRE LES COORDONEES X ET Y ET UNE IMAGE (REPRESENTANT UN ALIEN)
function Aliens(img, x, y) {
    this.img = img  
    this.x = x;
    this.y = y;
    this.size = 30;  // DEFINITION DE LA TAILLE DE L'IMAGE EN LARGEUR ET EN HAUTEUR
    this.direction = 2.5; // DEFINITION DE LA DIRECTION PAR DEFAUT DE NOS ALIENS (1 est POSITIF donc direction VERS LA DROITE)

    // FONCTION DESSINER ALIENS
    this.drawAliens = function() {
        ctx.drawImage(this.img, this.x, this.y, this.size, this.size)
    }
  
    // FONCTION TRAJECTOIRE PAR DEFAUT ALIENS
    this.trajectoireAliens = function() {
        this.x = this.x + this.direction; 
    }

    // FONCTION TRAJECTOIRE DESCENDANTE PUIS INVERSEE ALIENS
    this.trajectoireAliensDescendante = function() {
        this.direction *= -1;   // TRAJECTOIRE INVERSE (1 est NEGATIF donc VERS LA GAUCHE)
        this.y += this.size;    // TRAJECTOIRE DESCENDANTE (INCREMENTATION DE Y DONC direction VERS LE BAS)
    }
    this.shoot = function(){
        let alienMissile = new Missiles(aliens[Math.floor(Math.random() * (18))].x, aliens[Math.floor(Math.random() * (18))].y);
        missilesAliens.push(alienMissile);
    }
}


//--------FONCTION DEPLACER---------//
document.addEventListener('keydown', deplacer) 
function deplacer(){
    // ALGO DEPLACEMENT 
    // TOUCHES DE CONTROLES DU VAISSEAU ET LANCEUR DE MISSILES
    if (event.key === "ArrowRight") {      // DEPLACEMENT VERS LA DROITE      
        vaisseau.x += box; 
    }
    else if (event.key === "ArrowLeft") {      // DEPLACEMENT VERS LA GAUCHE
        vaisseau.x -= box;
    }
    else if (event.key === " ") {          // TOUCHE DE TIR DE MISSILES
        toucheDirectionnelle = "SPACE";
        let missile = new Missiles(vaisseau.x + 20, 560);  // A L'APPUIE DE LA TOUCHE ON CREE UN NOUVEAU MISSILE
        missiles.push(missile);   // PUIS ON RAJOUTE LE NOUVEAU MISSILE A NOTRE TABLEAU MISSILES PRECEDEMMENT DEFINI GLOBALEMENT

        // let alienMissile = new Missiles(aliens[Math.floor(Math.random() * (18))].x, aliens[Math.floor(Math.random() * (18))].y);
        // missilesAliens.push(alienMissile);
    }
    console.log(event)
    console.log(missiles)
}



