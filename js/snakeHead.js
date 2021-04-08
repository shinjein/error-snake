class Snake {
    constructor(x, y) {
        this.x = 350;
        this.y = 225;
        this.direction = '';
        this.tail = [
            [0, 0],
            [1, 0],
            [2, 0]
        ];
        this.width = 50;
        this.height = 50;
    }
       /*
    draw() {
        const image = new Image();
        image.src = 'images/Error.png';
        //context.fillStyle = "orange";
        context.drawImage(image, this.x, this.y, this.width, this.height); 
            
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
    } */
    changeDirection (direction) {
        const newCell = this.calculateNextCell(direction);
    
    // const intersection = this.checkIntersection(newCell);

        const isNotAllowed = (
        direction === 'left' && this.direction === 'right' ||
        direction === 'right' && this.direction === 'left' ||
        direction === 'up' && this.direction === 'down' ||
        direction === 'down' && this.direction === 'up'
        );

        if(!isNotAllowed) {
        this.direction = direction;
            }
    }

    calculateNextCell(direction) {
        const head = this.tail[this.tail.length-1]

        const newCell = [...head];
        switch(direction) {
            case "right":
                newCell[0]++;
                break;
            case "left":
                newCell[0]--;
                break;
            case "down":
                newCell[1]++;
                break;
            case "up":
                newCell[1]--;
                break;
        }

        newCell[0] = (newCell[0] + 15) % 15;
        newCell[1] = (newCell[1] + 10) % 10;

        return newCell;

    }

    checkIntersection (item) {
        return this.tail.find(cell => cell[0] === item[0] && cell[1] === item[1]);
    }

    checkCollisionWithFruit (fruit) {
        const column = fruit.column;
        const row = fruit.row;
        const intersection = this.checkIntersection([ column, row ])
        
        return intersection;

     }

    checkCollisionWithWalls() {
        const cell_width = 50;

       for (let cell of this.tail) {
           const column = cell[0]
           const row = cell[1]

           const x = column * cell_width;
           const y = row * cell_width;
        
        if (x < 0) {
            endGame();
        } else if (x > canvas.width) {
            endGame();
        } else if (y < 0){
            endGame();
        } else if (y > canvas.height) {
            endGame();
        }
       
       }
/*
          if (x < 0) {
        gameOver();
    } else if (x > canvas.width - 50) {
         gameOver();
    } else if (y < 0){
         gameOver();
    } else if (y > canvas.height - 50) {
        gameOver();
    }
    */
  }

  checkCollisionWithSelf () {
    const head = this.tail[this.tail.length - 1];
    const newTail = this.tail.slice(0, this.tail.length - 1);

    return newTail.some(cell => cell[0] === head[0] && cell[1] === head[1]);
  }
    
  runLogic(fruit) {
        const newCell = this.calculateNextCell(this.direction);
        this.tail.push(newCell);
         // Check collision with fruit
        const intersection = this.checkCollisionWithFruit(fruit);

        if (intersection) {
        fruit.setRandomPosition();
        } else {
        this.tail.shift();
        }

        if(this.tail.length > 10) {
            this.tail.pop(newCell);
        }
        // Check collision with self
        const isColliding = this.checkCollisionWithSelf();

        if (isColliding && startedMoving) {
        endGame()
        }


    }
    /*
    drawTail() {
        const image = new Image();
        image.src = 'images/Error.png';
        this.tail.forEach((coor) => {
         
                context.drawImage(image, coor.x, coor.y, this.width, this.height); 
               // context.clearRect(coor.x, coor.y, this.width, this.height);
      
        });  

    }
    */
   drawSnake() {
       const cell_width = 50;

       for (let cell of this.tail) {
           const column = cell[0]
           const row = cell[1]

           const x = column * cell_width;
           const y = row * cell_width;
        
            const image = new Image();
            image.src = 'images/Error.png';
           context.drawImage(image, x, y, cell_width, cell_width); 
           
       }
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