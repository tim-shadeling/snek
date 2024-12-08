import Snake from "./snake.js";

function randpos(min, max) {
    return Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
}

export default class Scene {
    constructor(canvas_width, canvas_height) {
        this.canvas_width = canvas_width;
        this.canvas_height = canvas_height;
        this.addEventListener("foodconsumed", this.SpawnNewFoodItem)

        this.snake = Snake()
    }

    SpawnNewFoodItem() {
        this.foodX = randpos(0, gameWidth - unitSize);
        this.foodY = randpos(0, gameWidth - unitSize);
    }
}
