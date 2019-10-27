// fswatch -o ~/path/to/watch | xargs -n1 -I {} osascript -e 'tell application "Google Chrome" to tell the active tab of its first window to reload'

const points = []
const hull = []
const canvasSize = 600
const canvasEdge = 50
const numberOfPoints = 50

let leftMost
let currentVertex
let nextVertex
let index

function setup() {
  createCanvas(canvasSize, canvasSize)
  for(let i=0; i<numberOfPoints; i++) {
    points.push(createVector(random(canvasEdge, canvasSize - canvasEdge), (random(canvasEdge, canvasSize - canvasEdge))))
  }
  points.sort((a, b) => a.x - b.x)
  leftMost = points[0]
  currentVertex = leftMost
  nextVertex = points[1]    // this is a guess
  index = 2                 // finding the actual nextVertex will start here
}


function draw() {
  background(0);
  
  stroke(255);
  strokeWeight(5);
  for(let p of points) {
    point(p.x, p.y);
  }

  stroke(0, 255, 0)
  strokeWeight(30)
  point(leftMost.x, leftMost.y)

  stroke(0, 255, 0)
  strokeWeight(30)
  point(currentVertex.x, currentVertex.y)
  
  stroke(255, 0, 0)
  strokeWeight(5)
  line(currentVertex.x, currentVertex.y, nextVertex.x, nextVertex.y)

}