//Code something like the discord picture with a shadow of a cat in the middle
//Make it interactive
//ex: pressing certain keys would make the stars move faster
//or touching the cat would light the sky

//or we can have multiple shadow cat pictures in boxes next to the canvas
//pressing on each picture would make the canvas do something different
//each cat position would make a unique animation or difference in the canvas
let goNumber = 0;
let stars = [];
let yStart;
let picture1;
let bg6;
let bg7;
let bg8;
let bg9;
let meteors = [];
let explosions = [];
let starsTwo = [];
let count = 0;
let meteorFunc = false;
let starFunc = false;
let makeNewMeteors = false;
let makeNewStars = false;
let moonGo;


function preload() {
    bg6 = loadImage("js/cat6.jpg");
    bg7 = loadImage("js/cat7.jpg");
    bg8 = loadImage("js/moon.png");
    bg9 = loadImage("js/cat9.png");
}


function setup() {

    let cnv = createCanvas(800, 700);
    cnv.parent('canvas-container');


    for (let i = 0; i < 150; i++) {
        stars.push(new Star());
    }

    moonGo = new Moon();

    let buttonOne = select('#imageOne');
    buttonOne.mousePressed(starBegin);

    let buttonTwo = select('#imageTwo');
    buttonTwo.mousePressed(meteorBegin);


}

function starBegin() {
    if (starFunc == makeNewStars) {
        if (starFunc) {
            if (starsTwo.length > 0) {
                makeNewStars = !makeNewStars;
                setTimeout(function () {
                    starsTwo.splice(0, starsTwo.length)
                    count = 0;
                    goNumber = 0;
                    starFunc = !starFunc;
                }, 3000);
            }
        }
        else {
            starFunc = !starFunc;
            makeNewStars = !makeNewStars;

        }
    }




}

function meteorBegin() {
    if (meteorFunc == makeNewMeteors) {
        if (meteorFunc) {
            makeNewMeteors = !makeNewMeteors;
            setTimeout(function () {
                meteorFunc = !meteorFunc;
                meteors.splice(0, meteors.length)
                explosions.splice(0, explosions.length)
            }, 2000);
        }
        else {
            meteorFunc = !meteorFunc;
            makeNewMeteors = !makeNewMeteors;
        }
    }

}


function draw() {

    background(0, 25);

    let topColor = color(0, 1); // Black
    let bottomColor = color(0, 0, 60, 100); // Galaxy Blue

    for (let y = 0; y < height; y++) {
        let inter = map(y, 0, height, 0, 1);
        let gradientColor = lerpColor(topColor, bottomColor, inter);
        noStroke();
        stroke(gradientColor);
        line(0, y, width, y);
    }

    //For class Star
    push();
    translate(width / 2, height / 2);

    for (let star of stars) {
        star.update();
        star.draw();
    }
    pop();

    //Moon
    push();
    translate(width / 2 - 75, height / 2 - 75);
    moonGo.update();
    moonGo.draw();
    pop();

    //For class Meteor, explosion, particle
    if (meteorFunc) {
        if (random() < 0.02 && makeNewMeteors) {
            meteors.push(new Meteor());
        }

        for (let i = meteors.length - 1; i >= 0; i--) {
            meteors[i].update();
            meteors[i].draw();

            if (meteors[i].y > height) {
                explosions.push(new Explosion(meteors[i].x, height));
                meteors.splice(i, 1);
            }
        }

        for (let i = explosions.length - 1; i >= 0; i--) {
            explosions[i].update();
            explosions[i].draw();

            if (explosions[i].isFinished()) {
                explosions.splice(i, 1);
            }
        }
    }



    //For class StarTwo
    if (starFunc) {
        for (let i = 0; i < goNumber; i++) {
            starsTwo[i].update();
        }
        for (let i = 0; i < starsTwo.length; i++) {
            starsTwo[i].draw();
        }
    }



}

class Star {
    constructor() {
        this.radius = random(75, 450);
        this.angle = random(TWO_PI);
        this.speed = random(0.01, 0.025);
        this.color = color(random(15, 76), random(31, 82), random(75, 113));
    }

    update() {
        this.angle += this.speed;

    }

    draw() {
        let x = this.radius * cos(this.angle);
        let y = this.radius * sin(this.angle);

        noStroke();
        fill(this.color);
        ellipse(x, y, random(3, 5), random(3, 5));
    }
}

class Moon {
    constructor() {
        this.angle = random(TWO_PI);
        this.speed = .015;
    }

    update() {
        this.angle += this.speed;
    }

    draw() {
        let x = 300 * cos(this.angle);
        let y = 300 * sin(this.angle);
        image(bg8, x, y, 150, 150);
        tint(255, 127);
        image(bg9, x + 25, y + 25, 100, 100);
    }
}

//The first cat picture if pressed would summon meteors
class Meteor {
    constructor() {
        this.x = random(width);
        this.y = 0;
        this.speedX = random(-2, 2);
        this.speedY = random(5, 10);
        this.size = random(10, 15);
        this.speed = random(3, 8);
    }

    update() {
        this.x += this.speedX + random(-1, 1) * this.speed;
        this.y += this.speedY;
    }

    draw() {
        fill(63, 59, 59);
        ellipse(this.x, this.y, this.size, this.size);
    }
}

class Explosion {
    constructor(x, y) {
        this.particles = [];
        for (let i = 0; i < 100; i++) {
            this.particles.push(new Particle(x, y));
        }
    }

    update() {
        for (let particle of this.particles) {
            particle.update();
        }
    }

    draw() {
        for (let particle of this.particles) {
            particle.draw();
        }
    }

    isFinished() {
        return this.particles.every(particle => particle.alpha === 0);
    }
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = random(1, 3);
        this.angle = random(TWO_PI);
        this.speed = random(1, 5);
        this.alpha = 255;
    }

    update() {
        this.x += cos(this.angle) * this.speed;
        this.y += sin(this.angle) * this.speed;

        this.alpha -= 4;

        this.angle += radians(10);
    }

    draw() {
        noStroke();
        fill(150, 59, 59, this.alpha);
        ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    }
}


//Second Cat picture, pressing the cat could make movement of the stars different and summon more stars

function mousePressed() {
    if (makeNewStars) {
        let newStar = new StarTwo(mouseX, mouseY);
        if (count % 10 == 0 && count != 0) {
            goNumber = count + 1;
        }
        starsTwo.push(newStar);

        count += 1;
    }
    else {
        goNumber = starsTwo.length;
    }


}

class StarTwo {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.xSpd = random(-3, 3);
        this.ySpd = random(3, 5);
        this.size = random(5, 10);
        this.color = color(255, 250, 134, 150);
    }

    update() {
        this.x += this.xSpd;
        this.y += this.ySpd;

    }


    draw() {
        fill(this.color, 150);
        noStroke();
        beginShape();
        for (let i = 0; i < 5; i++) {
            let angle = PI + TWO_PI / 5 * i;
            let sx = this.x + cos(angle) * this.size;
            let sy = this.y + sin(angle) * this.size;
            vertex(sx, sy);
            angle += TWO_PI / 10;
            let mx = this.x + cos(angle) * (this.size / 2);
            let my = this.y + sin(angle) * (this.size / 2);
            vertex(mx, my);
        }
        endShape(CLOSE);
    }
}


