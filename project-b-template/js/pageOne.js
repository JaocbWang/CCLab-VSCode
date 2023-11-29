//Shows a picture of a cat and there are certain places you can pet the cat
//Each place has a specific sound and the image will manipulate based and the emotion of the cat
//Touch/hold and press the cat's chin, the cat will make a purr sound
//and the image will rumble/move in a purring motion
//Touch the cats nose and the cat will make a hissing sound
//The image will turn red and black to show that the cat is mad
//Touch the cats stomach and the cat will make a meowing noise
//The image will light up
let bg5;
let catSound;
let catSound1;
let catSound2;
let chinSound = 2;
let bellySound = 2;
let noseSound = 2;

let catEmotion;

function preload() {
    // Load your initial image
    bg5 = loadImage('js/cat5.jpg');
}

function setup() {

    catSound = loadSound('js/video/catPurr.mp3');
    catSound1 = loadSound('js/video/catSound1.wav');
    catSound2 = loadSound('js/video/catHiss.mp3');


    let cnv = createCanvas(500, 500);
    cnv.parent('canvas-container');
    // Display the initial image
    background(255);
    catEmotion = new pageOne();

    bg5.resize(500, 500)
    image(bg5, 0, 0)

}



function mouseClicked() {
    background(bg5);
    catSound.stop();
    catSound1.stop();
    catSound2.stop();

    noseSound = 1;
    bellySound = 1;
    chinSound = 1;
    catEmotion.chin();
    catEmotion.belly();
    catEmotion.nose();
    setTimeout(function () {
        background(bg5);
    }, 2000);

}

function filterYRandom(amount) {
    for (let y = 0; y < bg5.height; y++) {
        for (let x = 0; x < bg5.width; x++) {

            let sampleX = constrain(x + int(random(-amount, amount)), 0, width - 1);

            let sampleY = constrain(y + int(random(-amount, amount)), 0, height - 1);

            let pixelColor = bg5.get(sampleX, sampleY);

            stroke(pixelColor);
            point(x, y);
        }
    }
}





class pageOne {

    chin() {

        if (mouseX > 180 && mouseX < 240 && mouseY > 180 && mouseY < 205 && chinSound == 1) {
            chinSound = 2;
            catSound.play();
            setTimeout(function () {
                catSound.stop();
            }, 3000);
            filterYRandom(3);

        }


    }

    belly() {

        if (mouseX > 150 && mouseX < 300 && mouseY > 220 && mouseY < 330 && bellySound == 1) {
            bellySound = 2;
            catSound1.play();

            //bg5.loadPixels();
            for (let y = 0; y < bg5.height; y++) {
                for (let x = 0; x < bg5.width; x++) {
                    let originalImage = bg5.get(x, y);
                    let r = red(originalImage);
                    let g = green(originalImage);
                    let b = 100 + blue(originalImage);

                    let output = color(r, g, b);

                    stroke(output);
                    point(x, y);
                }
            }

        }



    }

    nose() {

        if (mouseX > 200 && mouseX < 205 && mouseY > 145 && mouseY < 155 && noseSound == 1) {
            noseSound = 2;
            catSound2.play();

            //bg5.loadPixels();
            for (let y = 0; y < bg5.height; y++) {
                for (let x = 0; x < bg5.width; x++) {
                    let originalImage = bg5.get(x, y);

                    let filter = getFilterColor(red(originalImage), green(originalImage), blue(originalImage));
                    stroke(filter);
                    point(x, y);

                }
            }
        }

    }

}

function getFilterColor(r, g, b) {
    let rFilter = 100 + r;
    let gFilter = b
    let bFilter = g;

    return color(rFilter, gFilter, bFilter);
}