const canvas = document.getElementById('snake-board');
const context = canvas.getContext('2d');
document.getElementById('start-button').onclick = () => {
    startGame();
}

let currentGame;
let currentSnake;
let currentApple;
let currentScore = 0;
let animationId;

let speed = 5;
let frames = 0;


function startGame() {
 document.getElementById('game-board').style.display  = 'block';
    currentGame = new Game();
    currentSnake = new Snake();
    currentApple = new Apple(100, 100);

    currentGame.snake = currentSnake;
    currentGame.apple = currentApple;
    currentGame.apple.draw();
    currentGame.snake.checkDirection(currentGame.score);
    currentGame.snake.draw();
    drawGame();
}

function drawGame() {
    context.clearRect(0, 0, canvas.width, canvas.height);

   currentGame.apple.draw();
   currentGame.snake.drawTail();
   currentGame.snake.checkDirection(currentGame.score);
   currentGame.snake.draw();
    if (eatApple()) {
        let yPos;
        let xPos;
        currentGame.score++;
        let finalPosition;
        if(currentGame.snake.tail.length === 0) {
            finalPosition = {x: currentGame.snake.x, y: currentGame.snake.y }
        } else {
            finalPosition = currentGame.snake.tail[currentGame.snake.tail.length -1]
        }
      
        if(currentGame.snake.direction === "up") {
            xPos = finalPosition.x;
            yPos = finalPosition.y + currentGame.snake.height;
        } else if(currentGame.snake.direction === "down") {
              xPos = finalPosition.x;
             yPos = finalPosition.y - finalPosition.height;
        } else if(currentGame.snake.direction === "left") {
              yPos = finalPosition.y;
             xPos = finalPosition.x + 10;
        } else if(currentGame.snake.direction === "right"){
              yPos = finalPosition.y;
             xPos = finalPosition.x - 10;
        }
        
        let newTail ={
            x: xPos, 
            y: yPos};
        
        console.log(currentGame.snake.tail)
         currentGame.snake.tail.push(newTail);    
    
            currentGame.apple.clear();
            generateNewApple();
}

    
    scoreCount();
    endGame();
       
    frames++;
    if(!currentGame.gameOver) {
      animationId = requestAnimationFrame(drawGame);
    }

} 

function generateNewApple() {
    let randomX = Math.floor(Math.random()*(650));
    let randomY = Math.floor(Math.random()*(450));
    currentApple = new Apple(randomX, randomY);
    currentGame.apple = currentApple;
    currentGame.apple.draw();
}

function eatApple() {
    return !(
        (currentGame.snake.x > currentGame.apple.x + currentGame.apple.width) || //snake is on the right hand side of the apple
        (currentGame.snake.x + currentGame.snake.width < currentGame.apple.x) || //snake is on the left hand side of the apple
        (currentGame.snake.y > currentGame.apple.y + currentGame.apple.height) || //snake is above the apple
        (currentGame.snake.y + currentGame.snake.height < currentGame.apple.y)
        );
}
//gameover
function endGame() {
    let gameOver = false;
    //hitting top / bottom
    if (currentGame.snake.x < 0) {
        gameOver = true;
    } else if (currentGame.snake.x === canvas.width - 50) {
        gameOver = true;
    } else if (currentGame.snake.y < 0){
        gameOver = true;
    } else if (currentGame.snake.y === canvas.height - 50) {
        gameOver = true;
    }

    if (gameOver) {
        currentGame.gameOver = true;
        cancelAnimationFrame(animationId)
        
        function drawGameOver() {
            const gameOverImg = new Image;
            gameOverImg.src = "images/wordart.png"
            context.drawImage(gameOverImg, 300, 200); 
        } drawGameOver();

            // context.fillStyle = "white";
            // context.font = "50px Verdana";
            // context.fillText("Game Over!", canvas.width / 2, canvas.height / 2);
        }    
    }
function scoreCount() {
    document.getElementById("score").innerText = currentGame.score;
}

document.addEventListener('keydown', (e) => {
    switch(e.keyCode) {
        case 38: //up cursor key
            currentGame.snake.direction = 'up';
            break;
        case 40: //down cursor key
            currentGame.snake.direction = 'down';
            break;
        case 37: //left cursor key
            currentGame.snake.direction = 'left';
            break;
        case 39: 
            currentGame.snake.direction ='right';
            break;
    }
    currentSnake.draw();
});

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
