export default class Snake {
    constructor(scene) {
        this.velX = unitSize;
        this.velY = 0

        this.bodyparts = [
            {x:unitSize * 4, y:0},
            {x:unitSize * 3, y:0},
            {x:unitSize * 2, y:0},
            {x:unitSize, y:0},
            {x:0, y:0}
        ]; 

        this.addEventListener("keydown", Turn)
    }

    Move() {
        let head = {x: this.bodyparts[0].x + this.velX, y: this.bodyparts[0].y + this.velY};
        this.bodyparts.unshift(head);   
    }

    Turn(event){
        let keyPressed = event.keyCode;
        let LEFT = 37;
        let UP = 38;
        let RIGHT = 39;
        let DOWN = 40;

        let goingUp = (this.velY == -unitSize);
        let goingDown = (this.velY == unitSize);
        let goingRight = (this.velX == unitSize);
        let goingLeft = (this.velX == -unitSize);

        switch(true){
            case(keyPressed == LEFT && !goingRight):
                this.velX = -unitSize;
                this.velY = 0;
                break;
            case(keyPressed == UP && !goingDown):
                this.velX = 0;
                this.velY = -unitSize;
                break;
            case(keyPressed == RIGHT && !goingLeft):
                this.velX = unitSize;
                this.velY = 0;
                break;
            case(keyPressed == DOWN && !goingUp):
                this.velX = 0;
                this.velY = unitSize;
                break;
        }
    }

    CheckGameOver() {
        switch(true){
            case (this.bodyparts[0].x < 0):
                running = false;
                break;
            case (this.bodyparts[0].x >= gameWidth):
                running = false;
                break;
            case (this.bodyparts[0].y < 0):
                running = false;
                break;
            case (this.bodyparts[0].y >= gameHeight):
                    running = false;
                    break;
        }
        for(let i = 1; i < this.bodyparts.length; i+=1){
            if(this.bodyparts[i].x == this.bodyparts[0].x && this.bodyparts[i].y == this.bodyparts[0].y){
                running = false;
            }
        }
    }
}