const canvas = document.querySelector("#gameBoard");
const ctx = canvas.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = canvas.width;
const gameHeight = canvas.height;

import Scene from "./scene.mjs";
let TheScene = Scene(gameWidth, gameHeight)
import * as _C from "./constants.mjs";

let mainloop = null
let running = false;

function Turn(e) {
    TheScene.snake.Turn(e)
}
window.addEventListener("keydown", Turn);
resetBtn.addEventListener("click", resetGame);

StartGame();

function StartGame(){
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
};

mainloop = setInterval(nextTick, 250)

function nextTick(){
    if (running === false) {displayGameOver(); return;}
    clearBoard();
    drawFood();
    moveSnake();
    drawSnake();
    checkGameOver();
};
function clearBoard(){
    ctx.fillStyle = _C.boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function createFood(){
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / _C.unitSize) * _C.unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - _C.unitSize);
    foodY = randomFood(0, gameWidth - _C.unitSize);
};
function drawFood(){
    ctx.fillStyle = _C.foodColor;
    ctx.fillRect(foodX, foodY, _C.unitSize, _C.unitSize);
};
function displayGameOver(){
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
    clearInterval(mainloop)
};
function resetGame(){
    score = 0;
    xVelocity = _C.unitSize;
    yVelocity = 0;
    snake = [
        {x:_C.unitSize * 4, y:0},
        {x:_C.unitSize * 3, y:0},
        {x:_C.unitSize * 2, y:0},
        {x:_C.unitSize, y:0},
        {x:0, y:0}
    ];
    StartGame();
};
