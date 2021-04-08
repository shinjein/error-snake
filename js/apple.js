class Apple {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;

    }
    draw() {
        const image = new Image();
        image.src = './images/apples/applelogo.png';
        context.drawImage(image, this.x, this.y, this.width, this.height);
    }

    clear() {
        context.clearRect(this.x, this.y, this.width, this.height);
    }
}

