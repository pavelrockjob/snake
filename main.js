import { rand } from "./utils.js"

const SNAKE_DIRECTIONS = {
  left: 0,
  top: 1,
  right: 2,
  bottom: 3
}

const maxCellRects = {
  x: 7,
  y: 7,
}

class Snake {
  size = 3
  coords = {}
  direction = null
  constructor({ x, y }) {
    this.coords.x = x
    this.coords.y = y
    this.direction = this.coords.x < maxCellRects.x
      ? SNAKE_DIRECTIONS.right
      : SNAKE_DIRECTIONS.left
  }
  initSnake() {
    for(let i = 0; i < this.size; i++) {
      let diff = this.coords.x + this.size < maxCellRects.x ? -i : i
      drawRect(this.coords.x - diff, this.coords.y, 'white')
    }
  }
}

const coords = {
  x: rand(0, maxCellRects.x),
  y: rand(0, maxCellRects.y)
}

const snake = new Snake(coords)

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
  generateApple()
  snake.initSnake()
}

const endGame = () => {
  endMenu.classList.remove("hidden")
  canvas.classList.add("hidden")
}

const generateApple = () => {
  const cellX = rand(0, maxCellRects.x)
  const cellY = rand(0, maxCellRects.y)
  drawRect(cellX, cellY, 'green')
}

const drawField = () => {
  context.rect(0, 0, canvasSize.width, canvasSize.height)
  context.fill()

  for(let i = 0; i < canvasSize.width; i += fieldWidth) {
    for(let j = 0; j < canvasSize.width; j += fieldWidth) {
      drawCell(i, j, 'red')
    }
  }
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

startGame()

requestAnimationFrame(function step () {
  
  requestAnimationFrame(step)
})

startBtn.addEventListener("click", startGame)

