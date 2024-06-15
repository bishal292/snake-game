websitelink =
  "https://wallpapers.com/wallpapers/green-snake-game-character-bqvxt2p5oibadgqn.html";
console.log(`Background Image is taken from site: ${websitelink}`);

let direction = { x: 0, y: 0 };
const eatSound = new Audio("assets/musics/food.mp3");
const gameOverSound = new Audio("assets/musics/gameover.mp3");
const moveSound = new Audio("assets/musics/move.mp3");
const backgroundMusic = new Audio("assets/musics/music.mp3");
let lastRenderTime = 0;
let score = 0;
let speed = 5;
let snakeArr = [
  { x: 10, y: 10 },
  { x: 11, y: 10 },
];

let foodLocation = { x: 6, y: 7 };

// Game rendering and fps Controll here
function main(currentTime) {
  window.requestAnimationFrame(main);
  lastRenderTime = currentTime;
  gameEngine();
}

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
  if (snake[0].x > 20 || snake[0].x < 0 || snake[0].y > 20 || snake[0].y < 0) {
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
    backgroundMusic.play();
    score = 0;
    scoreBox.innerHTML = "score: " + score;
  }
  // If you have eaten the food, increment the score & snake length and regenerate the food
  if (snakeArr[0].y === foodLocation.y && snakeArr[0].x === foodLocation.x) {
    eatSound.play();
    score += 1;
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
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.id = "head";
    } else {
      snakeElement.classList.add("snake");
    }
    gameBoard.appendChild(snakeElement);
  });

  // Displaying the foodLocation
  foodLocationElement = document.createElement("div");
  foodLocationElement.style.gridRowStart = foodLocation.y;
  foodLocationElement.style.gridColumnStart = foodLocation.x;
  foodLocationElement.id = "food";
  gameBoard.appendChild(foodLocationElement);
}

backgroundMusic.play();
let gameHighScore = localStorage.getItem("gameHighScore");
if (gameHighScore === null) {
  hiscoreval = 0;
  localStorage.setItem("gameHighScore : ", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(gameHighScore);
  highscoreBox.innerHTML = "HighScore : " + gameHighScore;
}

window.addEventListener("keydown", (e) => {
  direction = { x: 0, y: 1 }; // Start the game
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      direction.x = 0;
      direction.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      direction.x = 0;
      direction.y = 1;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      direction.x = -1;
      direction.y = 0;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      direction.x = 1;
      direction.y = 0;
      break;

    default:
      break;
  }
});
window.requestAnimationFrame(main);
