// CCLab Mini Project - 9.R Particles Template

let NUM_OF_PARTICLES = 100; // Decide the initial number of particles.

let particles = [];

function setup() {
  //background(220);
  let canvas = createCanvas(600, 600);
  canvas.parent("canvasWrapper");

  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), 0);
  }
}

function draw() {
  background(200, 200, 255);



  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.fall();
    p.update();
    p.windFromLeft();
    p.windFromRight();
    p.lineFloor();
    p.display();
  }


}

class Particle {
  // constructor function
  constructor(startX, startY) {
    // properties: particle's characteristics
    this.x = startX;
    this.y = startY;
    this.dia = random(2, 4);
    this.r = 0;
    this.g = 0;
    this.b = random(100, 255);
    this.xSpd = random(2, 4);
    this.ySpd = random(3, 5);
  }
  // methods (functions): particle's behaviors
  update() {
    if (this.y > height) {
      this.splash();
      this.y = 0;

    }
  }

  fall() {
    this.y += this.ySpd
  }

  windFromRight() {
    if (keyIsPressed) {
      if (key == "a") {
        this.x += this.xSpd * -1;
      }
    }

    if (this.x < 0) {
      this.x = width;
    }
  }

  windFromLeft() {
    if (keyIsPressed) {
      if (key == "d") {
        this.x += this.xSpd;
      }
    }
    if (this.x > width) {
      this.x = 0;
    }
  }

  lineFloor() {
    push();

    translate(0, height);

    strokeWeight(7);
    stroke(150, 100, 250);
    line(0, 0, width, 0);

    pop();
  }

  splash() {
    noStroke();
    fill(this.r, this.g, this.b);
    ellipse(this.x, height, random(20, 25), random(10, 15));
    ellipse(this.x + 3, height - 7, random(2, 3), random(2, 5));
    ellipse(this.x - 3, height - 7, random(2, 3), random(2, 5));
  }


  display() {
    // particle's appearance
    push();

    translate(this.x, this.y);

    noStroke();
    fill(this.r, this.g, this.b, 100);
    circle(0, 0, this.dia, 50);
    circle(0, 2, this.dia, 50);

    pop();


  }
}
