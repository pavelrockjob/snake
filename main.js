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

  const fieldWidth = 20
  for(let i = 0; i < 400; i += fieldWidth) {
    for(let j = 0; j < 400; j += fieldWidth) {
      context.beginPath()
      context.lineWidth = 1
      context.strokeStyle = "red"
      context.moveTo(i, j)
      context.lineTo(i + fieldWidth, j)
      context.lineTo(i + fieldWidth, j + fieldWidth)
      context.lineTo(i, j + fieldWidth)
      context.stroke()
      context.closePath()
    }
  }

}

startGame()

// const drawLine = () => {
//   context.lineWidth = 1
//   context.strokeStyle = 'black'
//   context.moveTo(50, 0)
//   context.lineTo(50, 400)
// }

startBtn.addEventListener("click", startGame)

