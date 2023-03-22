const startMenu = document.querySelector("#start-menu")
const endMenu = document.querySelector("#end-menu")

const startBtn = document.querySelector("#start-btn")
const retryBtn = document.querySelector("#retry-btn")

const canvas = document.querySelector("#canvas")
const context = canvas.getContext('2d')

const canvasSize = {
  width: 400,
  height: 400,
}
const fieldWidth = canvasSize.width / 8

const startGame = () => {
  startMenu.classList.add("hidden")
  canvas.classList.remove("hidden")
  canvas.width = canvasSize.width
  canvas.height = canvasSize.height

  drawField()
}


const endGame = () => {
  endMenu.classList.remove("hidden")
  canvas.classList.add("hidden")
}

const drawField = () => {
  context.rect(0, 0, canvasSize.width, canvasSize.height)
  context.fill()

  for(let i = 0; i < canvasSize.width; i += fieldWidth) {
    for(let j = 0; j < canvasSize.width; j += fieldWidth) {
      drawCell(i, j, 'red')
    }
  }

  const cellX = rand(1, 8)
  const cellY = rand(1, 8)
  drawRect(cellX, cellY, 'green')
}

const drawCell = (x ,y, color) => {
  context.beginPath()
  context.lineWidth = 1
  context.strokeStyle = color
  context.moveTo(x, y)
  context.lineTo(x + fieldWidth, y)
  context.lineTo(x + fieldWidth, y + fieldWidth)
  context.lineTo(x, y + fieldWidth)
  context.stroke()
  context.closePath()
}

const drawRect = (x, y, color) => {
  x = x * fieldWidth
  y = y * fieldWidth
  context.beginPath()
  context.lineWidth = 1
  context.fillStyle = color
  context.moveTo(x, y)
  context.lineTo(x + fieldWidth, y)
  context.lineTo(x + fieldWidth, y + fieldWidth)
  context.lineTo(x, y + fieldWidth)
  context.fill()
  context.closePath()
}

const rand = (min, max) => {
  return Math.floor((Math.random() * max - min) + min)
}

startGame()

startBtn.addEventListener("click", startGame)

