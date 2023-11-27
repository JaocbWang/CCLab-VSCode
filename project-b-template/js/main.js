let bg0
let bg1
let bg2
let bg3
let bg4
let bg5
let currentIndex = 0;
let catImg = [];

function preload() {
  // Load your initial image
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
  cnv.position(screen.width / 2 - 200, screen.height / 2 - 325)
  // Display the initial image
  background(bg0);

  // Set up button click event
  let button = select('#changeImageButtons');
  button.style("color", "#80669d");
  button.style("font-size", "15px");
  button.mousePressed(changeImage);
}

function changeImage() {
  // Load and display a new image when the button is clicked
  currentIndex = (currentIndex + 1) % 5;
  background(catImg[currentIndex]);
}


//Shows a picture of a cat and there are certain places you can pet the cat
//Each place has a specific sound and the image will manipulate based and the emotion of the cat
//Touch/hold and press the cat's chin, the cat will make a purr sound
//and the image will rumble/move in a purring motion
//Touch the cats nose and the cat will make a hissing sound
//The image will turn red and black to show that the cat is mad
//Touch the cats stomach and the cat will make a meowing noise
//The image will light up
class pageOne {
  bg5 = loadImage('js/cat5.jpg');

  showImage() {
    background(bg5);
  }

  chin() {

  }

}






//Code something like the discord picture with a shadow of a cat in the middle
//Make it interactive
//ex: pressing certain keys would make the stars move faster
//or touching the cat would light the sky
class pageTwo {

}