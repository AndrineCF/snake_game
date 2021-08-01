// html elements
let body = document.getElementsByTagName("BODY")[0]
let title = document.createElement("h1")
let scoreDisplay = document.createElement("h2")
let box = document.createElement("div")
let btn = document.createElement("button")

// const variables
const SIZE = 40

// initalizer variables
let squares = []
let direction = 1
let snake = [10 + 2, 10 +1, 10]
let appleIndex = 0
let timerID = 0
let score = 0
let gameOver = false

// main
menu()
window.addEventListener('keydown', e => control(e))

// functions

function menu() {
    btn.classList.add('btn')
    box.classList.add('box')

    title.textContent = "Snake"
    scoreDisplay.textContent = `Score: ${score}`
    btn.textContent = "Start"

    box.appendChild(title)

    if(gameOver) {
        resettValues()
        box.appendChild(scoreDisplay)
    }

    box.appendChild(btn)
    body.appendChild(box)

    btn.onclick = () => {
        gameOver = false
        box.remove()
        startGame()
    }
}

function startGame() {
    let gameBoard = createGameboard()
    body.appendChild(gameBoard)
    snake.forEach(i => squares[i].classList.add('snake'))
    generateApple() 
    timerID = setInterval(game, 100)
}

function resettValues() {
    // remove old elements
    snake.forEach(i => squares[i].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')

    // initalizer to default
    squares = []
    direction = 1
    score = 0
    snake = [10 + 2, 10 +1, 10]
    appleIndex = 0
    timerID = 0
}


function createGameboard() {
    let gameBoard = document.createElement('div')
    gameBoard.classList.add('game-board')
    gameBoard.style.setProperty("--n", SIZE);

    for (let x = 0; x < SIZE; x++) {

        for(let y = 0; y < SIZE; y++) {
    
            const div = document.createElement("div");

            // sett class to ends of the grid
            if(x === 0) div.classList.add('cell-top')
            if(x === (SIZE - 1)) div.classList.add('cell-bottom')
            if(y === 0) div.classList.add('cell-left')
            if(y === (SIZE - 1)) div.classList.add('cell-right')

            gameBoard.appendChild(div);
            squares.push(div)
        }
    }

    return gameBoard
}

function game() {

    checkDeath()
    
    if(gameOver) return

    const snakeTail = snake.pop()
    squares[snakeTail].classList.remove('snake')
    snake.unshift(snake[0] + direction)

    // if the snake eats a apple
    if(squares[snake[0]].classList.contains('apple')) {
        squares[snake[0]].classList.remove('apple')
        squares[snakeTail].classList.add('snake')
        snake.push(snakeTail)
        score++
        generateApple()
    }

    squares[snake[0]].classList.add('snake')

}

function checkDeath() {

    if (
        (squares[snake[0]].classList.contains('cell-bottom') && direction === SIZE) || //if snake has hit bottom
        (squares[snake[0]].classList.contains('cell-right') & direction == 1) || //if snake has hit right wall
        (squares[snake[0]].classList.contains('cell-top') && direction === -SIZE) || //if snake has hit top
        (squares[snake[0]].classList.contains('cell-left') && direction === -1) ||  //if snake has hit left wall
        squares[snake[0] + direction].classList.contains('snake')                   // if the snake hit it self
    )
     {
        gameOver = true

         // stop the game
        clearInterval(timerID)

        // remove game elements        
        while (body.firstChild) {
            body.removeChild(body.firstChild)
        }

        menu()
    }
}

function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))

    squares[appleIndex].classList.add('apple')
} 

function control(e) {
    switch(e.key) {
        case 'Down':
        case 'ArrowDown':
            if(direction != -SIZE) { direction = +SIZE }
            break;
        case 'Right':
        case 'ArrowRight':
            if(direction != -1) {direction = 1}
            break;
        case 'Up':
        case 'ArrowUp':
            if(direction != SIZE) {direction = -SIZE}
            break;
        case 'Left':
        case 'ArrowLeft':
            if(direction != 1)  {direction = -1}
            break;    
    }
}
