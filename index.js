
/*
 * Author: Juan José Gómez Villegas
 * Description: Project 2. connect four, code of javascript file
*/

/* GLOBAL VARIABLES */

let board;
let player1;
let player2;
let currentPlayer;
let gameEnd = false;
let modeDisco = false;

/* PRINCIPAL EVENTS */

window.onload = () => {
    formInit();
    document.title = "Connect Four";
    document.getElementById("faviconPage").href = "./images/img1.jpg";

    document.getElementById("btnPlay").addEventListener("click", gameInit);
    document.getElementById("modeDisco").addEventListener("click", modeDiscoActivated);
}

/* MAIN FUNCTIONS */

/*
* gameInit: before start a game
*/
function gameInit() {
    let p1 = document.getElementById("inPlayer1").value;
    let p2 = document.getElementById("inPlayer2").value;
    let colp1 = document.getElementById("inColorPlayer1").value;
    let colp2 = document.getElementById("inColorPlayer2").value;
    let boardSize = document.getElementById("inNumRowsCols").value;

    if (p1 === "" || p2 === "" || boardSize === "") {
        showAlert("error", "Error! Some field is empty.");
    } else if (p1 == p2) {
        showAlert("error", "Error! Names player 1 and 2 is equal.");
    } else if (colp1 == colp2) {
        showAlert("error", "Error! Colors player 1 and 2 is equal.");
    } else if (boardSize < 4 || boardSize >= 10) {
        showAlert("error", "Error! Board size must be between 4 and 9.");
    } else {
        player1 = new Player(p1, colp1);
        player2 = new Player(p2, colp2);
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

    middleSection.appendChild(getInput("text", "inPlayer1", "player1", "Name player 1"));
    middleSection.appendChild(getInput("color", "inColorPlayer1", "colorPlayer1", "Color player 1", "#ff0000"));

    middleSection.appendChild(document.createElement("br"));

    middleSection.appendChild(getInput("text", "inPlayer2", "player2", "Name player 2"));
    middleSection.appendChild(getInput("color", "inColorPlayer2", "colorPlayer2", "Color player 2", "#ffff00"));

    middleSection.appendChild(document.createElement("br"));

    middleSection.appendChild(getInput("text", "inNumRowsCols", "numRowsCols", "Board size", "7"));

    middleSection.appendChild(document.createElement("br"));

    middleSection.appendChild(getButton(true, "Play!", "btnPlay", "btnPlay"));
}

/*
* move: make a move one of the two players
*/
function move(col) {
    let i = board.length-1;
    let fi = 0;
    while (i >= 0 && fi == 0) {
        if (board[i][col] == 0) {
            board[i][col] = currentPlayer;
            fi = 1;
        } else if (i == 0 && board[i][col] != 0) {
            showAlert("info", "Alert! Invalid movement.");
            fi = 1;
        }
        i--;
    }

    let won = checkSolutionBoard();

    currentPlayer = currentPlayer == 1? 2: 1;

    if (won != 0) {
        gameEnd = true;
    }

    insertBoard(board, player1, player2, currentPlayer);

    if (won != 0) {
        playerWon = won == 1? player1.meNameIs(): player2.meNameIs();
        showMsgCongratulations(`And the winner is ${playerWon}!`, `Congratulations ${playerWon}! You have won the game!`, "success");
        modeDiscoActivated();
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
        }
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

        for (i = 0; i < board.length; i++) {
            let cell = document.createElement("th");
            let btn = getButton(false, "V", "", "btnsBoard", `move(${i})`);

            btn.style.backgroundColor = currentP == 1? p1.meColorIs(): p2.meColorIs();
            btn.style.borderColor = currentP == 1? p1.meColorIs(): p2.meColorIs();

            cell.appendChild(btn);

            prerow.appendChild(cell);
        }

        table.appendChild(prerow);
    }

    // build a board
    for (i = 0; i < board.length; i++) {
        let row = document.createElement("tr");

        for (j = 0; j < board[i].length; j++) {
            let cell = document.createElement("td");

            let gameChips = document.createElement("span");
            gameChips.setAttribute("class", "gameChips");
            gameChips.innerText = "VV";

            if (board[i][j] == 1) {
                gameChips.style.backgroundColor = p1.meColorIs();
                gameChips.style.borderColor = p1.meColorIs();
                gameChips.style.color = p1.meColorIs();
            } else if (board[i][j] == 2) {
                gameChips.style.backgroundColor = p2.meColorIs();
                gameChips.style.borderColor = p2.meColorIs();
                gameChips.style.color = p2.meColorIs();
            } else if (board[i][j] == 0) {
                gameChips.style.backgroundColor = "white";
                gameChips.style.borderColor = "white";
                gameChips.style.color = "white";
            }

            cell.appendChild(gameChips);
            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    return table;
}

/*
* getInput: build and return label and input in div
*/
function getInput(type, id, name, textLabel, value = "") {
    let div = document.createElement("div");

    let label = document.createElement("label");
    label.setAttribute("for", id);
    label.innerText = textLabel;

    let input = document.createElement("input");
    input.setAttribute("type", type);
    input.setAttribute("id", id);
    input.setAttribute("name", name);
    input.setAttribute("value", value);

    div.appendChild(label);
    div.appendChild(input);

    return div;
}

/*
* getButton: build and return button in div
*/
function getButton(innnerDiv, textBtn, id = "", className = "", onClick = "") {
    let div = document.createElement("div");

    let button = document.createElement("button");
    button.setAttribute("id", id);
    button.setAttribute("class", className);
    button.setAttribute("onClick", onClick);
    button.innerText = textBtn;

    if (innnerDiv) {
        div.appendChild(button);

        return div;
    } else {
        return button;
    }
}

/*
* modeDiscoActivated: activation css animation that simulate a disco
*/
function modeDiscoActivated() {
    let body = document.body;

    if (!modeDisco) {
        setAnimation(body, "changeTheme", ".3s", "infinite");
        modeDisco = true;
        document.getElementById("modeDisco").innerHTML = "<i class=\"fa fa-pause\"></i>";
    } else {
        setAnimation(body);
        modeDisco = false;
        document.getElementById("modeDisco").innerHTML = "<i class=\"fa fa-play\"></i>";
    }
}

/*
* setAnimation: set animation with name, duration and iteration count on the elem
*/
function setAnimation(elem, animationName = "", animationDuration = "", animationIterCount = "") {
    elem.style.animationName = animationName;
    elem.style.animationDuration = animationDuration;
    elem.style.animationIterationCount = animationIterCount;
}
