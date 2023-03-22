const startMenu = document.querySelector("#start-menu")
const endMenu = document.querySelector("#end-menu")

const startBtn = document.querySelector("#start-btn")
const retryBtn = document.querySelector("#retry-btn")

const canvas = document.querySelector("#canvas")

const startGame = () => {
  startMenu.classList.add("hidden")
  canvas.classList.remove("hidden")
}

const endGame = () => {
  endMenu.classList.remove("hidden")
  canvas.classList.add("hidden")
}

startBtn.addEventListener("click", startGame)

