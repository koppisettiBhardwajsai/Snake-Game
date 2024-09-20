const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [
  { x: 10, y: 10 },
];
let apple = { x: 5, y: 5 };
let velocity = { x: 0, y: 0 };
let score = 0;

function drawGame() {
  updateSnakePosition();
  if (checkCollision()) return resetGame();

  drawBackground();
  drawSnake();
  drawApple();
  drawScore();

  setTimeout(drawGame, 300);
}

function updateSnakePosition() {
  const head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y };

  if(head.x<0){
    head.x=tileCount-1;
  }else if(head.x>=tileCount){
    head.x=0;
  }

  snake.unshift(head);

  if (head.x === apple.x && head.y === apple.y) {
    score++;
    placeApple();
  } else {
    snake.pop();
  }
}
function checkCollision() {
  const head = snake[0];

  
  // if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
  //   return true;
  // }

  if(head.y<0 || head.y>=tileCount){
    return true;
  }


  
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      return true;
    }
  }

  // return snake.some((snakeblock)=>snakeblock.x === head.x && snakeblock.y === head.y)

  return false;
}
function resetGame() {
  score = 0;
  snake = [{ x: 10, y: 10 }];
  velocity = { x: 0, y: 0 };
  placeApple();
  drawGame();
}
function placeApple() {
  apple.x = Math.floor(Math.random() * tileCount);
  apple.y = Math.floor(Math.random() * tileCount);
}


function drawBackground() {
  ctx.fillStyle = '#f4f4f4';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = '#33CC33';
  snake.forEach(segment => {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  });
}

function drawApple() {
  ctx.fillStyle = '#FFC107';
  ctx.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize, gridSize);
}


function drawScore() {
  ctx.fillStyle = '#000';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 20);
}



document.addEventListener('keydown', event => {
  switch (event.key) {
    case 'ArrowUp':
      if (velocity.y === 0) velocity = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      if (velocity.y === 0) velocity = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      if (velocity.x === 0) velocity = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      if (velocity.x === 0) velocity = { x: 1, y: 0 };
      break;
    default:
      break;
  }
});


drawGame();
