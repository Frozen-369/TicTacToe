const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let options = ["", "", "", "", "", "", "", "", ""];

currentPlayer = "X";
statusText.textContent = `${currentPlayer}'s turn`;
running = false;

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    running = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" && !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();

}

function updateCell(cell, index){
    cell.textContent = currentPlayer;
    options[index] = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const CellA = options[condition[0]];
        const CellB = options[condition[1]];
        const CellC = options[condition[2]];
        roundWon = false;

        if(CellA == "" || CellB == "" || CellC == ""){
            continue;
        }

        if(CellA == CellB && CellB == CellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer}'s Won!`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }

}
function restartGame(){

    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}