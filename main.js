import { rand } from "./utils.js"

const SNAKE_DIRECTIONS = {
  left: 0,
  top: 1,
  right: 2,
  bottom: 3
}

const FIELD_COLOR = 'black'

const cellRects = {
  minX: 0,
  maxX: 7,
  minY: 0,
  maxY: 7
}

class Snake {
  size = 3
  coords = {}
  direction = null
  color = null
  history = []
  maxHistoryLength = 5
  constructor({ x, y, color }) {
    this.coords.x = x
    this.coords.y = y
    this.color = color

    this.direction = this.coords.x < cellRects.maxX
      ? SNAKE_DIRECTIONS.right
      : SNAKE_DIRECTIONS.left
  }
  init() {
    for(let i = 0; i < this.size; i++) {
      let diff = this.coords.x + this.size < cellRects.maxX ? -i : i
      drawRect(this.coords.x - diff, this.coords.y, this.color)
      if (this.direction === 2) {
        this.history.push([this.coords.x - diff, this.coords.y])
      } else {
        this.history.unshift([this.coords.x - diff, this.coords.y])
      }
    }
  }
  update() {
    drawRect(this.coords.x, this.coords.y, this.color)
    this.history.unshift([this.coords.x, this.coords.y])
    const lastCoords = this.history[this.history.length - 1]
    const [x, y] = lastCoords
    deleteRect(x, y)
    if (this.history.length === this.size + 1) {
      this.history.pop()
    }
    console.log(this.history)
  }
}

const snake = new Snake({
  x: rand(0, cellRects.maxX),
  y: rand(0, cellRects.maxY),
  color: "blue"
})

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
  snake.init()
}

const endGame = () => {
  endMenu.classList.remove("hidden")
  canvas.classList.add("hidden")
}

const generateApple = () => {
  const cellX = rand(0, cellRects.maxX)
  const cellY = rand(0, cellRects.maxY)
  drawRect(cellX, cellY, 'green')
}

const drawField = () => {
  context.rect(0, 0, canvasSize.width, canvasSize.height)
  context.fillStyle = FIELD_COLOR
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

const deleteRect = (x, y) => {
  drawRect(x, y, FIELD_COLOR)
}

startGame()

let timeout = setTimeout(function step() {
  const directionsToEndGame = {
    [SNAKE_DIRECTIONS.left]: snake.coords.x === cellRects.minX,
    [SNAKE_DIRECTIONS.right]: snake.coords.x === cellRects.maxX,
    [SNAKE_DIRECTIONS.top]: snake.coords.y === cellRects.minY,
    [SNAKE_DIRECTIONS.bottom]: snake.coords.y === cellRects.maxY,
  }
  const directionToEndGame = directionsToEndGame[snake.direction]
  if(directionToEndGame) {
    endGame()
    clearTimeout(timeout)
    return false
  }

  const moveDirections = {
    [SNAKE_DIRECTIONS.left]: () => snake.coords.x -= 1,
    [SNAKE_DIRECTIONS.right]: () => snake.coords.x += 1,
    [SNAKE_DIRECTIONS.top]: () => snake.coords.y -= 1,
    [SNAKE_DIRECTIONS.bottom]: () => snake.coords.y += 1,
  }

  const moveDirection = moveDirections[snake.direction];
  moveDirection()

  snake.update()
  timeout = setTimeout(step, 500)
}, 500)

startBtn.addEventListener("click", startGame)

