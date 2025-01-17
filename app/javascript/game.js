/*-------------------------------- Constants --------------------------------*/

const cells = document.querySelectorAll(".grass div");
const walls = document.querySelectorAll(".grass div.wall");
const width = 20
const snakePosition = [168, 169, 170]


/*-------------------------------- Variables --------------------------------*/

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

const playAgainBtnEl = document.querySelector(".restart-button");
const gameMessageEl = document.querySelector("#message");
const themeButton = document.querySelector(".theme-button");
const pauseButtonEl = document.querySelector(".pauseaudio-button");
const playButtonEl = document.querySelector(".playaudio-button");
const backgroundArcadeEl = document.querySelector("#background-arcade");
const munchEl = document.querySelector("#munch");
const screamEl = document.querySelector("#creature-scream");
const grassEl = document.querySelector(".grass");
const welcomeBoxEl = document.querySelector(".welcomebox");
const statusColumnEl = document.querySelector(".status-column");
const initialTitleEl = document.querySelector(".initial-title");


/*-------------------------------- Functions --------------------------------*/

cells.forEach((cell, i) => {
    if (!cell.classList.contains("wall")) {
        validCellIndexes.push(i)
    }})

function init() {
    gameOver = true;
    playAgainBtnEl.classList.add("hidden");
    themeButton.classList.add("hidden");
    pauseButtonEl.classList.add("hidden");
    playButtonEl.classList.add("hidden");
    grassEl.classList.add("hidden");
    statusColumnEl.classList.add('hidden');
}

init();

function play() {
    gameOver = false;
    themeButton.classList.remove("hidden");
    pauseButtonEl.classList.remove("hidden");
    grassEl.classList.remove("hidden");
    statusColumnEl.classList.remove("hidden");
    initialTitleEl.classList.add("hidden");
    welcomeBoxEl.classList.add("hidden");
    backgroundArcadeEl.play();
    autoMove();
    render();
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
    }
    if (rowPosition <= 0 || rowPosition === width -1) {
        gameOver = true;
    }
}

function checkForSelfHit() {
    currentBodyIndex.forEach((bodyPart) => {
        if (currentHeadIndex === bodyPart) {
            gameOver = true;
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
    playButtonEl.classList.remove("hidden");
})

playButtonEl.addEventListener("click", () => {
    backgroundArcadeEl.play();
    playButtonEl.classList.add("hidden");
    pauseButtonEl.classList.remove("hidden");
})

welcomeBoxEl.addEventListener("click", play);
