let nodes = [];
let canvas;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight * 0.8);
    canvas.id('canvas');

    // create a BeginNode and an EndNode in the canvas
    nodes.push(new BeginNode());
    nodes.push(new EndNode());

    // align the various text at the center of every node
    textAlign(CENTER, CENTER);
    ellipseMode(CENTER);
    rectMode(CENTER);
}

function draw() {
    background(240);

    stroke('rgba(0, 0, 0, 0.2)');

    for (let x = 0; x < canvas.width / 2; x += 15) {
        line(canvas.width / 2 - x, 0, canvas.width / 2 - x, canvas.height);
        line(canvas.width / 2 + x, 0, canvas.width / 2 + x, canvas.height);
    }
    for (let y = 0; y < canvas.height / 2; y += 15) {
        line(0, canvas.height / 2 - y, canvas.width, canvas.height / 2 - y);
        line(0, canvas.height / 2 + y, canvas.width, canvas.height / 2 + y);
    }

    nodes.forEach(node => {
        if (node.checkOver() || node.dragging) {
            node.updatePos();
        }
        node.render();
    });
}

// change the size of the canvas regard the web page size
function windowResized() {
    resizeCanvas(windowWidth, windowHeight * 0.8);
}

// when the mouse is pressed the node is dragged on the canvas
function mousePressed() {
    nodes.forEach((node, i) => {
        if (node.pressed()) {
            // put node to the end of the array to be rendered at last to be on top of all other
            nodes.push(nodes.slice(i, i + 1)[0]);
            nodes.splice(i, 1);
        }
    });
}

// when the mouse is released the node is released
function mouseReleased() {
    nodes.forEach(node => {
        node.released();
    });
}
