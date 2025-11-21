
/*
 * Author: Juan José Gómez Villegas
 * Description: Project 2. connect four, code of javascript file
*/

/* CONSTANTS */

const listChips = [new Pair("red", new Chip("#ff6363", "#ff0000")), 
                   new Pair("yellow", new Chip("#ffff63", "#ffff00")), 
                   new Pair("blue", new Chip("#6363ff", "#0000ff")), 
                   new Pair("green", new Chip("#63ff63", "#00ff00")), 
                   new Pair("cyan", new Chip("#63ffff", "#00ffff"))];

/* GLOBAL VARIABLES */

let board;
let player1;
let player2;
let currentPlayer;
let maxTheme = 6;
let currentTheme;
let gameEnd = false;
let modeDisco = false;
// multimedia elements
let blip;
let blipError;
let blipDisco;

/* PRINCIPAL EVENTS */

window.onload = () => {
    document.title = "Connect Four";
    document.getElementById("faviconPage").href = "./images/img1.jpg";
    currentTheme = localStorage.getItem("currentTheme")? localStorage.getItem("currentTheme"): 1;
    document.getElementById("changeTheme").innerHTML = currentTheme;
    establishTheme();
    formInit();

    // multimedia elements
    blip = document.getElementById("audioBlip");
    blipError = document.getElementById("audioBlipBoomError");
    blipDisco = document.getElementById("audioBlipDisco");

    document.getElementById("btnPlay").addEventListener("click", gameInit);
    document.getElementById("changeTheme").addEventListener("click", changeTheme);
    document.getElementById("modeDisco").addEventListener("click", modeDiscoActivated);
    document.getElementById("btnStartGame").addEventListener("click", () => {location.reload()});
}

/* MAIN FUNCTIONS */

/*
* changeTheme: change theme of the web page
*/
function changeTheme(e) {
    blip.play();

    // update theme
    currentTheme = currentTheme == maxTheme? 1: parseInt(currentTheme) + 1;
    e.target.innerHTML = currentTheme;
    localStorage.removeItem("currentTheme");
    localStorage.setItem("currentTheme", currentTheme);
    establishTheme();
}

/*
* establishTheme: established current theme of the web page
*/
function establishTheme() {
    // establish new theme
    switch (parseInt(currentTheme)) {
        case 1:
            setCssVar("--colorPrimary", "#0D0A0A");
            setCssVar("--colorSecundary", "#141414");
            setCssVar("--textColor", getCssVar("--white"));
            break;
        case 2:
            setCssVar("--colorPrimary", "#00023D");
            setCssVar("--colorSecundary", "#00035F");
            setCssVar("--textColor", getCssVar("--white"));
            break;
        case 3:
            setCssVar("--colorPrimary", "#3F0000");
            setCssVar("--colorSecundary", "#650000");
            setCssVar("--textColor", getCssVar("--white"));
            break;
        case 4:
            setCssVar("--colorPrimary", "#38003E");
            setCssVar("--colorSecundary", "#54005D");
            setCssVar("--textColor", getCssVar("--white"));
            break;
        case 5:
            setCssVar("--colorPrimary", "#5B4500");
            setCssVar("--colorSecundary", "#826200");
            setCssVar("--textColor", getCssVar("--white"));
            break;
        case 6:
            setCssVar("--colorPrimary", "#085200");
            setCssVar("--colorSecundary", "#097100");
            setCssVar("--textColor", getCssVar("--white"));
            break;
    }
}

/*
* gameInit: before start a game
*/
function gameInit() {
    document.getElementById("btnStartGame").style.visibility = "hidden";

    let colp1 = document.getElementById("inColorPlayer1").value;
    let colp2 = document.getElementById("inColorPlayer2").value;
    let typp2 = document.getElementById("inTypePlayer2").value;
    let boardSize = document.getElementById("inNumRowsCols").value;
    let p1 = document.getElementById("inPlayer1").value;
    let p2 = typp2 == "1"? "Computer": document.getElementById("inPlayer2").value;

    if (p1 === "" || p2 === "" || boardSize === "") {
        blipError.play();   
        showAlert("error", "Error! Some field is empty.");
    } else if (p1 == p2) {
        blipError.play();
        showAlert("error", "Error! Names player 1 and 2 is equal.");
    } else if (colp1 == colp2) {
        blipError.play();
        showAlert("error", "Error! Colors player 1 and 2 is equal.");
    } else if (boardSize < 4 || boardSize >= 10) {
        blipError.play();
        showAlert("error", "Error! Board size must be between 4 and 9.");
    } else {
        blip.play();

        player1 = new Player(p1, listChips[colp1].second());
        player2 = p2 == "Computer"? new Player(p2, listChips[colp2].second(), true): new Player(p2, listChips[colp2].second());
        currentPlayer = 1;
        
        board = [];
        for (i = 0; i < boardSize; i++) {
            board[i] = new Array(boardSize);
            for (j = 0; j < boardSize; j++) {
                board[i][j] = 0;
            }
        }

        gameEnd = false;

        insertBoard(board, player1, player2, currentPlayer);
    }
}

