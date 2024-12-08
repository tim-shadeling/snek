const canvas = document.querySelector("#gameBoard");
const ctx = canvas.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = canvas.width;
const gameHeight = canvas.height;

let TheScene = null
import Scene from "./scene.mjs";
import * as _C from "./constants.mjs";

let mainloop = null;
let updating = null;
let score = 0

function Turn(e) {
    TheScene.snake.Turn(e)
}
window.addEventListener("keydown", Turn);

function clearBoard(){
    ctx.fillStyle = _C.boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};

function DrawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Счет: "+score, x/2-90, 35);
}

function Update(){
    if (updating === false) {displayGameOver(); return;}
    clearBoard();
    TheScene.Update(ctx);
};

function StartGame(){
    TheScene = new Scene(gameWidth, gameHeight);
    if (mainloop != null) clearInterval(mainloop);
    mainloop = setInterval(Update, 250);
    updating = true;
    score = 0;
    scoreText.textContent = score;
};
resetBtn.addEventListener("click", StartGame);
StartGame();

function OnFoodConsumed() {
    print("food consumed!")
    score = score + 1
}
window.addEventListener("foodconsumed", OnFoodConsumed)

function OnGameOver() {
    updating = false;
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
    clearInterval(mainloop);
    mainloop = null;
}
window.addEventListener("gameover", OnGameOver);
