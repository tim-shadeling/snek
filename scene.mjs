import Snake from "./snake.mjs";
import * as _C from "./constants.mjs";

function randpos(min, max) {
    return Math.round((Math.random() * (max - min) + min) / _C.unitSize) * _C.unitSize;
}

export default class Scene {
    constructor(canvas_width, canvas_height) {
        this.canvas_width = canvas_width;
        this.canvas_height = canvas_height;

        this.snake = new Snake(this)

        this.SpawnNewFoodItem()
    }

    SpawnNewFoodItem() {
        this.foodX = randpos(0, this.canvas_width - _C.unitSize);
        this.foodY = randpos(0, this.canvas_height - _C.unitSize);
    }

    CheckFoodConsumed(head) {
        if (head.x === this.foodX && head.y === this.foodY) {
            window.dispatchEvent(new Event("foodconsumed"));
            this.SpawnNewFoodItem()
            return true
        }
        return false
    }

    DrawFood(ctx) {
        ctx.fillStyle = _C.foodColor;
        ctx.fillRect(this.foodX, this.foodY, _C.unitSize, _C.unitSize);
    }

    Update(ctx) {
        this.DrawFood(ctx);
        this.snake.Update(ctx);
    }
}
