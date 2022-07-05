let button = "";
let tableGame = document.getElementById("table-game");
let keyBoardStartingButton = "11";
let activateKeyBoard = false;
let winner = "";
let gameOver = false;
const winningCombinations = [["11", "12", "13"], ["21", "22", "23"], ["31", "32", "33"], ["11", "21", "31"],
["12", "22", "32"], ["13", "23", "33"], ["11", "22", "33"], ["31", "22", "13"]];


document.addEventListener('keydown', (event) => {
    var code = event.code;
    moveKeyboar(code);
}, false);

for (let i = 1; i <= 3; i++) {
    button = button + '<div class="row' + i + ' row">';
    for (let j = 1; j <= 3; j++) {
        button = button + '<button id="' + i + '' + j + '" type="button" onclick="play(' + i + '' + j + ')"></button>';
    }

    button = button + '</div>'
}

tableGame.innerHTML = button;


function play(buttonId) {
    setButtonLetter(buttonId);
}

async function setButtonLetter(buttonId) {
    if (!gameOver) {
        let currentButtonX = document.getElementById(buttonId);
        if (currentButtonX.innerHTML === "") {
            currentButtonX.innerHTML = "X";

            let currentButtonO = getRandCell();

            if (!existEmptyCell()) {
                gameOver = true;
                document.getElementById("restart").style.display = "block";
            }
            win("X");

            if (!gameOver) {
                setTimeout(() => {
                    currentButtonO.innerHTML = "O";
                }, 500);
                win("O");
            }else{
                document.getElementById("restart").style.display = "block";
            }
        } else {
            alert("Elige otra casilla");
        }
    }else{
        document.getElementById("restart").style.display = "block";
    }
}

function moveKeyboar(code) {
    if (activateKeyBoard) {
        switch (code) {
            case "ArrowRight":
                moveRight();
                break;
            case "ArrowLeft":
                moveLeft();
                break;
            case "ArrowUp":
                moveUp();
                break;
            case "ArrowDown":
                moveDown();
                break;
            case "Enter":
                setButtonLetter(keyBoardStartingButton);
                break;
        }
        addFocus();
        removeFocus();
    } else {
        if (code === "ArrowRight" || code === "ArrowLeft" || code === "ArrowUp" || code === "ArrowDown") {
            activateKeyBoard = true;
        }
        addFocus();
        removeFocus();
    }
}

function moveRight() {
    let columnNumber = keyBoardStartingButton[1];
    console.log(columnNumber);
    if (columnNumber < 3) {
        keyBoardStartingButton = "" + (parseInt(keyBoardStartingButton) + 1);
    }
}

function moveLeft() {
    let columnNumber = keyBoardStartingButton[1];
    if (columnNumber > 1) {
        keyBoardStartingButton = "" + (parseInt(keyBoardStartingButton) - 1);
    }
}

function moveDown() {
    let rowNumber = keyBoardStartingButton[0];
    if (rowNumber < 3) {
        keyBoardStartingButton = "" + (parseInt(keyBoardStartingButton) + 10);
    }
}

function moveUp() {
    let rowNumber = keyBoardStartingButton[0];
    if (rowNumber > 1) {
        keyBoardStartingButton = "" + (parseInt(keyBoardStartingButton) - 10);
    }
}

function addFocus() {
    let button = document.getElementById(keyBoardStartingButton);

    button.classList.add("selectedButton");
}

function removeFocus() {
    let buttons = document.getElementsByTagName("button");

    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].id != keyBoardStartingButton) {
            buttons[i].classList.remove("selectedButton");
        }
    }
}

function getRandCell() {
    let buttons = Array.from(document.getElementsByTagName("button"));
    let emptyButton = buttons.filter((button) => (button.innerHTML === ""));
    let numRand = Math.floor(Math.random() * emptyButton.length);

    return emptyButton[numRand];
}

function existEmptyCell() {
    let buttons = Array.from(document.getElementsByTagName("button"));
    let emptyButton = buttons.filter((button) => (button.innerHTML === ""));

    return (emptyButton.length > 0);
}

function win(shape) {
    if (whoWin(shape)) {
        winner = shape;
        gameOver = true;
        alert(shape + " won the game");
    }
}

function whoWin(shape) {
    let buttons = Array.from(document.getElementsByTagName("button"));
    let winnerButtons = buttons.filter((button) => button.innerHTML === shape).map(btn => { return btn.id });;
    let combination = winningCombinations.filter((win) => {
        return contains(winnerButtons, win);
    })

    return (combination.length > 0);
}

function contains(buttonShape, combination) {
    return (buttonShape.includes(combination[0]) &&
        buttonShape.includes(combination[1]) &&
        buttonShape.includes(combination[2]));
}

function restart(){
    keyBoardStartingButton = "11";
    activateKeyBoard = false;
    winner = "";
    gameOver = false;
    let buttons = Array.from(document.getElementsByTagName("button"));
    for(let i = 0; i < buttons.length; i++){
        if(buttons[i].id !== "restart"){
            buttons[i].innerHTML = "";
        }else{
            buttons[i].style.display = 'none';
        }
    }
}