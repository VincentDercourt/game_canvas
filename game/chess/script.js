window.onload = function () {
  /**
   * Add function capitalize to object to Type String
   * This function transforms the first letter of the word into uppercase
   * @returns {string}
   */
  String.prototype.capitalize = function () {
    return this[0].toUpperCase() + this.slice(1);
  };

  /**
   * Settings for chess game
   */
  const SIZE_CANVAS = 900; // Size of canvas in width and height
  const SIZE_MARGE = 50; // size for space around

  const NUMBER_SQUARE = 8; // number box by line
  const SIZE_CASE = (SIZE_CANVAS - SIZE_MARGE*2) / NUMBER_SQUARE; // Size for one box
  const NUMBER_SQUARE_TOTAL = Math.pow(NUMBER_SQUARE,2); // Total number of boxes

  const BOARD_COLOR = '#f0cc9c';
  const BORDER_COLOR = '#604740';

  const WHITE_SQUARE = '#f0cc9c';
  const DARK_SQUARE = '#604740';
  const CASE_MOVE = 'rgba(117,160,255,0.41)';

  const TEXT_COLOR = '#604740';
  const TEXT_FONT = '30px Comic Sans MS';
  const ALPHA = "ABCDEFGH";

  const PATH_CHESS_PIECE = "chessPiece/"; // Path to image of chess piece

  // Get canvas in HTML
  const CANVAS = document.querySelector("#chess");
  // Initialize context of canvas
  const CTX = CANVAS.getContext("2d");

  // Change size of canvas in HTML
  CANVAS.width = SIZE_CANVAS;
  CANVAS.height = SIZE_CANVAS;

  /**
   * Initialise global variable
   * @var boxes {object} - list of boxes
   * @var pieces {array} - list of chess pieces
   * @var pieceToMove {array} - Chess pieces to move
   * @var lastPlayer {string} - ["white"|"black"] Last player to play
   *
   * For the boxes I chose to use the box names of type A1, A2, A ..., B1, B2, B ..., ....
   * This complicates processing and adds additional lines of code.
   * The simplest would be to use figures column 1 line 1, column 2, line 2.
   * But I prefer to keep the other method to better visualize the chess board.
   */
  let boxes = {}, pieces = [], pieceToMove = [], lastPlayer = "black";

  /**
   * Initialization of the chess game
   */
  drawBorder();

  // Initialization row number
  let row = 0, rowInverse = 8;

  // Repeat as many times as there are boxes
  // The double row allows to reverse the line numbering
  for(let i = 0; i<NUMBER_SQUARE_TOTAL; i++){
    /**
     * For default settings
     * 0 % 8 = 0
     * 1 % 8 = 1
     * 2 % 8 = 2
     * 3 % 8 = 3
     * 4 % 8 = 4
     * 5 % 8 = 5
     * 6 % 8 = 6
     * 7 % 8 = 7
     * 8 % 8 = 0
     * 9 % 8 = 1
     * .....
     */
    let col = i % NUMBER_SQUARE;
    let letter = ALPHA[col];
    // If letter is A Change row
    if (letter === "A") {
      row++;
      rowInverse--;
    }
    /**
     * for default settings
     * A = 0 * 100 + 50 = 50
     * B = 1 * 100 + 50 = 150
     * C = 2 * 100 + 50 = 250
     * D = 3 * 100 + 50 = 350
     * ............
     * H = 7 * 100 + 50 = 750
     */
    let x = col * SIZE_CASE + SIZE_MARGE;
    /**
     * for default settings
     * 8 = 7 * 100 + 50 = 750
     * ............
     * 3 = 2 * 100 + 50 = 250
     * 2 = 1 * 100 + 50 = 150
     * 1 = 0 * 100 + 50 = 50
     */
    let y = rowInverse * SIZE_CASE + SIZE_MARGE;
    /**
     * for default settings
     * A0 = (50 + 850) % 200 = 100
     * B0 = (150 + 850) % 200 = 0
     * C0 = (250 + 850) % 200 = 100
     * D0 = (350 + 850) % 200 = 0
     * ............
     * H0 = (850 + 850) % 200 = 100
     * A1 = (50 + 750) % 200 = 0
     * B1 = (150 + 750) % 200 = 100
     * ............
     * Allows to have alternately black and white boxes
     */
    let color = (x+y) % 200 ? WHITE_SQUARE : DARK_SQUARE;
    let number = row;
    // Add a box to the list of boxes
    boxes[letter+number] = {
      x: x,
      y: y,
      color: color,
      active: false
    };

    // Add a box to the list of boxes
    let color2 = number === 1 || number === 2 ? "white" : "black";

    let namePiece = "";

    // Define name of the chess piece for curent case
    // If line 8 or 1 - special
    if (number === 8 || number === 1) {
      // If A8 or A1 or H8 or A1 - Rook
      if (letter === "A" || letter === "H") {
        namePiece = "rook";
      }
      // Else if B8 or B1 or G8 or G1 - Knight
      else if (letter === "B" || letter === "G") {
        namePiece = "knight";
      }
      // Else if C8 or C1 or F8 or F1 - Bishop
      else if (letter === "C" || letter === "F") {
        namePiece = "bishop";
      }
      // Else if D8 or D1 - Queen
      else if (letter === "D") {
        namePiece = "queen";
      }
      // Else if E8 or E1 - King
      else if (letter === "E") {
        namePiece = "king";
      }
    }
    // Else if line 2 or 7 - pawn
    else if (number === 2 || number === 7){
      namePiece = "pawn";
    }

    if (namePiece) {
      pieces.push({
        name: namePiece,
        img: `${namePiece + color2.capitalize()}.png`,
        selected: `${namePiece + color2.capitalize()}Aura.png`,
        active: false,
        box: letter + number,
        color: color2,
        dead : false
      });
    }

    // Draw number and letter around chess board
    CTX.beginPath();
    CTX.font = TEXT_FONT;
    CTX.fillStyle = TEXT_COLOR;
    CTX.textAlign = "center";
    CTX.fillText(letter, x + SIZE_CASE / 2, 30);
    CTX.fillText(letter, x + SIZE_CASE / 2, SIZE_CANVAS-10);
    CTX.fillText(number, 20, y + SIZE_CASE / 2);
    CTX.fillText(number, SIZE_CANVAS-20, y + SIZE_CASE / 2);
  }
  drawCase();
  drawPiece();

  CANVAS.addEventListener("click", function (e) {
    let rect = CANVAS.getBoundingClientRect();
    actionWithCaseClicked({ x: Math.floor(e.clientX - rect.left), y: Math.floor(e.clientY - rect.top) });
    resetCanvas();
    drawCase();
    drawPiece();
  });

  function actionWithCaseClicked(mouse) {
    for(let caseSelected in boxes){
      let square = boxes[caseSelected];
      if (
        square.x <= mouse.x && (square.x + SIZE_CASE) > mouse.x &&
        square.y <= mouse.y && (square.y + SIZE_CASE) > mouse.y
      ){
        let pieceSelected = findPiece(caseSelected);
        if (square.active) {
          movePiece(pieceSelected, caseSelected);
        }
        resetCaseActive();
        if (pieceSelected && typeof pieceSelected === "object" && pieceSelected.hasOwnProperty("dead") && !pieceSelected.dead) {
          movePossible(pieceSelected);
        }
      }
    }
  }

  function movePiece(pieceSelected, caseSelected) {

    if (pieceSelected){
      if (pieceSelected.name==="queen"){
        alert(`Les ${pieceToMove.color} ont gagné !`);
        location.reload();
      }
      else {
        let index = pieces.indexOf(pieceSelected);
        pieces[index].box = "";
        pieces[index].dead = true;
        document.querySelector(`#${pieceSelected.color}Dead`).innerHTML += `<img src='${PATH_CHESS_PIECE + pieceSelected.img}' alt='${pieceSelected.name}'>`;
      }
    }
    let index = pieces.indexOf(pieceToMove);
    pieces[index].box = caseSelected;
    pieceToMove = false;
    lastPlayer = lastPlayer === "white" ? "black" : "white";
    movePossible(pieces[index]);
  }
  
  function movePossible(piece) {
    pieceToMove = false;
    if (lastPlayer !== piece.color) {
      let newNameCase, row, col, enemy;
      let nameCase = piece.box;
      let letter = nameCase[0];
      let letterNumber = ALPHA.indexOf(letter);
      let number = Number(nameCase[1]);

      pieces[pieces.indexOf(piece)].active = true;

      if (piece.name === "pawn") {
        col = letterNumber;
        // Décale d'une ligne vers le bas
        row = number - 1;
        // Si la pièce sélectionné est blanche
        if(piece.color === "white") {
          // Décale d'une ligne vers le haut
          row = number + 1;
        }
        // Si la prochaine ligne est entre la ligne 1 et 8
        if(row > 0 && row < 9) {
          newNameCase = ALPHA[col] + row;
          // Vérifie S'il y a un pion sur la prochaine case, si c'est le cas il est stocké
          enemy = findPiece(newNameCase);

          // S'il n'y a pas de piece sur le prochaine case
          if (!enemy) {
            // Marque la case pour indiquer que l'on peu s'y déplacer
            boxes[newNameCase].active = true;
          }
        }

        // Si la colonne est supérieur à A (0)
        if(letterNumber > 0) {
          // Décale d'une colonne vers la gauche
          col = letterNumber - 1;
          newNameCase = ALPHA[col] + row;
          // Vérifie S'il y a un pion sur la prochaine case, si c'est le cas il est stocké
          enemy = findPiece(newNameCase);

          // S'il y a une pièce et si c'elle-ci est de couleur différente
          if (enemy && enemy.color !== piece.color) {
            // Marque la case pour indiquer que l'on peu s'y déplacer
            boxes[newNameCase].active = true;
          }
        }


        // Si la colonne est inférieur à H (7)
        if(letterNumber < 7) {
          // Décale d'une colonne vers la droite
          col = letterNumber + 1;
          newNameCase = ALPHA[col] + row;
          // Vérifie S'il y a un pion sur la prochaine case, si c'est le cas il est stocké
          enemy = findPiece(newNameCase);

          // S'il y a une pièce et si c'elle-ci est de couleur différente
          if (enemy && enemy.color !== piece.color) {
            // Marque la case pour indiquer que l'on peu s'y déplacer
            boxes[newNameCase].active = true;
          }
        }

      }
      else if (piece.name === "rook"){
        // Déplacement vers le haut
        // Répète autant de fois qu'il y a de ligne vers le haut
        for(let i = number+1; i <= NUMBER_SQUARE; i++){
          newNameCase = letter + i;
          // Vérifie S'il y a un pion sur la prochaine case, si c'est le cas il est stocké
          enemy = findPiece(newNameCase);
          // S'il y a un pion et s'il est de même couleur alors la boucle s'arrête avant de marquer la case
          if (enemy && enemy.color === piece.color){
            break;
          }
          // Marque la case pour indiquer que l'on peu s'y déplacer
          boxes[newNameCase].active = true;
          // Si c'est cas contient un pion la boucle peu s'arrêter là
          if (enemy){
            break;
          }
        }

        // Déplacement vers le bas
        // Répète autant de fois qu'il y a de ligne vers le bas
        for(let i = number-1; i > 0; i--){
          newNameCase = letter + i;
          // Vérifie S'il y a un pion sur la prochaine case, si c'est le cas il est stocké
          enemy = findPiece(newNameCase);
          // S'il y a un pion et s'il est de même couleur alors la boucle s'arrête avant de marquer la case
          if (enemy && enemy.color === piece.color){
            break;
          }
          // Marque la case pour indiquer que l'on peu s'y déplacer
          boxes[newNameCase].active = true;
          // S'il y a un pion et s'il est de même couleur alors la boucle s'arrête avant de marquer la case
          if (enemy){
            break;
          }
        }

        // Déplacement vers la droite
        // Répète autant de fois qu'il y a de colonne vers la droite
        for(let i = letterNumber+1; i < ALPHA.length; i++){
          newNameCase = ALPHA[i] + number;
          // Vérifie S'il y a un pion sur la prochaine case, si c'est le cas il est stocké
          enemy= findPiece(newNameCase);
          // S'il y a un pion et s'il est de même couleur alors la boucle s'arrête avant de marquer la case
          if (enemy && enemy.color === piece.color){
            break;
          }
          // Marque la case pour indiquer que l'on peu s'y déplacer
          boxes[newNameCase].active = true;
          // S'il y a un pion et s'il est de même couleur alors la boucle s'arrête avant de marquer la case
          if (enemy) {
            break;
          }
        }

        // Déplacement vers la gauche
        // Répète autant de fois qu'il y a de colonne vers la gauche
        for(let i = letterNumber-1; i >=0; i--){
          newNameCase = ALPHA[i] + number;
          // Vérifie S'il y a un pion sur la prochaine case, si c'est le cas il est stocké
          enemy = findPiece(newNameCase);
          // S'il y a un pion et s'il est de même couleur alors la boucle s'arrête avant de marquer la case
          if (enemy && enemy.color === piece.color){
            break;
          }
          // Marque la case pour indiquer que l'on peu s'y déplacer
          boxes[newNameCase].active = true;
          // S'il y a un pion et s'il est de même couleur alors la boucle s'arrête avant de marquer la case
          if (enemy) {
            break;
          }
        }
      }
      else if (piece.name === "knight"){
        /**
         * 2 en haut et 1 à droite ou à gauche
         */
        if (number < 7) {
          // 2 Vers le haut
          row = number + 2;

          // 1 vers la droite
          if (letterNumber < 7) {
            col = letterNumber + 1;

            newNameCase = ALPHA[col] + row;
            // Vérifie S'il y a un pion sur la prochaine case, si c'est le cas il est stocké
            enemy = findPiece(newNameCase);
            // S'il n'y a pas de pion ou si la couleur du pion est différente du pion a déplacer
            if (!enemy || enemy.color !== piece.color) {
              // Marque la case pour indiquer que l'on peu s'y déplacer
              boxes[newNameCase].active = true;
            }
          }

          // 1 vers la gauche
          if (letterNumber > 0) {
            col = letterNumber - 1;

            newNameCase = ALPHA[col] + row;
            // Vérifie S'il y a un pion sur la prochaine case, si c'est le cas il est stocké
            enemy = findPiece(newNameCase);
            // S'il n'y a pas de pion ou si la couleur du pion est différente du pion a déplacer
            if (!enemy || enemy.color !== piece.color) {
              // Marque la case pour indiquer que l'on peu s'y déplacer
              boxes[newNameCase].active = true;
            }
          }
        }

        /**
         * 2 en bas et 1 à droite ou à gauche
         */
        if (number > 2) {
          // 2 Vers le bas
          row = number - 2;

          // 1 vers la droite
          if (letterNumber < 7) {
            col = letterNumber + 1;

            newNameCase = ALPHA[col] + row;
            // Vérifie S'il y a un pion sur la prochaine case, si c'est le cas il est stocké
            enemy = findPiece(newNameCase);
            // S'il n'y a pas de pion ou si la couleur du pion est différente du pion a déplacer
            if (!enemy || enemy.color !== piece.color) {
              // Marque la case pour indiquer que l'on peu s'y déplacer
              boxes[newNameCase].active = true;
            }
          }

          // 1 vers la gauche
          if (letterNumber > 0) {
            col = letterNumber - 1;

            newNameCase = ALPHA[col] + row;
            // Vérifie S'il y a un pion sur la prochaine case, si c'est le cas il est stocké
            enemy = findPiece(newNameCase);
            // S'il n'y a pas de pion ou si la couleur du pion est différente du pion a déplacer
            if (!enemy || enemy.color !== piece.color) {
              // Marque la case pour indiquer que l'on peu s'y déplacer
              boxes[newNameCase].active = true;
            }
          }
        }

        /**
         * 2 à droite et 1 en haut ou en bas
         */
        if (letterNumber < 6) {
          // 2 Vers la droite
          col = letterNumber + 2;

          // 1 vers le haut
          if (number < 8) {
            row = number + 1;

            newNameCase = ALPHA[col] + row;
            // Vérifie S'il y a un pion sur la prochaine case, si c'est le cas il est stocké
            enemy = findPiece(newNameCase);
            // S'il n'y a pas de pion ou si la couleur du pion est différente du pion a déplacer
            if (!enemy || enemy.color !== piece.color) {
              // Marque la case pour indiquer que l'on peu s'y déplacer
              boxes[newNameCase].active = true;
            }
          }

          // 1 vers le bas
          if (number > 1) {
            row = number - 1;

            newNameCase = ALPHA[col] + row;
            // Vérifie S'il y a un pion sur la prochaine case, si c'est le cas il est stocké
            enemy = findPiece(newNameCase);
            // S'il n'y a pas de pion ou si la couleur du pion est différente du pion a déplacer
            if (!enemy || enemy.color !== piece.color) {
              // Marque la case pour indiquer que l'on peu s'y déplacer
              boxes[newNameCase].active = true;
            }
          }
        }

        /**
         * 2 à gauche et 1 en haut ou en bas
         */
        if (letterNumber > 1) {
          // 2 Vers la gauche
          col = letterNumber - 2;

          // 1 vers le haut
          if (number < 8) {
            row = number + 1;

            newNameCase = ALPHA[col] + row;
            // Vérifie S'il y a un pion sur la prochaine case, si c'est le cas il est stocké
            enemy = findPiece(newNameCase);
            // S'il n'y a pas de pion ou si la couleur du pion est différente du pion a déplacer
            if (!enemy || enemy.color !== piece.color) {
              // Marque la case pour indiquer que l'on peu s'y déplacer
              boxes[newNameCase].active = true;
            }
          }

          // 1 vers le bas
          if (number > 1) {
            row = number - 1;

            newNameCase = ALPHA[col] + row;
            // Vérifie S'il y a un pion sur la prochaine case, si c'est le cas il est stocké
            enemy = findPiece(newNameCase);
            // S'il n'y a pas de pion ou si la couleur du pion est différente du pion a déplacer
            if (!enemy || enemy.color !== piece.color) {
              // Marque la case pour indiquer que l'on peu s'y déplacer
              boxes[newNameCase].active = true;
            }
          }
        }

      }
      else if (piece.name === "bishop"){
        let leftStop = false;
        let rightStop = false;

        // Vers le haut, la droite et la gauche
        for(let i=0; i<NUMBER_SQUARE; i++) {
          let add = 1 + i;

          row = number + add;

          // Vers la droite
          // S'il s'agit d'une ligne inférieur à 9 et une colonne inférieur à 8 et que l'on a pas encore trouvé d'ennemie
          col = letterNumber + add;
          if(row < 9 && col < 8 && !rightStop) {
            newNameCase = ALPHA[col] + row;
            enemy = findPiece(newNameCase);
            // Si sur la prochaine case il n'y a pas d'ennemie ou s'il y a un ennemie mais de couleur différente
            if(!enemy || (enemy && enemy.color !== piece.color)) {
              // Marque la case pour indiquer que l'on peu s'y déplacer
              boxes[newNameCase].active = true;
            }
            // S'il y a une pièce
            if(enemy){
              rightStop = true;
            }
          }

          // Vers la gauche
          // S'il s'agit d'une ligne inférieur à 9 et une colonne supérieur à -1 et que l'on a pas encore trouvé d'ennemie
          col = letterNumber - add;
          if(row < 9 && col > -1 && !leftStop) {
            newNameCase = ALPHA[col] + row;
            enemy = findPiece(newNameCase);
            // Si sur la prochaine case il n'y a pas d'ennemie ou s'il y a un ennemie mais de couleur différente
            if(!enemy || (enemy && enemy.color !== piece.color)) {
              // Marque la case pour indiquer que l'on peu s'y déplacer
              boxes[newNameCase].active = true;
            }
            // S'il y a une pièce
            if(enemy){
              leftStop = true;
            }
          }
        }

        leftStop = false;
        rightStop = false;
        // Vers le bas, la droite et la gauche
        for(let i=0; i<NUMBER_SQUARE; i++) {
          let add = 1 + i;

          row = number - add;

          // Vers la droite
          // S'il s'agit d'une ligne supérieur à 0 et une colonne inférieur à 8 et que l'on a pas encore trouvé d'ennemie
          col = letterNumber + add;
          if(row > 0 && col < 8 && !rightStop) {
            newNameCase = ALPHA[col] + row;
            enemy = findPiece(newNameCase);
            // Si sur la prochaine case il n'y a pas d'ennemie ou s'il y a un ennemie mais de couleur différente
            if(!enemy || (enemy && enemy.color !== piece.color)) {
              // Marque la case pour indiquer que l'on peu s'y déplacer
              boxes[newNameCase].active = true;
            }
            // S'il y a un ennemie mais de couleur différente
            if(enemy){
              rightStop = true;
            }
          }

          // Vers la gauche
          // S'il s'agit d'une ligne supérieur à 0 et une colonne supérieur à -1 et que l'on a pas encore trouvé d'ennemie
          col = letterNumber - add;
          if(row > 0 && col > -1 && !leftStop) {
            newNameCase = ALPHA[col] + row;
            enemy = findPiece(newNameCase);
            // Si sur la prochaine case il n'y a pas d'ennemie ou s'il y a un ennemie mais de couleur différente
            if(!enemy || (enemy && enemy.color !== piece.color)) {
              // Marque la case pour indiquer que l'on peu s'y déplacer
              boxes[newNameCase].active = true;
            }
            // S'il y a une pièce
            if(enemy){
              leftStop = true;
            }
          }
        }
      }
      else if (piece.name === "queen"){
        let leftStop = false;
        let rightStop = false;
        // Vers le haut, la droite et la gauche
        for(let i=0; i<NUMBER_SQUARE; i++) {
          let add = 1 + i;

          row = number + add;

          // Vers la droite
          // S'il s'agit d'une ligne inférieur à 9 et une colonne inférieur à 8 et que l'on a pas encore trouvé d'ennemie
          col = letterNumber + add;
          if(row < 9 && col < 8 && !rightStop) {
            newNameCase = ALPHA[col] + row;
            enemy = findPiece(newNameCase);
            // Si sur la prochaine case il n'y a pas d'ennemie ou s'il y a un ennemie mais de couleur différente
            if(!enemy || (enemy && enemy.color !== piece.color)) {
              // Marque la case pour indiquer que l'on peu s'y déplacer
              boxes[newNameCase].active = true;
            }
            // S'il y a une pièce
            if(enemy){
              rightStop = true;
            }
          }


          // Vers la gauche
          // S'il s'agit d'une ligne inférieur à 9 et une colonne supérieur à -1 et que l'on a pas encore trouvé d'ennemie
          col = letterNumber - add;
          if(row < 9 && col > -1 && !leftStop) {
            newNameCase = ALPHA[col] + row;
            enemy = findPiece(newNameCase);
            // Si sur la prochaine case il n'y a pas d'ennemie ou s'il y a un ennemie mais de couleur différente
            if(!enemy || (enemy && enemy.color !== piece.color)) {
              // Marque la case pour indiquer que l'on peu s'y déplacer
              boxes[newNameCase].active = true;
            }
            // S'il y a une pièce
            if(enemy){
              leftStop = true;
            }
          }
        }

        leftStop = false;
        rightStop = false;
        // Vers le bas, la droite et la gauche
        for(let i=0; i<NUMBER_SQUARE; i++) {
          let add = 1 + i;

          row = number - add;
          col = letterNumber + add;

          // Vers la droite
          // S'il s'agit d'une ligne supérieur à 0 et une colonne inférieur à 8 et que l'on a pas encore trouvé d'ennemie
          if(row > 0 && col < 8 && !rightStop) {
            newNameCase = ALPHA[col] + row;
            enemy = findPiece(newNameCase);
            // Si sur la prochaine case il n'y a pas d'ennemie ou s'il y a un ennemie mais de couleur différente
            if(!enemy || (enemy && enemy.color !== piece.color)) {
              // Marque la case pour indiquer que l'on peu s'y déplacer
              boxes[newNameCase].active = true;
            }
            // S'il y a une pièce
            if(enemy){
              rightStop = true;
            }
          }

          col = letterNumber - add;

          // Vers la gauche
          // S'il s'agit d'une ligne supérieur à 0 et une colonne supérieur à -1 et que l'on a pas encore trouvé d'ennemie
          if(row > 0 && col > -1 && !leftStop) {
            newNameCase = ALPHA[col] + row;
            enemy = findPiece(newNameCase);
            // Si sur la prochaine case il n'y a pas d'ennemie ou s'il y a un ennemie mais de couleur différente
            if(!enemy || (enemy && enemy.color !== piece.color)) {
              // Marque la case pour indiquer que l'on peu s'y déplacer
              boxes[newNameCase].active = true;
            }
            // S'il y a une pièce
            if(enemy){
              leftStop = true;
            }
          }
        }

        // Déplacement vers le haut
        // Répète autant de fois qu'il y a de ligne vers le haut
        for(let i = number+1; i <= NUMBER_SQUARE; i++){
          newNameCase = letter + i;
          // Vérifie S'il y a un pion sur la prochaine case, si c'est le cas il est stocké
          enemy = findPiece(newNameCase);
          // S'il y a un pion et s'il est de même couleur alors la boucle s'arrête avant de marquer la case
          if (enemy && enemy.color === piece.color){
            break;
          }
          // Marque la case pour indiquer que l'on peu s'y déplacer
          boxes[newNameCase].active = true;
          // Si c'est cas contient un pion la boucle peu s'arrêter là
          if (enemy){
            break;
          }
        }

        // Déplacement vers le bas
        // Répète autant de fois qu'il y a de ligne vers le bas
        for(let i = number-1; i > 0; i--){
          newNameCase = letter + i;
          // Vérifie S'il y a un pion sur la prochaine case, si c'est le cas il est stocké
          enemy = findPiece(newNameCase);
          // S'il y a un pion et s'il est de même couleur alors la boucle s'arrête avant de marquer la case
          if (enemy && enemy.color === piece.color){
            break;
          }
          // Marque la case pour indiquer que l'on peu s'y déplacer
          boxes[newNameCase].active = true;
          // S'il y a un pion et s'il est de même couleur alors la boucle s'arrête avant de marquer la case
          if (enemy){
            break;
          }
        }

        // Déplacement vers la droite
        // Répète autant de fois qu'il y a de colonne vers la droite
        for(let i = letterNumber+1; i < ALPHA.length; i++){
          newNameCase = ALPHA[i] + number;
          // Vérifie S'il y a un pion sur la prochaine case, si c'est le cas il est stocké
          enemy= findPiece(newNameCase);
          // S'il y a un pion et s'il est de même couleur alors la boucle s'arrête avant de marquer la case
          if (enemy && enemy.color === piece.color){
            break;
          }
          // Marque la case pour indiquer que l'on peu s'y déplacer
          boxes[newNameCase].active = true;
          // S'il y a un pion et s'il est de même couleur alors la boucle s'arrête avant de marquer la case
          if (enemy) {
            break;
          }
        }

        // Déplacement vers la gauche
        // Répète autant de fois qu'il y a de colonne vers la gauche
        for(let i = letterNumber-1; i >=0; i--){
          newNameCase = ALPHA[i] + number;
          // Vérifie S'il y a un pion sur la prochaine case, si c'est le cas il est stocké
          enemy = findPiece(newNameCase);
          // S'il y a un pion et s'il est de même couleur alors la boucle s'arrête avant de marquer la case
          if (enemy && enemy.color === piece.color){
            break;
          }
          // Marque la case pour indiquer que l'on peu s'y déplacer
          boxes[newNameCase].active = true;
          // S'il y a un pion et s'il est de même couleur alors la boucle s'arrête avant de marquer la case
          if (enemy) {
            break;
          }
        }
      }
      else if (piece.name === "king"){

        // Déplacement diagonale

        // Vers le haut, la droite et la gauche
        row = number + 1;

        // Vers la droite
        // S'il s'agit d'une ligne inférieur à 9 et une colonne inférieur à 8 et que l'on a pas encore trouvé d'ennemie
        col = letterNumber + 1;
        if(row < 9 && col < 8) {
          newNameCase = ALPHA[col] + row;
          enemy = findPiece(newNameCase);
          // Si sur la prochaine case il n'y a pas d'ennemie ou s'il y a un ennemie mais de couleur différente
          if(!enemy || (enemy && enemy.color !== piece.color)) {
            // Marque la case pour indiquer que l'on peu s'y déplacer
            boxes[newNameCase].active = true;
          }
        }

        // Vers la gauche
        // S'il s'agit d'une ligne inférieur à 9 et une colonne supérieur à -1 et que l'on a pas encore trouvé d'ennemie
        col = letterNumber - 1;
        if(row < 9 && col > -1 ) {
          newNameCase = ALPHA[col] + row;
          enemy = findPiece(newNameCase);
          // Si sur la prochaine case il n'y a pas d'ennemie ou s'il y a un ennemie mais de couleur différente
          if(!enemy || (enemy && enemy.color !== piece.color)) {
            // Marque la case pour indiquer que l'on peu s'y déplacer
            boxes[newNameCase].active = true;
          }
        }

        // Vers le bas, la droite et la gauche
        row = number - 1;

        // Vers la droite
        // S'il s'agit d'une ligne supérieur à 0 et une colonne inférieur à 8 et que l'on a pas encore trouvé d'ennemie
        col = letterNumber + 1;
        if(row > 0 && col < 8) {
          newNameCase = ALPHA[col] + row;
          enemy = findPiece(newNameCase);
          // Si sur la prochaine case il n'y a pas d'ennemie ou s'il y a un ennemie mais de couleur différente
          if(!enemy || (enemy && enemy.color !== piece.color)) {
            // Marque la case pour indiquer que l'on peu s'y déplacer
            boxes[newNameCase].active = true;
          }
        }

        // Vers la gauche
        // S'il s'agit d'une ligne supérieur à 0 et une colonne supérieur à -1 et que l'on a pas encore trouvé d'ennemie
        col = letterNumber - 1;
        if(row > 0 && col > -1) {
          newNameCase = ALPHA[col] + row;
          enemy = findPiece(newNameCase);
          // Si sur la prochaine case il n'y a pas d'ennemie ou s'il y a un ennemie mais de couleur différente
          if(!enemy || (enemy && enemy.color !== piece.color)) {
            // Marque la case pour indiquer que l'on peu s'y déplacer
            boxes[newNameCase].active = true;
          }
        }

        // Déplace droit

        // Déplacement vers le haut
        // Répète autant de fois qu'il y a de ligne vers le haut
        if(number < 8) {
          newNameCase = letter + (number + 1);
          // Vérifie S'il y a un pion sur la prochaine case, si c'est le cas il est stocké
          enemy = findPiece(newNameCase);
          // Si sur la prochaine case il n'y a pas d'ennemie ou s'il y a un ennemie mais de couleur différente
          if (!enemy || (enemy && enemy.color !== piece.color)) {
            // Marque la case pour indiquer que l'on peu s'y déplacer
            boxes[newNameCase].active = true;
          }
        }


        // Déplacement vers le bas
        // Répète autant de fois qu'il y a de ligne vers le bas
        if(number > 1) {
          newNameCase = letter + (number - 1);
          // Vérifie S'il y a un pion sur la prochaine case, si c'est le cas il est stocké
          enemy = findPiece(newNameCase);
          // Si sur la prochaine case il n'y a pas d'ennemie ou s'il y a un ennemie mais de couleur différente
          if (!enemy || (enemy && enemy.color !== piece.color)) {
            // Marque la case pour indiquer que l'on peu s'y déplacer
            boxes[newNameCase].active = true;
          }
        }

        // Déplacement vers la droite
        // Répète autant de fois qu'il y a de colonne vers la droite
        if(letterNumber < 7) {
          newNameCase = ALPHA[letterNumber + 1] + number;
          // Vérifie S'il y a un pion sur la prochaine case, si c'est le cas il est stocké
          enemy = findPiece(newNameCase);
          // Si sur la prochaine case il n'y a pas d'ennemie ou s'il y a un ennemie mais de couleur différente
          if (!enemy || (enemy && enemy.color !== piece.color)) {
            // Marque la case pour indiquer que l'on peu s'y déplacer
            boxes[newNameCase].active = true;
          }
        }

        // Déplacement vers la gauche
        // Répète autant de fois qu'il y a de colonne vers la gauche
        if(letterNumber > 0) {
          newNameCase = ALPHA[letterNumber-1] + number;
          // Vérifie S'il y a un pion sur la prochaine case, si c'est le cas il est stocké
          enemy = findPiece(newNameCase);
          // Si sur la prochaine case il n'y a pas d'ennemie ou s'il y a un ennemie mais de couleur différente
          if(!enemy || (enemy && enemy.color !== piece.color)) {
            // Marque la case pour indiquer que l'on peu s'y déplacer
            boxes[newNameCase].active = true;
          }
        }

      }

      pieceToMove = piece;

    }
  }

  function findPiece(nameCase) {
    let pieceSelected=false;
    for (let indice in pieces){
      let piece = pieces[indice];
      if (piece.box === nameCase && !piece.dead){
        pieceSelected = piece;
      }
    }
    return pieceSelected;
  }

  function drawBorder() {
    CTX.beginPath();
    CTX.rect(0,0, SIZE_CANVAS, SIZE_CANVAS);
    CTX.fillStyle = BOARD_COLOR;
    CTX.fill();
    CTX.beginPath();
    CTX.strokeStyle = BORDER_COLOR;
    CTX.strokeRect(SIZE_MARGE,SIZE_MARGE, SIZE_CANVAS-SIZE_MARGE*2, SIZE_CANVAS-SIZE_MARGE*2);
    CTX.strokeRect(SIZE_MARGE-10,SIZE_MARGE-10, SIZE_CANVAS-SIZE_MARGE*2+20, SIZE_CANVAS-SIZE_MARGE*2+20);
  }

  function resetCanvas() {
    CTX.beginPath();
    CTX.rect(SIZE_MARGE,SIZE_MARGE,SIZE_CANVAS-SIZE_MARGE*2,SIZE_CANVAS-SIZE_MARGE*2);
    CTX.fill();
  }
  function drawCase() {
    for(let boxSelected in boxes) {
      let square = boxes[boxSelected];
      drawCaseCanvas(square.x,square.y,square.color);
      if (square.active){
        drawCaseCanvas(square.x,square.y,CASE_MOVE);
      }
    }
  }

  function resetCaseActive() {
    for(let caseSelected in boxes) {
      boxes[caseSelected].active = false;
    }
    for(let index in pieces) {
      pieces[index].active = false;
    }
  }

  function drawCaseCanvas(x,y,color) {
    CTX.beginPath();
    CTX.rect(x,y, SIZE_CASE, SIZE_CASE);
    CTX.fillStyle = color;
    CTX.fill();
  }

  function drawPiece() {
    for(let piece of pieces){
      if (!piece.dead) {
        let square = boxes[piece.box];
        drawPieceCanvas(
          PATH_CHESS_PIECE + piece[piece.active ? "selected" : "img"],
          square.x,
          square.y,
          piece.imgWidth,
          piece.imgHeight,
        );
      }
    }
  }

  function drawPieceCanvas(linkImg,x,y) {
    let img = new Image(40,70);
    img.src = linkImg;

    img.onload = ()=>{
      CTX.beginPath();
      CTX.drawImage(img, x + ((SIZE_CASE - img.width) / 2), y + ((SIZE_CASE - img.height) / 2));
    };
  }

};