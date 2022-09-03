import drawEdges from "./drawEdges"
import readObjFile from "./readObjFile"
import rotateX from "./rotateX"
import rotateY from "./rotateY"
import rotateZ from "./rotateZ"

function _terminal() {
  const p = document.createElement('p')
  p.style.fontSize = '12px'
  p.style.whiteSpace = 'wrap'
  p.innerHTML = 'terminal'
  p.id = 'terminal'
  return p
}

function component() {
  const element = document.createElement('canvas')
  element.style.border = 'solid 1px'
  element.setAttribute('height', '500px')
  element.setAttribute('width', '500px')
  element.id = 'canva'
  return element
}

let mouseX = 0
let mouseY = 0

const Canva = component()
const ctx = Canva.getContext("2d")

Canva.addEventListener("mousemove", function (e) {
  const rect = Canva.getBoundingClientRect()
  mouseX = e.clientX - rect.left
  mouseY = e.clientY - rect.top
})
const terminal = _terminal()
document.body.appendChild(terminal)
document.body.appendChild(Canva)

const coordinates = readObjFile()
let vertices = coordinates[0]
let edges = coordinates[1]
const size = -50
let X = 80
const Y = 70
const rotatingX = true
const rotatingY = true
const rotatingZ = false

function render() {
  drawEdges(vertices, edges, ctx, size, X, Y, mouseX, mouseY)
  //drawVertices(vertices, ctx, size, X, Y)
}

var isMoving = false
var initX = 0
var initTranslateX
Canva.addEventListener('mousedown', function (e) {
  initX = e.clientX
  terminal.innerHTML = (0).toString()
  initTranslateX = X
  //X = (e.clientX - initX)
  isMoving = true
})

Canva.addEventListener('mouseup', function () {
  isMoving = false
  initX = 0
})

window.addEventListener('mousemove', function (e) {
  if (isMoving) {
    terminal.innerHTML = (e.clientX - initX).toString()
    X = initTranslateX + (e.clientX - initX)
  }
})

function step() {
  ctx.clearRect(0, 0, Canva.width, Canva.height)
  //if (rotatingX) rotateX(vertices, 0.01)
  if (rotatingY) rotateY(vertices, 0.05)
  //if (rotatingZ) rotateZ(vertices, 0.03)
  render()
  window.requestAnimationFrame(step)
}
//rotateY(vertices, 0.5)
//step()
window.requestAnimationFrame(step)