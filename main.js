const startMenu = document.querySelector("#start-menu")
const endMenu = document.querySelector("#end-menu")

const startBtn = document.querySelector("#start-btn")
const retryBtn = document.querySelector("#retry-btn")

const canvas = document.querySelector("#canvas")
const context = canvas.getContext('2d')

const startGame = () => {
  startMenu.classList.add("hidden")
  canvas.classList.remove("hidden")

  drawField()
}

const endGame = () => {
  endMenu.classList.remove("hidden")
  canvas.classList.add("hidden")
}

const drawField = () => {
  context.rect(0, 0, 400, 400)
  context.fill()
  context.lineWidth = 2
  context.strokeStyle = 'gray'
  context.strokeRect(0, 0, 50, 50)
}

// const drawLine = () => {
//   context.lineWidth = 1
//   context.strokeStyle = 'black'
//   context.moveTo(50, 0)
//   context.lineTo(50, 400)
// }

startBtn.addEventListener("click", startGame)

