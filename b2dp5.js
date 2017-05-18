// Shapes


function bCirc(x, y, d, frozen) { return new BCirc(x, y, d, frozen); }
function BCirc(x, y, d, frozen) {
    var circleSd = new b2CircleDef();
    circleSd.radius = d * 2;
    circleSd.restitution = 0.8;
    if (!frozen) circleSd.density = 1.0;

    var circleBd = new b2BodyDef();
    circleBd.AddShape(circleSd);
    circleBd.position.Set(x, y);

    this.body = world.CreateBody(circleBd);
}

function bRect(x, y, w, h, frozen) { return new BRect(x, y, w, h, frozen); }
function BRect(x, y, w, h, frozen) {
    var boxSd = new b2BoxDef();
    boxSd.extents.Set(w, h);
    if (!frozen) boxSd.density = 1.0;

    var boxBd = new b2BodyDef();
    boxBd.AddShape(boxSd);
    boxBd.position.Set(x, y);

    this.body = world.CreateBody(boxBd);
}

function bLine(x1, y1, x2, y2, frozen) { return new BLine(x1, y1, x2, y2, frozen); }
function BLine(x1, y1, x2, y2, frozen) {
    var lineSd = new b2PolyDef();
    if (!frozen) lineSd.density = 1.0;

    lineSd.vertexCount = 2;
    lineSd.vertices[0].Set(0, 0);
    lineSd.vertices[1].Set(x2 - x1, y2 - y1);

    var lineBd = new b2BodyDef();
    lineBd.AddShape(lineSd);
    lineBd.position.Set(x1, y1);

    this.body = world.CreateBody(lineBd);
}

// Shape Drawing

function drawBox2dShapes() {
    clear();
    noFill();
    for (var body = world.m_bodyList; body; body = body.m_next) {
        shape = body.GetShapeList();

        if (shape !== null) {
            switch (shape.m_type) {
                case b2Shape.e_circleShape:
                    ellipse(body.m_position.x, body.m_position.y, shape.m_radius * 2, shape.m_radius * 2);
                    break;
                case b2Shape.e_polyShape:
                    for (var i = 0; i < shape.m_vertexCount - 1; i++) {
                        line(
                            body.m_position.x + shape.m_vertices[i].x,
                            body.m_position.y + shape.m_vertices[i].y,
                            body.m_position.x + shape.m_vertices[i + 1].x,
                            body.m_position.y + shape.m_vertices[i + 1].y
                        );
                    }
                    line(
                        body.m_position.x + shape.m_vertices[shape.m_vertexCount - 1].x,
                        body.m_position.y + shape.m_vertices[shape.m_vertexCount - 1].y,
                        body.m_position.x + shape.m_vertices[0].x,
                        body.m_position.y + shape.m_vertices[0].y
                    );
                    break;
            }
        }
    }
}
