var worldAABB = new b2AABB();
worldAABB.minVertex.Set(0, 0);
worldAABB.maxVertex.Set(700, 700);

var gravity = new b2Vec2(0, 500);
var doSleep = true;
var world = new b2World(worldAABB, gravity, doSleep);

var r, l;

function setup() {
    createCanvas(700, 700);
    r = bRect(80, 20, 10, 10, false);
    l = bLine(20, 20, 100, 100, true);
}

function draw() {
    drawBox2dShapes();
    world.Step(1.0 / 60, 1);
}


function mousePressed() {
    bCirc(mouseX, mouseY, 20, false);
}
