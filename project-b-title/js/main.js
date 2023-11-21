let x, y, dia;

function setup() {
  let canvas = createCanvas(1000, 600);
  canvas.parent('p5-container');
  background(255, 255, 0);

  x = width / 2;
  y = height / 2;
  dia = 50;
}

function draw() {
  circle(x, y, dia);
}

function keyPressed() {
  background(random(255), random(255), random(255));
}

function changeBackground() {
  background(random(255), random(255), random(255));
}

function changePosition() {
  console.log("Yay!");
  x += random(-10, 10);
  y += random(-10, 10);
}