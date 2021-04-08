class Snake {
    constructor(x, y) {
        this.x = 350;
        this.y = 225;
        this.direction = '';
        this.tail = [];
        this.width = 50;
        this.height = 50;

    }
    draw() {
        const image = new Image();
        image.src = 'images/png-transparent-windows-95-windows-98-computer-icons-microsoft-text-rectangle-logo.png';
        //context.fillStyle = "orange";
        context.drawImage(image, this.x, this.y, this.width, this.height); 
            
     }
    growTail() {
        const anotherImage = new Image();
        anotherImage.src = 'images/Error.png';
        //context.fillStyle = "orange";
        context.drawImage(anotherImage, this.x - 5, this.y - 5, this.width, this.height); 
            
     }
    checkDirection(score) {
     //   this.growTail(score);
        if (this.direction === 'down') {
         this.y += 5;
         this.tail.forEach((coor) => {
            coor.y += 5
         })
        } else if(this.direction === 'up') {
         this.y -= 5;
          this.tail.forEach((coor) => {
            coor.y -= 5
         })
        } else if(this.direction === 'right'){
         this.x += 5;
          this.tail.forEach((coor) => {
            coor.x += 5
         })
        } else if(this.direction === 'left'){
            this.x -= 5;
        this.tail.forEach((coor) => {
            coor.x -= 5
         })
        }
        this.drawTail()
    }
    drawTail() {
        const image = new Image();
        image.src = 'images/Error.png';
        this.tail.forEach((coor) => {
         
                context.drawImage(image, coor.x, coor.y, this.width, this.height); 
               // context.clearRect(coor.x, coor.y, this.width, this.height);
      
        });  

    }
    
}


// class SnakePiece extends Snake {
//     constructor(x, y) {
//         super(x, y);
//     }
//     collision(){
//         if(this.x === Snake.x && this.y === Snake.y) {

//         }
//     }
// }

// function itsGameOver() {
//     let gameOver = false;

//     if(speedY === 0 && speedX === 0) {
//         return false;
//     } 
    
//     if (headX < 1) {
//         gameOver = true;
//     } else if(headX === tileCount){
//         gameOver = true;
//     } else if(headY < 0) {
//         gameOver = true;
//     } else if(headY === tileCount){
//         gameOver = true;
//     }

//     for (let i=0; i< snakeBody.length; i++){
//         let part = snakeBody[i];
//         if(part.x === headX && part.y === headY) {
//             gameOver = true;
//             break;  
//         }
//     }

//     if (gameOver) {
//         context.fillStyle = 'black';
//         context.font = '35px Helvetica';
//         context.fillText("Game Over!", canvas.width/6, canvas.height / 2);
//     } else return gameOver;

// }