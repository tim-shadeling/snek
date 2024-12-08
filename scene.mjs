import Snake from "./snake.mjs";
import * as _C from "./constants.mjs";

function randpos(min, max) {
    return Math.round((Math.random() * (max - min) + min) / _C.unitSize) * _C.unitSize;
}

export default class Scene {
    constructor(canvas_width, canvas_height) {
        this.canvas_width = canvas_width;
        this.canvas_height = canvas_height;
        this.score = 1

        this.snake = Snake()

        SpawnNewFoodItem()
    }

    SpawnNewFoodItem() {
        this.foodX = randpos(0, gameWidth - _C.unitSize);
        this.foodY = randpos(0, gameWidth - _C.unitSize);
    }

    CheckFoodConsumed(head) {
        if (head.x === this.foodX && head.y === this.foodY) {
            this.score = this.score + 1
            window.dispatchEvent("foodconsumed")
            SpawnNewFoodItem()
            return true
        }
        return false
    }
}
