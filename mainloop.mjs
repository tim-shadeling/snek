const canvas = document.querySelector("#mycanvas");
const ctx = canvas.getContext("2d");
const score_display = document.querySelector("#score_display");
const reset_button = document.querySelector("#reset_button");
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

function Update(){
    if (updating === false) {displayGameOver(); return;}
    clearBoard();
    TheScene.Update(ctx);
};

// ----------------------------------------------------------------------
function StartGame(){
    TheScene = new Scene(gameWidth, gameHeight);
    if (mainloop != null) clearInterval(mainloop);
    mainloop = setInterval(Update, 250);
    updating = true;
    score = 0;
    score_display.textContent = "Счет: "+score;
};
reset_button.addEventListener("click", StartGame);
StartGame();

function OnFoodConsumed() {
    score = score + 1;
    score_display.textContent = "Счет: "+score;
}
window.addEventListener("foodconsumed", OnFoodConsumed)

function OnGameOver() {
    updating = false;
    ctx.font = "50px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Игра окончена", gameWidth / 2, gameHeight / 2);
    clearInterval(mainloop);
    mainloop = null;
}
window.addEventListener("gameover", OnGameOver);
