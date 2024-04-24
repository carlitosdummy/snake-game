

let blockSize: number = 25;
let rows: number = 20;
let cols: number = 20;
let board: HTMLCanvasElement;
let context: CanvasRenderingContext2D;
let score: HTMLElement;
let snakeX: number;
let snakeY: number;

let velocityX: number = 0;
let velocityY: number = 0;

let snakeBody: [number, number][] = [];

let foodX: number;
let foodY: number;

let gameOver: boolean = false;
let plyScore: number = 0;

window.onload = function () {
    board = document.getElementById('board') as HTMLCanvasElement;
    score = document.getElementById('score')!;

    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext('2d')!;

    if (!context) {
        throw new Error("No se pudo obtener el contexto 2D del lienzo.");
    }
    setSnake();
    placeFood();
    document.addEventListener('keyup', changeDirection);
    document.addEventListener('keydown', restartGame);
    update();
    setInterval(update, 1000 / 10);
};

function update() {
    if (gameOver) return;

    context.fillStyle = '#fbf1c7';
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = '#af3a03';
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        plyScore++;
        score.textContent = `SCORE: ${plyScore}`;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = '#79740e';
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        gameOverF();
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOverF();
        }
    }
}

function changeDirection(e: KeyboardEvent) {
    if (e.code == 'ArrowUp' && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code == 'ArrowDown' && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code == 'ArrowLeft' && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code == 'ArrowRight' && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function restartGame(e: KeyboardEvent) {
    if (e.code === 'Tab' && gameOver) {
        setSnake();
        velocityX = 0;
        velocityY = 0;
        snakeBody = [];
        placeFood();
        gameOver = false;
        update();
        plyScore = 0;
        score.textContent = `SCORE:${plyScore}`;
        (document.getElementById('press') as HTMLElement).classList.remove('show');
    }
}

function gameOverF() {
    (document.getElementById('press') as HTMLElement).classList.add('show');
    gameOver = true;
}

function setSnake() {
    snakeX = Math.floor(Math.random() * cols) * blockSize;
    snakeY = Math.floor(Math.random() * rows) * blockSize;
}