/*
* formInit: build a initial form before the start a game
*/
function formInit() {
    document.getElementById("subtitle").innerText = "Player Information";
    let middleSection = document.getElementById("middle");

    let listChipsfst = [];
    listChips.map((val) => {
        listChipsfst.push(val.first());
    });

    middleSection.appendChild(getInput(true, "text", "inPlayer1", "inPlayer1", "Name player 1", "", "Name player 1"));

    middleSection.appendChild(getSelect(true, "inColorPlayer1", "inColorPlayer1", "", "Color player 1", listChipsfst));

    middleSection.appendChild(document.createElement("br"));

    middleSection.appendChild(getSelect(true, "inTypePlayer2", "inTypePlayer2", "", "Type Player 2", ["human","computer"]));

    middleSection.appendChild(getInput(true, "text", "inPlayer2", "inPlayer2", "Name player 2", "", "Name player 2"));
    
    middleSection.appendChild(getSelect(true, "inColorPlayer2", "inColorPlayer2", "", "Color player 2", listChipsfst));

    middleSection.appendChild(document.createElement("br"));

    middleSection.appendChild(getInput(true, "text", "inNumRowsCols", "inNumRowsCols", "Board size", "", "Board size", "7"));

    middleSection.appendChild(document.createElement("br"));

    middleSection.appendChild(getButton(true, "Play!", "btnPlay"));
}

/*
* move: make a move one of the two humans or robots players
*/
function move(col) {
    blip.play();

    moved(col);

    if (currentPlayer == 2 && player2.isRobot()) {
        moved(genRandomNumber(0,board.length-1));
    }
}

/*
* moved: make a moved one of the two players
*/
function moved(col) {
    let robotError = false;
    let changePlayer = false;
    let i = board.length-1;
    let fi = 0;
    while (i >= 0 && fi == 0) {
        if (board[i][col] == 0) {
            board[i][col] = currentPlayer;
            changePlayer = true;
            fi = 1;
        } else if (i == 0 && board[i][col] != 0) {
            if (!(currentPlayer == 2 && player2.isRobot())) {
                robotError = true;
            } else {
                blipError.play();
                showAlert("info", "Alert! Invalid movement.");
            }
            fi = 1;
        }
        i--;
    }

    if (!robotError) {
        let won = checkSolutionBoard();

        if (changePlayer) {
            currentPlayer = currentPlayer == 1? 2: 1;
        }

        if (won != 0) {
            gameEnd = true;
        }

        insertBoard(board, player1, player2, currentPlayer);

        if (won != 0) {
            if (won == -1) {
                showMsgCongratulations("Draw game!", "There was a draw in the game!", "info");
            } else {
                playerWon = won == 1? player1.meNameIs(): player2.meNameIs();
                showMsgCongratulations(`And the winner is ${playerWon}!`, `Congratulations ${playerWon}! You have won the game!`, "success");
                modeDiscoActivated();
            }
            document.getElementById("btnStartGame").style.visibility = "visible";
        }
    }
}

/* OTHER FUNCTIONS */

