function setup() {
    createCanvas(700, 700);

    world = new planck.World({
        gravity: planck.Vec2(0, 50)
    });


    b = new BRect(100, 100, 20, 20, false);
    c = new BCirc(20, 20, 20, false);
    p = new BCirc(60, 20, 20, false);
    l = new BLine(0, 500, 700, 700, true);
}

function draw() {
    drawBox2dShapes();
    world.step(1.0 / 60);
}


function mousePressed() {
    BCirc(mouseX, mouseY, 20, false);
}
