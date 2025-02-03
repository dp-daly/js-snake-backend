import { createGame } from "./startGame"
import { endGame } from "./endGame"

/*-------------------------------- Constants --------------------------------*/

const cells = document.querySelectorAll(".grass div");
const walls = document.querySelectorAll(".grass div.wall");
const width = 20
const snakePosition = [168, 169, 170]


/*-------------------------------- Variables --------------------------------*/

let gameId
let headIndex
let currentHeadIndex
let currentBodyIndex
let validCellIndexes = []
let croissantIndex
let croissantsEaten = 0
let gameOver
let timer
let lastKeyDown = "ArrowDown"

/*------------------------ Cached Element References ------------------------*/

const userId = document.querySelector('meta[name="user-id"]').content;
const playAgainBtnEl = document.querySelector(".restart-button");
const gameMessageEl = document.querySelector("#message");
const themeButton = document.querySelector(".theme-button");
const pauseButtonEl = document.querySelector(".pauseaudio-button");
const playAudioButtonEl = document.querySelector(".playaudio-button");
const backgroundArcadeEl = document.querySelector("#background-arcade");
const munchEl = document.querySelector("#munch");
const screamEl = document.querySelector("#creature-scream");
const grassEl = document.querySelector(".grass");
const statusColumnEl = document.querySelector(".status-column");
const initialTitleEl = document.querySelector(".initial-title");
const playGameButtonEl = document.querySelector(".play-button");

/*-------------------------------- Functions --------------------------------*/

cells.forEach((cell, i) => {
    if (!cell.classList.contains("wall")) {
        validCellIndexes.push(i)
    }})

function init() {
    gameOver = true;
}

init();

async function play() {
    gameOver = false;  
    if (userId && userId.trim() !== "") {
        try {
        const gameData = await createGame(userId);
    
        console.log("Game created with ID:", gameData.id);
        gameId = gameData.id    

        } catch (error) {
        console.error("Error creating game:", error.message);
        }
    }
    autoMove();
    render();
    backgroundArcadeEl.play();
  }

makeCroissantAppear();

function autoMove() {
    timer = setInterval(() => {
        moveSnake({key: lastKeyDown})
    }, 350);
}

function render() {
    if (gameOver === true) {
        clearInterval(timer);
        screamEl.play();
        backgroundArcadeEl.pause();
        playAgainBtnEl.classList.remove("hidden");
        gameMessageEl.innerText = "That stings.. GAME OVER!";
        croissantsEaten = 0;
        cells.forEach((cell, index) => {
            cells[index].classList.remove("sprite")
        })
    }
    cells.forEach((cell, index) => {
        cells[index].classList.remove("sprite");
    })
    snakePosition.forEach((bodyPart) => {
    cells[bodyPart].classList.add("sprite");
})
}

function moveSnake(event) {
    let direction = 0;
    if (event.key === "ArrowUp") {
        direction = -width;
    } else if (event.key === "ArrowDown") {
        direction = width;
    } else if (event.key === "ArrowLeft") {
        direction = -1;
    } else if (event.key === "ArrowRight") {
        direction = 1;
    }
    if (currentHeadIndex !== croissantIndex) {
        snakePosition.pop();
    }
    if (currentHeadIndex === croissantIndex) {
        croissantsEaten += 1;
    }
    headIndex = snakePosition[0];
    snakePosition.unshift(headIndex + direction);
    currentHeadIndex = snakePosition[0];
    currentBodyIndex = snakePosition.slice(1);
    checkForSelfHit();
    makeWallsSolid();
    checkIfCroissantEaten();
    checkHowManyCroissants();
    render();
}

function checkHowManyCroissants() {
    if (croissantsEaten > 4) {
        clearInterval(timer);
        timer = setInterval(() => {
            moveSnake({key: lastKeyDown})
    }, 300);
        gameMessageEl.innerText = "You've had 5 croissants. Fancy some more?";
    }
    if (croissantsEaten > 9) {
        clearInterval(timer);
        timer = setInterval(() => {
            moveSnake({key: lastKeyDown})
        }, 250);
        gameMessageEl.innerText = "That's 10 and counting!";
    }
    if (croissantsEaten > 14) {
        clearInterval(timer);
        timer = setInterval(() => {
            moveSnake({key: lastKeyDown})
        }, 200);
        gameMessageEl.innerText = "15, hm. Save some for the rest of us.";
    }
    if (croissantsEaten > 19) {
        clearInterval(timer);
        timer = setInterval(() => {
            moveSnake({key: lastKeyDown})
        }, 150);
        gameMessageEl.innerText = "20! You're gaining speed.";
    }
    if (croissantsEaten > 29) {
        clearInterval(timer);
        timer = setInterval(() => {
            moveSnake({key: lastKeyDown})
        }, 100);
        gameMessageEl.innerText = "I'm dizzy. I think we've passed 30..";
    }
    if (croissantsEaten > 39) {
        clearInterval(timer);
        timer = setInterval(() => {
            moveSnake({key: lastKeyDown})
        }, 50);
        gameMessageEl.innerText = "Over 40! I can't keep count any longer.";
}
}

function makeWallsSolid() {
    const rowPosition = currentHeadIndex % width;
    const colPosition = Math.floor(currentHeadIndex / width);
    if (colPosition <= 0 || colPosition === width -1) {
        gameOver = true;
        if (userId && userId.trim() !== "") {
            endGame(gameId, croissantsEaten)
        }    
    }
    if (rowPosition <= 0 || rowPosition === width -1) {
        gameOver = true;
        if (userId && userId.trim() !== "") {
            endGame(gameId, croissantsEaten)
        }    
    }
}

function checkForSelfHit() {
    currentBodyIndex.forEach((bodyPart) => {
        if (currentHeadIndex === bodyPart) {
            gameOver = true;
            if (userId && userId.trim() !== "") {
                endGame(gameId, croissantsEaten)
            }
        }
    })
}

function generateRandomNum() {
    return validCellIndexes[(Math.floor(Math.random() * validCellIndexes.length))];
}

function makeCroissantAppear() {
    croissantIndex = generateRandomNum();
    cells[croissantIndex].classList.add("croissant");
}

function checkIfCroissantEaten() {
    if (headIndex === croissantIndex) {
        cells[croissantIndex].classList.remove("croissant");
        makeCroissantAppear();
        munchEl.play();
    }
}

function restart() {
    location.reload();
}

/*----------------------------- Event Listeners -----------------------------*/

window.addEventListener("keydown", function(e) { 
    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) 
        {e.preventDefault()}
}, false);

document.addEventListener("keydown", (event) => {
    lastKeyDown = event.key;
})

playAgainBtnEl.addEventListener("click", restart);

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("darkmode");
})

pauseButtonEl.addEventListener("click", () => {
    backgroundArcadeEl.pause();
    pauseButtonEl.classList.add("hidden");
    playAudioButtonEl.classList.remove("hidden");
})

playAudioButtonEl.addEventListener("click", () => {
    backgroundArcadeEl.play();
    playAudioButtonEl.classList.add("hidden");
    pauseButtonEl.classList.remove("hidden");
})
playGameButtonEl.addEventListener("click", play);
