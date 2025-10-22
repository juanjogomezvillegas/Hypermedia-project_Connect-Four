
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

let player1;
let player2;
let board;

window.onload = function() {    
    board = [];
    for (i = 0; i < 7; i++) {
        board[i] = new Array(7);
        for (j = 0; j < 7; j++) {
            board[i][j] = 0;
        }
    }
    
    document.title = "Connect Four";

    document.getElementById("btnPlay").addEventListener("click", init);
}

function init() {
    let p1 = document.getElementById("inPlayer1").value;
    let p2 = document.getElementById("inPlayer2").value;

    if (p1 === "" || p2 === "") {
        alert("Error: Name player 1 or 2 is missing.");
    } else {
        player1 = new Player(p1, 1);
        player2 = new Player(p2, 2);

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

    let prerow = document.createElement("tr");
    
    for (i = 0; i < 7; i++) {
        let cell = document.createElement("th");

        let button = document.createElement("button");
        button.innerHTML = "V";
        button.setAttribute("class", "btnsBoard");
        button.setAttribute("onClick", `move(${i})`);
        cell.appendChild(button);

        prerow.appendChild(cell);        
    }

    table.appendChild(prerow);

    for (i = 0; i < 7; i++) {
        let row = document.createElement("tr");

        for (j = 0; j < 7; j++) {
            let cell = document.createElement("td");

            cell.innerHTML = board[i][j];

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
            board[i][col] = 1;
            fi = 1;
        }
        i--;
    }
    
    insertBoard();
}
