import Snake from "./snake.mjs";
import * as _C from "./constants.mjs";

function randpos(min, max) {
    return Math.round((Math.random() * (max - min) + min) / _C.unitSize) * _C.unitSize;
}

export default class Scene {
    constructor(canvas_width, canvas_height) {
        this.canvas_width = canvas_width;
        this.canvas_height = canvas_height;
        this.score = 0

        this.snake = new Snake()

        this.SpawnNewFoodItem()
    }

    SpawnNewFoodItem() {
        this.foodX = randpos(0, this.canvas_width - _C.unitSize);
        this.foodY = randpos(0, this.canvas_height - _C.unitSize);
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
