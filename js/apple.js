class Apple {
    constructor() {
        this.width = 50;
        this.height = 50;
        this.row = 0;
        this.column = 0;

        this.image = new Image();
        this.image.src = './images/apples/applelogo.png';

    }
      setRandomPosition (snake) {
    this.row = Math.floor(Math.random() * 10);
    this.column = Math.floor(Math.random() * 10);

/*
    if (snake.checkCollisionWithFruit(fruit)) {
      this.setRandomPosition(snake);
    }
    */
  }
    draw() {
    context.drawImage(this.image, this.column * 50, this.row * 50, this.width, this.height)

    }

    clear() {
        context.clearRect(this.x, this.y, this.width, this.height);
    }
}