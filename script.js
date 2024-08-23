const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gameInfo = document.getElementById('gameInfo');
const gameOverDiv = document.getElementById('gameOver');

const canvasWidth = 400;
const canvasHeight = 400;
const snakeSize = 20;
const initialLength = 3;
let snake = [];
let food = {};
let direction = 'RIGHT';
let score = 0;
let gameInterval;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Initialize the snake
function initSnake() {
    snake = [];
    for (let i = initialLength - 1; i >= 0; i--) {
        snake.push({ x: i * snakeSize, y: 0 });
    }
}

// Initialize the food
function initFood() {
    food = {
        x: Math.floor(Math.random() * (canvasWidth / snakeSize)) * snakeSize,
        y: Math.floor(Math.random() * (canvasHeight / snakeSize)) * snakeSize
    };
}

// Draw the snake
function drawSnake() {
    ctx.fillStyle = 'green';
    for (const segment of snake) {
        ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
    }
}

// Draw the food
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
}

// Update the position of the snake
function updateSnake() {
    const head = { ...snake[0] };
    
    switch (direction) {
        case 'LEFT':
            head.x -= snakeSize;
            break;
        case 'RIGHT':
            head.x += snakeSize;
            break;
        case 'UP':
            head.y -= snakeSize;
            break;
        case 'DOWN':
            head.y += snakeSize;
            break;
    }

    snake.unshift(head);
    
    if (head.x === food.x && head.y === food.y) {
        score++;
        gameInfo.textContent = `Score: ${score}`;
        initFood();
    } else {
        snake.pop();
    }

    if (head.x < 0 || head.x >= canvasWidth || head.y < 0 || head.y >= canvasHeight || isCollision(head)) {
        clearInterval(gameInterval);
        gameOverDiv.style.display = 'block';
        return;
    }
}

// Check for collision with itself
function isCollision(head) {
    return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
}

// Handle keyboard input
function handleKeyPress(event) {
    switch (event.key) {
        case 'ArrowLeft':
            if (direction !== 'RIGHT') direction = 'LEFT';
            break;
        case 'ArrowRight':
            if (direction !== 'LEFT') direction = 'RIGHT';
            break;
        case 'ArrowUp':
            if (direction !== 'DOWN') direction = 'UP';
            break;
        case 'ArrowDown':
            if (direction !== 'UP') direction = 'DOWN';
            break;
    }
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawSnake();
    drawFood();
    updateSnake();
}

// Initialize the game
function initGame() {
    initSnake();
    initFood();
    document.addEventListener('keydown', handleKeyPress);
    gameInterval = setInterval(gameLoop, 100);
}

// Restart the game
function restartGame() {
    gameOverDiv.style.display = 'none';
    score = 0;
    gameInfo.textContent = `Score: ${score}`;
    initGame();
}

initGame();

