
// objects
class Player {
    // attributes
    #name;
    #color;
    // constructor
    constructor(name, color) {
        this.#name = name;
        this.#color = color;
    }
    //methods
    meNameIs() {
        return this.#name;
    }
    meColorIs() {
        return this.#color;
    }
}

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

let player1;
let player2;
let board;
let currentPlayer;
let gameEnd = false;
let modeDisco = false;

window.onload = function() {
    currentPlayer = 1;
    board = [];
    for (i = 0; i < 7; i++) {
        board[i] = new Array(7);
        for (j = 0; j < 7; j++) {
            board[i][j] = 0;
        }
    }
    
    document.title = "Connect Four";

    document.getElementById("btnPlay").addEventListener("click", init);
    document.getElementById("modeDisco").addEventListener("click", modeDiscoActivated);
}

function init() {
    let p1 = document.getElementById("inPlayer1").value;
    let p2 = document.getElementById("inPlayer2").value;
    let colp1 = document.getElementById("inColorPlayer1").value;
    let colp2 = document.getElementById("inColorPlayer2").value;

    if (p1 === "" || p2 === "") {
        Toast.fire({
            icon: 'error',
            title: "Error! Name player 1 or 2 is missing."
        });
    } else {
        player1 = new Player(p1, colp1);
        player2 = new Player(p2, colp2);
        gameEnd = false;

        document.getElementById("subtitle").innerHTML = "Score: "+player1.meNameIs() + " o - o " + player2.meNameIs();

        insertBoard();
    }
}

function insertBoard() {
    let middle = document.getElementById("middle");
    
    middle.innerHTML = "";
    middle.appendChild(buildBoard(board));
}

function buildBoard(board) {
    let table = document.createElement("table");

    if (!gameEnd) {
        let prerow = document.createElement("tr");
        
        for (i = 0; i < 7; i++) {
            let cell = document.createElement("th");

            let button = document.createElement("button");
            button.innerHTML = "V";
            if (currentPlayer == 1) {
                button.style.backgroundColor = player1.meColorIs();
            } else {
                button.style.backgroundColor = player2.meColorIs();
            }
            button.setAttribute("class", "btnsBoard");
            button.setAttribute("onClick", `move(${i})`);
            cell.appendChild(button);

            prerow.appendChild(cell);
        }

        table.appendChild(prerow);
    }

    for (i = 0; i < 7; i++) {
        let row = document.createElement("tr");

        for (j = 0; j < 7; j++) {
            let cell = document.createElement("td");

            let gameChips = document.createElement("span");
            gameChips.setAttribute("class", "gameChips");

            if (board[i][j] == 1) {
                gameChips.style.backgroundColor = player1.meColorIs();
                cell.appendChild(gameChips);
            } else if (board[i][j] == 2) {
                gameChips.style.backgroundColor = player2.meColorIs();
                cell.appendChild(gameChips);
            } else if (board[i][j] == 0) {
                gameChips.style.backgroundColor = "white";
                cell.appendChild(gameChips);
            }

            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    return table;
}

function move(col) {
    let i = board.length-1;
    let fi = 0;
    while (i >= 0 && fi == 0) {
        if (board[i][col] == 0) {
            board[i][col] = currentPlayer;
            fi = 1;
        } else if (i == 0 && board[i][col] != 0) {
            Toast.fire({
                icon: 'info',
                title: "Alert! Invalid movement."
            });
            fi = 1;
        }
        i--;
    }

    if (currentPlayer == 1) {
        currentPlayer = 2;
    } else {
        currentPlayer = 1;
    }

    let won = checkSolutionBoard();
    
    insertBoard();

    if (won != 0) {
        showMsgCongratulations(won == 1? player1.meNameIs(): player2.meNameIs());
        modeDiscoActivated();
    }
}

function checkSolutionBoard() {
    wonGame = 0;

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

    if (wonGame != 0) {
        gameEnd = true;
    }

    return wonGame;
}

function modeDiscoActivated() {
    let body = document.body;

    if (!modeDisco) {
        setAnimation(body, "changeTheme", "0.03s", "infinite");
        modeDisco = true;
        document.getElementById("modeDisco").innerHTML = "<i class=\"fa fa-pause\"></i>";
    } else {
        setAnimation(body);
        modeDisco = false;
        document.getElementById("modeDisco").innerHTML = "<i class=\"fa fa-play\"></i>";
    }
}

/*
* set animation with name, duration and iteration count on the elem
*/
function setAnimation(elem, animationName = "", animationDuration = "", animationIterCount = "") {
    elem.style.animationName = animationName;
    elem.style.animationDuration = animationDuration;
    elem.style.animationIterationCount = animationIterCount;
}

function showMsgCongratulations(playerName) {
    Swal.fire({
        title: "And the winner is "+playerName+"!",
        text: "Congratulations "+playerName+"! You have won the game! ",
        icon: 'success',
        draggable: true
    });
}
