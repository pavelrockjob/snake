import { rand, restrict } from './utils.js'

const SNAKE_DEFAULTS = {
  segments: [],
  length: 3,
  direction: 'right',
  nextDirection: 'right'
}

const DIRECTION_KEYS = {
  up: 'up',
  down: 'down',
  left: 'left',
  right: 'right'
}

const DIRECTIONS = {
  [DIRECTION_KEYS.up]: -1,
  [DIRECTION_KEYS.down]: 1,
  [DIRECTION_KEYS.left]: -1,
  [DIRECTION_KEYS.right]: 1
}

function getAxis(direction) {
  return direction === DIRECTION_KEYS.up || direction === DIRECTION_KEYS.down ? 'y' : 'x'
}

class Field {
  canvas
  context
  width
  height
  cell
  cells
  bounds
  color
  snake
  apple = {
    x: 0,
    y: 0,
    drawn: false
  }
  default = {
    width: 800,
    height: 800,
    cell: 40,
    color: 'DarkBlue'
  }
  constructor(selector, options = this.default) {
    this.canvas = document.querySelector(selector)
    this.context = this.canvas.getContext('2d')
    this.setSize(options)
  }
  draw(init) {
    this.clearContext()
    this.drawBorder()
    this.drawCells()
    this.drawSnake(init)
    this.drawApple()
  }
  setSize(options) {
    this.width = options.width ?? this.default.width
    this.height = options.height ?? this.default.height

    this.cell = options.cell ?? this.default.cell
    this.cells = {
      x: this.width / this.cell - 2,
      y: this.height / this.cell - 2
    }

    this.bounds = {
      x: this.width - this.cell,
      y: this.height - this.cell
    }

    this.color = options.color ?? this.default.color

    this.canvas.width = this.width
    this.canvas.height = this.height
  }
  drawBorder() {
    this.context.strokeStyle = 'black'
    this.context.lineWidth = this.cell
    const point = this.cell / 2
    this.context.rect(point, point, this.bounds.x, this.bounds.y)
    this.context.stroke()
  }
  drawCells() {
    this.context.strokeStyle = 'gray'
    this.context.lineWidth = 1
    this.context.beginPath()
    for (let i = 1; i < this.cells.y; i++) {
      const y = i * this.cell + this.cell
      this.context.moveTo(this.cell, y)
      this.context.lineTo(this.bounds.x, y)
    }
    for (let i = 1; i < this.cells.x; i++) {
      const x = i * this.cell + this.cell
      this.context.moveTo(x, this.cell)
      this.context.lineTo(x, this.bounds.y)
    }
    this.context.stroke()
  }
  drawSquare(x, y, color = this.color) {
    this.context.fillStyle = color
    this.context.fillRect(x * this.cell, y * this.cell, this.cell, this.cell)
  }
  drawCircle(x, y, color = 'SeaGreen') {
    const centerX = x * this.cell + this.cell / 2
    const centerY = y * this.cell + this.cell / 2
    this.context.fillStyle = color
    this.context.beginPath()
    this.context.arc(centerX, centerY, this.cell / 2, 0, Math.PI * 2, false)
    this.context.fill()
  }
  drawApple() {
    if (!this.apple.drawn) {
      this.apple.x = restrict(rand(1, this.cells.x), this.cells.x, 1)
      this.apple.y = restrict(rand(1, this.cells.y), this.cells.y, 1)
    }

    if (this.hasEqualCell()) {
      this.drawApple()
      return
    }

    this.drawCircle(this.apple.x, this.apple.y)
    this.apple.drawn = true
  }
  drawSnake(init = true) {
    if (init) {
      const x = restrict(rand(1, this.cells.x), this.cells.x, this.snake.length)
      const y = restrict(rand(1, this.cells.y), this.cells.y, 1)
      for (let i = 0; i < this.snake.length; i++) {
        this.snake.segments.unshift({ x: x + i, y })
      }
    }
    this.snake.segments.forEach(el => this.drawSquare(el.x, el.y))
  }
  updateSnake() {
    this.snake.direction = this.snake.nextDirection

    const value = DIRECTIONS[this.snake.direction]
    const axis = getAxis(this.snake.direction)
    const head = this.snake.segments.at(0)
    if (!head) return

    const newSegment = { ...head }
    newSegment[axis] += value

    this.snake.segments.pop()
    this.snake.segments.unshift(newSegment)

    this.draw(false)
  }
  changeDirection(direction) {
    if (this.snake.segments.length == 0) return
    this.snake.nextDirection = direction
  }
  hasEqualCell() {
    return !!this.snake.segments.filter(el => JSON.stringify(el) === JSON.stringify(this.apple))?.length
  }
  clearContext() {
    this.context.reset()
  }
}

class Game extends Field {
  started = false
  score = 0
  interval
  speed = 1000
  startMenu
  endMenu
  startBtn
  retryBtn
  scoreEl
  keys = {
    enter: () => this.start(),
    escape: () => this.end(),
    arrowup: () => this.changeDirection(DIRECTION_KEYS.up),
    arrowdown: () => this.changeDirection(DIRECTION_KEYS.down),
    arrowleft: () => this.changeDirection(DIRECTION_KEYS.left),
    arrowright: () => this.changeDirection(DIRECTION_KEYS.right),
  }
  constructor(selector, options) {
    super(selector, options)
    this.startMenu = document.querySelector('#start-menu')
    this.endMenu = document.querySelector('#end-menu')
    this.startBtn = document.querySelector('#start-btn')
    this.retryBtn = document.querySelector('#retry-btn')
    this.scoreEl = document.querySelector('#score')
    this.initListeners()
  }
  start() {
    if (this.started) return
    this.reset()
    this.startMenu.classList.add('hidden')
    this.endMenu.classList.add('hidden')
    this.canvas.classList.remove('hidden')
    this.draw()
    this.initInterval()
    this.started = true
  }
  end() {
    if (!this.started) return
    clearInterval(this.interval)
    this.scoreEl.innerHTML = this.score
    this.canvas.classList.add('hidden')
    this.endMenu.classList.remove('hidden')
    this.started = false
  }
  retry() {
    this.start()
  }
  reset() {
    this.score = 0
    this.snake = structuredClone(SNAKE_DEFAULTS)
    this.apple = { x: 0, y: 0, drawn: false }
  }
  initListeners() {
    this.startBtn.addEventListener('click', () => this.start())
    this.retryBtn.addEventListener('click', () => this.retry())
    document.addEventListener('keydown', (event) => {
      const key = event.key.toLowerCase()
      if (this.keys.hasOwnProperty(key)) this.keys[key]()
    })
  }
  initInterval() {
    this.interval = setInterval(() => {
      this.updateSnake()
    }, this.speed)
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const game = new Game('#canvas')
})
