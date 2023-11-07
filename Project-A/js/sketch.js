let cols;
let rows;
let current;
let previous;

let dampening = 0.99;


function mouseDragged() {
    previous[mouseX][mouseY] = 2500;
}

let particles = [];
const num = 1000;

const noiseScale = 0.01 / 2;

function setup() {
    pixelDensity(1);
    createCanvas(400, 400);
    for (let i = 0; i < num; i++) {
        particles.push(createVector(random(width), random(height)));
    }

    stroke(255);

    //stroke(255, 75);
    clear();

    cols = width;
    rows = height;

    current = new Array(cols).fill(0).map((n) => new Array(rows).fill(0));
    previous = new Array(cols).fill(0).map((n) => new Array(rows).fill(0));
}

function draw() {

    loadPixels();
    for (let i = 1; i < cols - 1; i++) {
        for (let j = 1; j < rows - 1; j++) {
            current[i][j] =
                (previous[i - 1][j] +
                    previous[i + 1][j] +
                    previous[i][j - 1] +
                    previous[i][j + 1]) / 2 - current[i][j];
            current[i][j] = current[i][j] * dampening;

            let index = (i + j * cols) * 4;
            pixels[index + 0] = current[i][j] / 10;
            pixels[index + 1] = current[i][j] / 4;
            pixels[index + 2] = current[i][j];
        }
    }
    updatePixels();

    let temp = previous;
    previous = current;
    current = temp;
    background(0, 10);
    for (let i = 0; i < num; i++) {
        let p = particles[i];
        point(p.x, p.y);
        let n = noise(p.x * noiseScale, p.y * noiseScale, frameCount * noiseScale * noiseScale);
        let a = TAU * n;
        p.x += cos(a);
        p.y += sin(a);
        if (!onScreen(p)) {
            p.x = random(width);
            p.y = random(height);
        }
    }

}

function mouseReleased() {
    noiseSeed(millis());
}

function onScreen(v) {
    return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}