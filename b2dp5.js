var pl = planck;
var Vec2 = pl.Vec2;
var print = console.log;

var SCALE = 10;
var bodyList = [];

function BCirc(x, y, r, isFrozen) {
    BBody.call(this, isFrozen);

    this.body.createFixture({
        shape: pl.Circle(r / SCALE),
        density: 50,
        restitution: 0.8
    });

    this.body.setPosition(Vec2(x / SCALE, y / SCALE));
}

function BLine(x1, y1, x2, y2) {
    this.body = world.createBody();

    this.body.createFixture(pl.Edge(Vec2(x1 / SCALE, y1 / SCALE), Vec2(x2 / SCALE, y2 / SCALE)));
}


function BBody(isFrozen) {
    this.body = world.createBody();
    if (!isFrozen) this.body.setDynamic();

    bodyList.push(this);
}


//TODO: find way to efficiently iterate through custom objects instead of placnck bodies; it seems inefficient to be constantly multiplying and divinding by the scale factor

function drawBox2dShapes() {
    clear();
    noFill();
    for (body = world.m_bodyList; body; body = body.m_next) {
        for (fixture = body.m_fixtureList; fixture; fixture = fixture.m_next) {
            var shape = fixture.m_shape;

            switch (shape.m_type) {
                case "circle":
                ellipse(body.getPosition().x * SCALE,
                        body.getPosition().y * SCALE,
                        shape.m_radius * 2 * SCALE,
                        shape.m_radius * 2 * SCALE);
                    break;
                case "edge":
                line(shape.m_vertex1.x * SCALE,
                     shape.m_vertex1.y * SCALE,
                     shape.m_vertex2.x * SCALE,
                     shape.m_vertex2.y * SCALE);
                    break;
                case "polygon":
                // TODO: find out if getPosition is expensive (could access variable directly)
                    translate(body.getPosition().x * SCALE, body.getPosition().y * SCALE);
                    beginShape();
                    for (i = 0; i < shape.m_count; i++) {
                        vertex(shape.m_vertices[i].x * SCALE, shape.m_vertices[i].y * SCALE);
                    }
                    endShape(CLOSE);
                    translate(-1 * body.getPosition().x * SCALE, -1 * body.getPosition().y * SCALE);
                    break;
            }

        }
    }
}
