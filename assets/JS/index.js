websitelink ="https://wallpapers.com/wallpapers/green-snake-game-character-bqvxt2p5oibadgqn.html";
console.log(`Background Image is taken from site: ${websitelink}`);

// Note: -> id from html is directly accessible as the variable in javascript
// Game Initial variable

let direction = { x: 0, y: 0 };
const eatSound = new Audio("assets/musics/food.mp3");
const gameOverSound = new Audio("assets/musics/gameover.mp3");
const moveSound = new Audio("assets/musics/move.mp3");
const backgroundMusic = new Audio("assets/musics/music.mp3");
let lastRenderTime = 0;
let box = 20; // It is the no. of boxes in the grid
let score = 0;
let speed = 5;
let snakeArr = [
  { x: 10, y: 10 },
  { x: 11, y: 10 },
];
let foodLocation = { x: 6, y: 7 };
let previousDirection;
console.log(`speed of the snake is ${speed}`);

// Game rendering and fps Controll here
function main(currentTime) {
  window.requestAnimationFrame(main);
  if ((currentTime - lastRenderTime) / 1000 < 1 / speed) {
    return;
  }
  lastRenderTime = currentTime;
  gameEngine();
}

// logic to change the initial spped according to the selected level
function levelChanger(){
const levelSelected = document.getElementById('levelSelector').value;
switch(levelSelected) {
  case "Medium":
    speed = 10;
    break;
  case "Hard":
    speed = 15;
    break;
  case "Extreme":
    speed = 25;
  default:
    speed = 5;
}
}
console.log(`speed of snake is: ${speed}`);

// Increase snake movement speed after each 15 seconds
setTimeout(() => {
  speed ++;
  console.log(`Speed of snake is increased to : ${speed}`);
}, 15000);

//  Functions to check whether the game is over or not
function isGameOver(snake) {
  // If snake head collide with it's body
  if (snake.length > 2) {
    for (let i = 1; i < snakeArr.length; i++) {
      if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
        return true;
      }
    }
  }
  // If you bump into the wall
  if (snake[0].x > box || snake[0].x < 0 || snake[0].y > box || snake[0].y < 0) {
    return true;
  }

  return false;
}

// Main function to run the game , move snake , locate food , increasing snake length ,score counts
function gameEngine() {
  // Checks whether the game is over or not
  if (isGameOver(snakeArr)) {
    gameOverSound.play();
    backgroundMusic.pause();
    direction = { x: 0, y: 0 };
    alert("Game Over. Press any key to play again!");
    snakeArr = [
      { x: 10, y: 10 },
      { x: 11, y: 10 },
    ];
    score = 0;
    scoreBox.innerHTML = "score: " + score;
  }
  // If you have eaten the food, increment the score & snake length and regenerate the food
  if (snakeArr[0].y === foodLocation.y && snakeArr[0].x === foodLocation.x) {
    eatSound.play();
    score += 1;
    // Updating HighScore
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("gameHighScore", JSON.stringify(hiscoreval));
      highscoreBox.innerHTML = "HighScore: " + hiscoreval;
    }
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + direction.x,
      y: snakeArr[0].y + direction.y,
    });
    let a = 1;
    let b = 20;
    foodLocation = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }
  // Moving the Snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += direction.x;
  snakeArr[0].y += direction.y;

  // Displaing Snake
  gameBoard.innerHTML = "";
  snakeArr.forEach((segment, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    if (index === 0) {
      snakeElement.id = "head";
    } else {
      snakeElement.classList.add("snake");
    }
    gameBoard.appendChild(snakeElement);
  });

  // Displaying the foodLocation
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = foodLocation.y;
  foodElement.style.gridColumnStart = foodLocation.x;
  foodElement.id = "food";
  gameBoard.appendChild(foodElement);
}

let gameHighScore = localStorage.getItem("gameHighScore");
if (gameHighScore === null) {
  hiscoreval = 0;
  localStorage.setItem("gameHighScore : ", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(gameHighScore);
  highscoreBox.innerHTML = "HighScore : " + gameHighScore;
}

window.addEventListener("keydown", (e) => {
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      if (previousDirection !== "DOWN") {
        direction = { x: 0, y: -1 };
        previousDirection = "UP";
      }
      break;
    case "ArrowDown":
      if (previousDirection !== "UP") {
        direction = { x: 0, y: 1 };
        previousDirection = "DOWN";
      }
      break;
    case "ArrowLeft":
      if (previousDirection !== "RIGHT") {
        direction = { x: -1, y: 0 };
        previousDirection = "LEFT";
      }
      break;
    case "ArrowRight":
      if (previousDirection !== "LEFT") {
        direction = { x: 1, y: 0 };
        previousDirection = "RIGHT";
      }
      break;
    default:
      break;
  }
});
window.requestAnimationFrame(main);
