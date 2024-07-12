const board = document.getElementById("game-board");
const instrectionText = document.getElementById("instraction-text");
const logo = document.getElementById("logo");
const score = document.getElementById("score");
const highScoreText = document.getElementById("highscore");
let gridSize = 30;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = "right";
let isGameStarted = false;
let gameSpeedDeley = 300
let highScore = 0;
let gameIntervalId;


function draw() {
    board.innerHTML = ""
    drawSnake();
    drawFood();
    snakescore();
}

function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = creatElement("div", "snake");
        snakeElement.textContent = "🟥";
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);

    });

}

function creatElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

function drawFood() {
    let foodElement = creatElement("div", "food");
    foodElement.textContent = "🍏";
    setPosition(foodElement, food);
    board.appendChild(foodElement);
}

function generateFood() {
    let x = Math.floor(Math.random() * gridSize) + 1;
    let y = Math.floor(Math.random() * gridSize) + 1;
    return { x, y };

}


function move() {
    let head = { ...snake[0] };

    switch (direction) {
        case "up":
            head.y--;
            break;
        case "down":
            head.y++;
            break;
        case "left":
            head.x--;
            break;
        case "right":
            head.x++;
            break;
    }
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        gameSpeedDeley = Math.max(50, gameSpeedDeley -= 5);

        clearInterval(gameIntervalId);
        gameIntervalId = setInterval(() => {
            move();
            checkCollision();
            draw();
        }, gameSpeedDeley);
    } else {
        snake.pop();
    }
}

function startGame() {
    isGameStarted = true;
    instrectionText.style.display = "none";
    logo.style.display = "none";

    gameIntervalId = setInterval(() => {
        move();
        checkCollision();
        draw();
    }, gameSpeedDeley);
}

function hendleKeyPress(e) {
    if ((!isGameStarted && e.code === "Space") ||
        (!isGameStarted && e.key === " ")) {
        startGame();
    } else {
        switch (e.key) {
            case "ArrowUp":
                if (direction !== "down") { direction = "up"; }
                break;
            case "ArrowDown":
                if (direction !== "up") { direction = "down"; }
                break;
            case "ArrowLeft":
                if (direction !== "right") { direction = "left"; }
                break;
            case "ArrowRight":
                if (direction !== "left") { direction = "right"; }
                break;
        }
    }
}

function checkCollision() {
    let head = { ...snake[0] };
    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        resetGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}

function resetGame() {
    stopGame();
    updateHighScore();
    snake = [{ x: 10, y: 10 }];
    food = generateFood();
    direction = "right";
    gameSpeedDeley = 300;
    snakescore();
    food = { x: 13, y: 9 };
}

function stopGame() {
    clearInterval(gameIntervalId);
    isGameStarted = false;
    logo.style.display = "block";
    instrectionText.style.display = "block";
}


function snakescore() {
    let currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3, "0");

    if (currentScore >= 5) {
        levelUP()
    }

    if (currentScore >= 10) {
        levelUPS()
    }

}




function updateHighScore() {
    let currentScore = snake.length - 1;
    if (currentScore > highScore) {
        highScore = currentScore;
    }

    highScoreText.textContent = highScore.toString().padStart(3, "0");
    highScoreText.style.display = "block";
}



function levelUP() {
    speed = 200

    console.log(speed)
    const gameb1 = document.getElementById('game-border-1')
    const gameb2 = document.getElementById("game-border-2")
    const gameb3 = document.getElementById("game-border-3")
    board.style.backgroundColor = "brown"
    gameb1.style.borderColor = "purple";
    gameb2.style.borderColor = "white";
    gameb3.style.borderColor = '#7465h';

}


function levelUPS() {

    speed = 50

    const gameb4 = document.getElementById('game-border-1')
    const gameb5 = document.getElementById("game-border-2")
    const gameb6 = document.getElementById("game-border-3")
    board.style.backgroundColor = '#d91c22'
    gameb4.style.borderColor = '#ba1a1f';
    gameb5.style.borderColor = '#a1060c';
    gameb6.style.borderColor = '#730105';
}


document.addEventListener("keydown", hendleKeyPress)