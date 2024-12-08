import * as _C from "./constants.mjs";

export default class Snake {
    constructor(scene) {
        this.velX = _C.unitSize;
        this.velY = 0

        this.bodyparts = [
            {x:_C.unitSize * 4, y:0},
            {x:_C.unitSize * 3, y:0},
            {x:_C.unitSize * 2, y:0},
            {x:_C.unitSize, y:0},
            {x:0, y:0}
        ]; 

        this.scene = scene
    }

    Move() {
        let head = {x: this.bodyparts[0].x + this.velX, y: this.bodyparts[0].y + this.velY};
        this.bodyparts.unshift(head);  
        if (!this.scene.CheckFoodConsumed(head)) {
            this.bodyparts.pop()
        }
    }

    Turn(event){
        let keyPressed = event.keyCode;
        let LEFT = 37;
        let UP = 38;
        let RIGHT = 39;
        let DOWN = 40;

        let goingUp = (this.velY == -_C.unitSize);
        let goingDown = (this.velY == _C.unitSize);
        let goingRight = (this.velX == _C.unitSize);
        let goingLeft = (this.velX == -_C.unitSize);

        switch(true){
            case(keyPressed == LEFT && !goingRight):
                this.velX = -_C.unitSize;
                this.velY = 0;
                break;
            case(keyPressed == UP && !goingDown):
                this.velX = 0;
                this.velY = -_C.unitSize;
                break;
            case(keyPressed == RIGHT && !goingLeft):
                this.velX = _C.unitSize;
                this.velY = 0;
                break;
            case(keyPressed == DOWN && !goingUp):
                this.velX = 0;
                this.velY = _C.unitSize;
                break;
        }
    }

    CheckGameOver() {
        let gameover = false
        switch(true){
            case (this.bodyparts[0].x < 0):
                gameover = true;
                break;
            case (this.bodyparts[0].x >= gameWidth):
                gameover = true;
                break;
            case (this.bodyparts[0].y < 0):
                gameover = true;
                break;
            case (this.bodyparts[0].y >= gameHeight):
                    gameover = true;
                    break;
        }
        for(let i = 1; i < this.bodyparts.length; i+=1){
            if(this.bodyparts[i].x == this.bodyparts[0].x && this.bodyparts[i].y == this.bodyparts[0].y){
                gameover = true;
            }
        }

        if (gameover) window.dispatchEvent("gameover");
    }
}