/*
* checkSolutionBoard: check a player won in the actually board
*/
function checkSolutionBoard() {
    let wonGame = 0;

    // iterate board by rows
    for (i = 0; i < board.length && wonGame == 0; i++) {
        for (j = 0; j < board[i].length && wonGame == 0; j++) {
            if ((board[i].length - j) >= 4) {
                if (board[i][j] == board[i][j+1] && board[i][j] == board[i][j+2] && board[i][j] == board[i][j+3]){
                    wonGame = board[i][j];
                }
            }
        }
    }

    if (wonGame == 0) {
        // iterate board by columns
        for (i = 0; i < board.length && wonGame == 0; i++) {
            for (j = 0; j < board[i].length && wonGame == 0; j++) {
                if ((board[i].length - j) >= 4) {
                    if (board[j][i] == board[j+1][i] && board[j][i] == board[j+2][i] && board[j][i] == board[j+3][i]){
                        wonGame = board[j][i];
                    }
                }
            }
        }

        if (wonGame == 0) {
            // iterate board by diagonals
            for (let i = 0; i < board.length && wonGame == 0; i++) {
                for (let j = 0; j < board[i].length && wonGame == 0; j++) {
                    // check diagonat from left to right
                    if (i <= board.length - 4 && j <= board.length - 4) {
                        if (board[i][j] == board[i+1][j+1] && board[i][j] == board[i+2][j+2] && board[i][j] == board[i+3][j+3]) {
                            wonGame = board[i][j];
                        }
                    }

                    // check diagonat from right to left
                    if (i >= 3 && j <= board[i].length - 4) {
                        if (board[i][j] == board[i-1][j+1] && board[i][j] == board[i-2][j+2] && board[i][j] == board[i-3][j+3]) {
                            wonGame = board[i][j];
                        }
                    }
                }
            }
        }
    }

    if (wonGame == 0 && isDrawGame()) {
        return -1;
    }

    return wonGame;
}

/*
* insertBoard: build and insert a board in a div
*/
function insertBoard(board, p1, p2, currentP) {
    document.getElementById("subtitle").innerText = `Score: ${ p1.meNameIs() } o - o ${ p2.meNameIs() }`;
    
    let middleSection = document.getElementById("middle");
    middleSection.innerHTML = "";
    middleSection.appendChild(buildBoard(board, p1, p2, currentP));
}

/*
* buildBoard: build a board of game
*/
function buildBoard(board, p1, p2, currentP) {
    let table = document.createElement("table");

    if (!gameEnd) { // if game not ending, build a header of table
        let prerow = document.createElement("tr");

        for (let i = 0; i < board.length; i++) {
            let cell = document.createElement("th");
            let btn = getButton(false, "V", "", "btnsBoard");
            btn.addEventListener("click", () => { move(i); });

            btn.style.backgroundColor = currentP == 1? p1.meChipsIs().getChip().style.backgroundColor: p2.meChipsIs().getChip().style.backgroundColor;
            btn.style.color = currentP == 1? p1.meChipsIs().getChip().style.color: p2.meChipsIs().getChip().style.color;
            btn.style.borderColor = currentP == 1? p1.meChipsIs().getChip().style.borderColor: p2.meChipsIs().getChip().style.borderColor;
            btn.style.borderSize = currentP == 1? p1.meChipsIs().getChip().style.borderSize: p2.meChipsIs().getChip().style.borderSize;
            btn.style.borderStyle = currentP == 1? p1.meChipsIs().getChip().style.borderStyle: p2.meChipsIs().getChip().style.borderStyle;

            cell.appendChild(btn);

            prerow.appendChild(cell);
        }

        table.appendChild(prerow);
    }

    // build a board
    for (let i = 0; i < board.length; i++) {
        let row = document.createElement("tr");

        for (let j = 0; j < board[i].length; j++) {
            let cell = document.createElement("td");

            let gameChips = new Chip(getCssVar("--colorPrimary"), getCssVar("--colorPrimary"), "0px");

            if (board[i][j] == 1) {
                gameChips.setChip(p1.meChipsIs());
            } else if (board[i][j] == 2) {
                gameChips.setChip(p2.meChipsIs());
            }

            cell.appendChild(gameChips.getChip());
            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    return table;
}

/*
* modeDiscoActivated: activation css animation that simulate a disco
*/
function modeDiscoActivated() {
    let body = document.body;

    if (!modeDisco) {
        blipDisco.play();
        setAnimation(body, "changeTheme", ".3s", "infinite");
        modeDisco = true;
        document.getElementById("modeDisco").innerHTML = "<i class=\"fa fa-pause\"></i>";
    } else {
        blipDisco.pause();
        setAnimation(body);
        modeDisco = false;
        document.getElementById("modeDisco").innerHTML = "<i class=\"fa fa-play\"></i>";
    }
}

/*
* isDrawGame: check the board and return true if none zeros
*/
function isDrawGame() {
    let countZeros = 0;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] == 0) {
                countZeros = countZeros + 1;
            }
        }
    }

    return (countZeros == 0);
}

/* FUNCTIONS IN COMPUTER PLAYER */
