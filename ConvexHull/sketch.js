const hull = []
const points = []
const numberOfPoints = 30
const buffer = 20
const canvasSize = 500

let index
let nextIndex
let leftMostPoint
let currentVertex

function setup() {
  createCanvas(canvasSize, canvasSize)
  for (let i = 0; i < numberOfPoints; i++) {
    points.push(createVector(random(buffer, canvasSize - buffer), random(buffer, canvasSize - buffer)))
  }
  points.sort((a, b) => a.x - b.x)
  leftMostPoint = points[0]  
  hull.push(leftMostPoint)
  currentVertex = leftMostPoint
  nextVertex = points[1]
  index = 2
}

function draw() {
  background(0)

  stroke(255)
  strokeWeight(8)
  for (let p of points) {
    point(p.x, p.y)  
  }

  stroke(0, 0, 255)
  fill(0, 0, 255, 50)
  beginShape()
  for (let p of hull) {
    vertex(p.x, p.y)
  }
  endShape(CLOSE)

  stroke(0, 255, 0)
  strokeWeight(20)
  point(leftMostPoint.x, leftMostPoint.y)

  stroke(0, 255, 0) 
  strokeWeight(2)
  line(currentVertex.x, currentVertex.y, nextVertex.x, nextVertex.y)

  let checking = points[index]

  stroke(255)
  strokeWeight(2)
  line(currentVertex.x, currentVertex.y, checking.x, checking.y)

  const a = p5.Vector.sub(nextVertex, currentVertex)
  const b = p5.Vector.sub(checking, currentVertex)
  const cross = a.cross(b)

  // if true then checking is further rotated than next
  if (cross.z < 0) {
    nextVertex = checking
  }

  index = index + 1
  if (index == points.length) {
    if (nextVertex == leftMostPoint) {
      console.log('Done')
      noLoop()
    } else {
      hull.push(nextVertex)
      currentVertex = nextVertex
      nextVertex = leftMostPoint
      index = 0
    }
  }
}
