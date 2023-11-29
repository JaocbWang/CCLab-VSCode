let bg0
let bg1
let bg2
let bg3
let bg4
let bg5
let currentIndex = 0;
let catImg = [];

function preload() {
  bg0 = loadImage('js/cat0.jpg');
  bg1 = loadImage('js/cat1.jpg');
  bg2 = loadImage('js/cat2.jpg');
  bg3 = loadImage('js/cat3.jpg');
  bg4 = loadImage('js/cat4.jpg');
  catImg.push(bg0);
  catImg.push(bg1);
  catImg.push(bg2);
  catImg.push(bg3);
  catImg.push(bg4);


}

function setup() {


  let cnv = createCanvas(400, 400);
  cnv.parent('canvas-container');
  background(bg0);

  let button = select('#changeImageButtons');
  button.style("color", "#80669d");
  button.style("font-size", "15px");
  button.mousePressed(changeImage);


}

function changeImage() {
  currentIndex = (currentIndex + 1) % 5;
  background(catImg[currentIndex]);
}



